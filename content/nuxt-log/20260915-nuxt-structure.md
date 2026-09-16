---
title: Nuxt 新站点基本结构
description: Nuxt 决定了在拥有极高自由度的同时，伴随极高的成本。但芒果高兴这么做，那就够了。
date: 2026-09-15
---

## Nuxt vs WordPress ？

首先简单地说明一下为什么会从 :term-tip-wordpress 自托管转向 :term-tip-nuxt 自建。

WordPress 的优点在于方便。

* 丰富的插件、主题，只要想要就能装上。
* WordPress 后台拥有成熟的博客管理功能，WordPress 还有一个移动应用程序。
* 媒体库功能，可以上传图片和文件。
* 古腾堡编辑器非常强大。

但是在我需要有更丰富的需求时，WordPress 告诉我，这需要另外的投入。

* 开发插件和扩展需要 PHP + WordPress 核心开发经验。说实话，WordPress 的开发文档其实并不直观，也缺少中文。
* WordPress 的架构决定了其主题开发与现代前端工程的方向背道而驰。
  * WordPress 最新的「块主题」也是面向 WordPress 功能进行主题开发，而非面向现代前端工程。
  * 块主题在功能性上也不如「传统主题」， :term-tip-mangosuan 指出如果一定要使用更方便的块主题，那么「混合主题」（结合块主题和传统主题）是有必要的。
  * 而传统主题就是传统的 PHP 一起写前后端了。

芒果面临着困境。

* WordPress 核心中有 :term-tip-react ，但是没有直观的办法能够简单地复用 React。
* WordPress 推荐将使用到的前端依赖注册到 WordPress 的加载队列中统一管理和加载，但这也天然导致前端开发中的补全、洞察和预测问题。
* WordPress 推荐主题中不要实现插件功能，但是这违反直觉，对于个人网站的主题来说有些多余。

以及最重要的，使用 `wp-env` 配置 WordPress 开发环境的过程也是害苦了芒果哇。

那就换好了。换到 :term-tip-typecho 什么的与 WordPress 没有本质区别，要干就干一票大的。

来吧， :term-tip-nuxt ！

Nuxt 是一个开源的全栈 Web 框架，前端部分使用 :term-tip-vue ，整体使用 :term-tip-nitro
引擎构建。这样，芒果就可以随心定制网站的每一个部分，所需的只是基础的前端开发经验和网站运维经验。

现在，开始记录 `mango.js.cn` 现在的架构吧。

## Nuxt Content 内容管理

有定期更新需求的内容，使用 Nuxt 官方维护的
[Nuxt Content](https://content.nuxt.com/docs/getting-started)
进行内容管理。Nuxt Content 会自动读取根目录下 `content` 目录中的指定文件，默认包含
:term-tip-markdown 格式。

通过根目录下的 `content.config.ts` 配置文件即可调整其行为。目前，芒果.js 使用的是：

```ts
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
      }),
    }),
    nuxtLog: defineCollection({
      type: 'page',
      source: 'nuxt-log/*.md',
      schema: z.object({
        date: z.date(),
      }),
    }),
    mcfpp: defineCollection({
      type: 'page',
      source: 'mcfpp/*.md',
      schema: z.object({
        index: z.number(),
      }),
    }),
    mcfppVscodeExtension: defineCollection({
      type: 'page',
      source: 'mcfpp/vscode-extension/*.md',
      schema: z.object({
        index: z.number(),
      }),
    }),
  },
})
```

简单来说，以上设置确定了四个内容集合，分别是位于四个目录中的 Markdown
文件，对不同的内容集合定义了不同的额外元数据，比如 `blog` 有 `tags`、`image` 和 `date`。

然后，在页面组件中使用 Nuxt Content 提供的查询方法，就可以获取到内容了，并且可直接渲染。

## 独立页面使用 Markdown 编写内容

这就是 Nuxt 相比 WordPress 等其他内容管理系统最强大的地方，芒果可以随心所欲地定制网站。

比如，
[做一个开源许可证的对比和介绍页](/toy/knowledge/license)
，或者
[做一个模仿代码编辑器 UI 的 Node.js 项目结构介绍页](/toy/project/nodejs)
，或者甚至是
[翻译一篇领域知名但受众实在狭窄的十二年前的英文技术博客](/toy/backup/textmate) 。

简单来说，经过和 :term-tip-mangosuan 的一番探讨 ~（单方面压榨）~
之后，目前敲定了如下技术路线，以实现在非 Nuxt Content 管理的页面中显示来自 Markdown 的内容。

### 读取 Markdown

在 `server/api` 下，实现了一个 `server/api/markdown/raw/[...path].get.ts`
接口。该接口的作用是调取传入的 Markdown 文件的内容，对应的 Markdown 文件位于
`app/assets/markdown` 目录下，作为资源文件。

注意，这是一个预渲染端点。即，在 芒果.js 构建部署后，该端点会被静态化，不再是运行时动态读取。

### 解析 Markdown

然后是 `server/api/markdown/[...path].get.ts` 端点，负责将上面的读取端点的返回内容解析为 AST。

解析使用的是 Nuxt Content 的方法，所以会得到相同的结果，包括页面的所有组件、元数据和目录树。

### 渲染 Markdown

使用 `<ContentRender>` 组件对解析得到的 AST 进行渲染，得到页面内容。

## 自定义组件

默认情况下，Nuxt Content 渲染 Markdown 使用的组件都是 HTML 原生标签。

通过在 `app/components` 中提供一系列以 `prose-` 开头的组件，可以替换渲染所用的标签。例如：

* `prose-h2` 会替换 `h2`；
* `prose-hr` 会替换 `hr`；
* ……

::message{level=fan}
Nuxt 对 `app/components` 中的组件采用自动导入，包括该目录以及其子目录中的组件都会被查找和导入。

在导入子目录中的组件如 `app/components/prose/h2.vue`
时，Nuxt 会将其重命名为 `<prose-h2>`，即将目录名和组件名拼接后自动导入。

你可以据此组织更有逻辑的组件结构。虽然可能并不符合 Vue 的最佳实践，但是确实对项目组织很友好。
::

这样就可以不只是通过 :term-tip-css 来定义网站的模样了~！
