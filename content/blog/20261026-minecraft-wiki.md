---
title: 当我突发奇想开始继续更新 Wiki 的时候
description: 芒果将开放编写的维基的行为视作一种邀请，维基欢迎所有人的贡献，无论是出于人多力量大还是因为人实在不够多。
date: 2026-10-26
tags: [Wiki, MediaWiki, Minecraft Wiki,]
image: /images/20261026/wtf.png
published: true
---

## 维基

维基（Wiki）是一种支持多人协作的工具或网站，允许任何访问者直接通过浏览器创建、编辑和修改网页内容。

很久以前的芒果曾经研究过 :term-tip-mediawiki ，一个开源的wiki软件。

wiki，维基，其精神是人人可参与、人人可编辑嘛。

但是实际上我们都知道，人人可编辑是一个谎言。你说的这个“人人”里面，包括我吗？

### 固有缺陷

我的意思不仅仅是维基百科因为 IP 问题封禁大陆编者。

哪怕 IP 问题不是问题，墙的问题也不是问题，难道我就可以简单地参与编辑了吗？

因为维基是*人人可编辑*的社区项目，所以要更大努力地杜绝恶意编辑，所以维基要分配巡查员、管理员。

因为维基的*用户数量庞大*，*条目众多*，人工审核工作量大，所以要制定严格的编辑规范。

因为贡献量大，*审核困难*，所以对于不符条件的直接回退，或者手工删除，而不给出任何解释或建议。

我还没有算上由于立场不同导致的故意行为。

以及用户的贡献不在巡查员、管理员等的专业领域内，所以无法辨别内容真假，只能通过*有无文献引用*之类进行侧面推测，甚至*引用虚假文献*也不会被发现。

### 判断偏差

还有一种很奇怪的情况，芒果昨天就遇到了。

[Minecraft Wiki](https://zh.minecraft.wiki/) 「**致力于收集一切和 Minecraft 系列有关的信息。任何人都可以为 Wiki 做出贡献！**」

然后回退了芒果在「教程：更新Java」页面中对 eMudhra CA 事件的说明和更新建议，配以评论「何意味」。

须知芒果第一时间当然不服气，何意味是什么评语？eMudhra CA 事件是非常严重的安全事件，更新 Java 版本岂不是天经地义？

或者如果确实不需要强调，理由呢？Minecraft 作为一款 Java 游戏为什么不会受到该事件的影响，可以说服我吗？

只评价一个「何意味」就给我回退了是什么意思，[我当然要搞明白](https://zh.minecraft.wiki/w/Tutorial_talk:%E6%9B%B4%E6%96%B0Java)。

虽然我仍然认为提醒是有必要的。MC 的多人游戏不使用常规的证书验证，但是模组连接网络是常有的事，Mod Menu 会联网检查 Modrinth
上的模组版本，Essential Mod 有自己的社交网络……无论如何，我始终认为为了安全起见要求更新 Java 至修补过的安全版本是绝对有必要的，尤其是 MC 还是这么老的游戏，老版本如 1.12.2 的玩家基本不怎么在意他们的 Java 8 版本有没有达到 8u_503。

以及一位巡查员提出了「不认为本站应该担起 security advisory issuer 的责任」的观点，我的评价是如果这样的话，建议删除
Wiki 上的[修复 Apache Log4j2 教程页面](https://zh.minecraft.wiki/w/Tutorial:%E4%BF%AE%E5%A4%8DApache_Log4j2%E6%BC%8F%E6%B4%9E)页面，毕竟本站不应该承担起安全风险警告的责任。

## 其他

### 滥用过滤器

滥用过滤器是 MediaWiki 的一个拓展，用于基于预先设置的规则检查和阻止用户的异常编辑行为。

所以，聪明的你知道以下内容中，哪里触犯了滥用过滤器-垃圾字符吗？

```wikitext
当前本教程中的「支持Mod加载器」章节使用的Forge的<code>version.json</code>疑似有些过时，但是我也不清楚是从什么时候开始过时的。我猜是从MC 1.13开始，Forge更改安装方式起？

<syntaxhighlight lang="json">
{
    "name": "net.minecraftforge:forge:26.1-62.0.9:universal",
    "downloads": {
        "artifact": {
            "path": "net/minecraftforge/forge/26.1-62.0.9/forge-26.1-62.0.9-universal.jar",
            "url": "https://maven.minecraftforge.net/net/minecraftforge/forge/26.1-62.0.9/forge-26.1-62.0.9-universal.jar",
            "sha1": "85293de42bacbfd385d7c16c7691fb28adc9bc15",
            "size": 2793203
        }
    }
},
{
    "name": "net.minecraftforge:forge:26.1-62.0.9:client",
    "downloads": {
        "artifact": {
            "path": "net/minecraftforge/forge/26.1-62.0.9/forge-26.1-62.0.9-client.jar",
            "url": "",
            "sha1": "7bd7f36bd766bec3edf78c230b792f2f4aa6b401",
            "size": 38255606
        }
    }
}
</syntaxhighlight>

简单来说，新版的Forge安装器会在安装过程中动态生成名为<code>net.minecraftforge:forge:26.1-62.0.9:client</code>的依赖库，这是唯一缺少<code>downloads.artifact.url</code>的库文件；其他所有依赖库都是完整的，可以用与原版依赖库相同的方式处理。

然鹅我在添加这部分内容的时候触发了滥用过滤器「垃圾字符」，所以没有办法自己添加这部分内容……

~~~~
</syntaxhighlight>
```

![关于我在 Wiki 正文中被拦截的内容在讨论页也被拦截这件事](/images/20261026/wtf.png)

关于我在 Wiki 正文中被拦截的内容在讨论页也被拦截这件事。

那就等我的其他编辑次数达到 30，成为自动确认用户了，再把这段更新到[教程：编写启动器](https://zh.minecraft.wiki/w/Tutorial:%E7%BC%96%E5%86%99%E5%90%AF%E5%8A%A8%E5%99%A8)里。不知道多久才能凑够三十个编辑次数呢。
