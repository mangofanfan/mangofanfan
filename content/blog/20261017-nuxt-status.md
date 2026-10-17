---
title: Nuxt 站点「芒果客栈」现状
description: 芒果帆帆使用 Nuxt 终于又一次建好了新的网站的框架，希望这一次可以坚持地稍微久一点。如果能有十年就好了。
tags: [ Nuxt, 博客, 十年之约, 评论系统 ]
date: 2026-10-17
image: /images/20261017/for-ten-years.png
published: true
---

## 客栈起源

在[从 WordPress 来到 Nuxt](20260904-wp-to-nuxt.md) 当中，九月的芒果介绍了将网站从 :term-tip-wordpress 迁移到 :term-tip-nuxt 的原因。此后的一个月内，准确地说是中秋国庆连放的小长假中，芒果又对 Nuxt 站点进行了一波改造。

现在我可以很高兴地宣布，**芒果客栈**（改造之后重新确定的名称，原本只是想定为 **mango.js**）已经完成复活。

导致复活的直接原因是芒果决定做出改变。基于 :term-tip-vitepress 和 `mangofanfan.cn` 的子域，芒果已经搭建了太多太多的静态文档站点。它们当中的很多已经随着文档归属的项目的废弃而遭废弃，毕竟芒果是一个喜欢挖坑而不喜欢填坑的生物；但大量的、重复的劳动也是导致热情消退的一大因素。

而且再说了，芒果已经不再是过去那个搞不懂 :term-tip-vue 也不会写 Web 的芒果了。所以，自己搓一个怎么样？

于是就有了这个芒果客栈。使用 :term-tip-nuxt 驱动的、在 :term-tip-cloudflare Worker 提供服务的全功能高度定制的网站，每一颗像素都可以由果掌控。

当然没有那么夸张，懂我意思就好~

## 近期更新

### 严格的内容安全策略

[内容安全策略（CSP）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CSP)是一种旨在让网页访问更加安全的技术，已经被大多数浏览器实现。

简单来说，网站管理员在 HTML 文档的 `<head>` 部分提供内容安全策略，供浏览器在加载 HTML 文档时执行。安全策略包括：

* 允许加载哪些来源的图片。
* 允许加载哪些来源的脚本。
* 允许加载哪些来源的嵌入式资源（如 `<iframe>`）。
* [可信类型 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Trusted_Types_API) 的设置。
* 等等更多。

这应当可以确保对芒果客栈的访问更加安全。

* 本地开发时，以及 :term-tip-ssr 时，默认使用 nonce 放行页面中的脚本块。
* :term-tip-ssg 时，默认手动添加每个脚本块的 sha384 至放行清单中。
* 对于图片，允许所有 `https:` 协议头的资源。

本功能通过引入 [Nuxt Security](https://nuxt-security.vercel.app/) 模块实现。

### 接入 CloudFlare 媒体转换

CloudFlare 提供在边缘对请求的托管媒体进行转换，以实现优化的功能。[Nuxt Image 模块支持此功能](https://image.nuxt.com/providers/cloudflare)，可以几乎零设置启用。

CloudFlare 提供每月 5000 次的**唯一转换**额度。所谓唯一转换：

* 一张 png 图片被转换为一张 webp 图片，计一次转换；此后该 webp 图片被 CloudFlare 存储在边缘，后续请求会直接命中，不再计转换次数。
* 一张 png 图片被转换为一张 avif 图片，计一次转换。
* 在不指定改变图片尺寸的前提下，以 webp 和 avif 两种格式提供图片，则最多计两次转换。

完全够用喵。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // 无关内容省略
  image: {
    format: ['avif', 'webp'],
    provider: process.env.NODE_ENV === 'production' ? 'cloudflare' : 'ipx',
    cloudflare: {
      baseURL: 'https://mango.js.cn',
    },
  },
})
```

为了加速本地开发，`process.env.NODE_ENV === 'production'` 用于判断当前环境，并在非生产环境中切换至 ipx 模式，在本地对图像进行优化。

### 评论系统

博客还是需要有评论系统才对味！

Nuxt 生态中没有可以开箱即用的评论模块，可能是因为评论系统需要配套可靠的数据库等方案，而 Nuxt 的部署方式五花八门。

因此，芒果引入了 [Nuxt Hub](https://hub.nuxt.com/) 模块以提供数据库服务，在此基础上计划自行实现基于 CloudFlare Worker + D1 数据库的评论功能。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // 无关内容省略
  hub: {
    db: 'sqlite',
  },
})
```

是的！只要这一行，就足够让 Nuxt Hub 自动在 CloudFlare Worker 构建部署时连接到 CloudFlare D1 了。虽然实际上还有很多准备工作要完成，那些不在本篇日志的介绍范围内了~

在这篇日志的底部，以及以往和将来的日志页面，都会提供评论系统。评论组件使用 `<ClientOnly>` 包围，以避免 SSG 部署时评论系统必然产生的水合问题。

评论表单使用 [CloudFlare Turnstile](https://developers.cloudflare.com/turnstile/) 保护。

评论者的头像通过 [Cravatar](https://cn.cravatar.com/) 提供，基于电子邮件地址获取。

芒果还配套编写了[隐私政策](/site/privacy)和[客栈守则](/site/guide)。

评论功能未来仍然需要继续完善。目前尚不存在以下功能：

* 对已存在的评论进行回复；
* 收到回复时进行邮件提醒；
* 第三方登录，例如 :term-tip-github 。

未来计划添加这些功能。

### 友链空间

芒果客栈已经添加了[友链空间](/site/friends)页面。如果您也有自己的在线博客，可以在该页面中添加您的博客。

所有信息都在该页面中有所说明。

### Feed

芒果客栈的「芒果日志」栏目已经添加了三种格式的 Feed：[RSS](/rss.xml)、[ATOM](/atom.xml) 和 [JSON](/feed.json)。

这三个文件将在构建时自动生成。你可以使用订阅软件订阅任意支持的链接，以在不访问芒果客栈的情况下查看最新的日志。

提供 Feed 的主要原因其实是为了适配[十年之约](https://www.foreverblog.cn/)……

虽然从我开始做网站以及搭博客开始，应该有六七年左右了，但是过去的网站终究还是没有挺到如今呢。

那就希望这一次可以坚持地稍微久一点。如果能有十年就好了。
