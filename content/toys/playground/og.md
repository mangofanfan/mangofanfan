---
title: 开放图谱协议分析仪
description: 检查一个链接的理想状态最佳显示效果！
---

## 什么是开放图谱协议？

[开放图谱协议（Open Graph Protocol）](https://ogp.me/) 是由 Facebook 牵头发起的协议。

该协议规定了一组元数据。网站在每一个页面中提供这些元数据，然后社交媒体软件可以在用户分享页面时按照规范抓取这些元数据，从而在社媒中生成美观、准确的分享信息（例如卡片）。

开放图谱协议并不是 W3C 或其他机构的强制规范，并不会影响用户直接访问网站，也并**不会影响页面在搜索引擎中的 SEO 排名**。

社交媒体平台**自主地**选择是否抓取、怎样抓取、抓取多少这些数据，**自主地**决定最终生成怎样的分享信息。在不同社媒中，同一分享链接几乎必然有不同的显示效果。

::message{level=info}
也因此，本分析仪抓取页面并生成的分享卡片只是不正经的预览效果，仅供参考。
::

## 基本要素

按照协议规范，以下四个基础元数据是应该提供的：

* `og:title` - 页面标题，不包含站点名
* `og:type` - 页面类型
* `og:image` - 页面特色图像，可供预览页面
* `og:url` - 页面标准 URL

::message{level=fan}
嘛？其实不提供也没什么关系，毕竟并非强制规范。如果网站真的没有一张拿得出的图片，那就不提供 `og:image`，完全没关系的。
::

然后是可选择性提供的其他元数据：

* `og:description` - 页面简介，不包含任何 **与页面简介不相干的内容**
* `og:audio` - 用于预览的音频流媒体
* `og:video` - 用于预览的视频流媒体
* `og:locale` - 页面语言，形式为 `en_US`、`zh_CN`
* `og:site_name` - 站点名称，所以没有必要像 `<title>` 标签一样把站点名称跟在 `og:title` 中

## 效果速查

### og:type=website

`website` 是 `ogType` 的默认值，即网站。如果一个页面本身就是网站的首页，或者其无法归于下面的任何其他类型，就应该把它归为
`website`。

`website` 也是缺省时的默认值。

下面是一个网站首页的示例。

::PlaygroundOgContainer{url="https://developer.mozilla.org/zh-CN/ "}
:PlaygroundOGCard{
title="MDN Web Docs"
description="MDN Web Docs 网站提供有关开放 Web 技术的信息，包括 HTML、CSS以及适用于网站和渐进式 Web 应用的 API。"
image="https://developer.mozilla.org/mdn-social-image.46ac2375.png "
siteName="MDN Web Docs"
type="website"
}
::

### og:type=article

`article` 是文章类型页面。并非必须要是文章，只要是在网站上存在很多相同类型不同内容的页面，比如博客、摄影作品、帖子等，都可以用。

在指定类型为 `article` 时，以下元数据可用：

* `article:published_time` - 发布时间
* `article:modiried_time` - 修改时间
* `article:expiration_time` - 内容过期或不再具有参考价值的时间
* `article:author` - 作者名称
* `article:section` - 专栏名称、主题名称、分区类别等
* `article:tag` - 标签，列表

下面是 [一个知乎专栏](https://zhuanlan.zhihu.com/p/2088265189233779592) 的示例。

::PlaygroundOgContainer{url="https://zhuanlan.zhihu.com/p/2088265189233779592 "}
:PlaygroundOGCard{
title="DeepSeek 弹性计算 (DSec)：面向大规模 Agent 训练的沙盒基础设施"
description="DeepSeek 弹性计算 (DeepSeek Elastic Compute, DSec) 是支撑
DeepSeek-V4 全部训练、评测与数据预处理流程的沙盒基础设施。要训练一个可靠的 Agent
大模型，需要其能在真实环境里反复地试错：阅读代码、修改文件…"
siteName="知乎专栏"
url="https://zhuanlan.zhihu.com/p/2088265189233779592"
type="article"
}
::

该页面缺省了一些元数据。再找一个提供更多元数据（包含 `og:image`）的
[联合国观察新闻稿](https://www.un.org/zh/observances/world-space-week) 演示一下。

::PlaygroundOgContainer{url="https://www.un.org/zh/observances/world-space-week "}
:PlaygroundOGCard{
title="世界空间周 | 联合国"
description="世界空间周旨在赞颂科学技术及其对改善人类状况的贡献。"
siteName="United Nations"
url="https://www.un.org/zh/observances/world-space-week"
image="https://www.un.org/sites/un2.un.org/files/2020/10/space-week-index.jpg"
type="article"
}
::

又找了半天终于找到一个提供了文章作者和发布日期的 [示例](https://www.163.com/dy/article/L8CVUHJ80514R9KU.html)
，但是该页面使用的 `og:type` 并非 `article`，而是非规范的 `news`。姑且当做是 `article` 合并处理了。

::PlaygroundOgContainer{url="https://www.163.com/dy/article/L8CVUHJ80514R9KU.html "}
:PlaygroundOGCard{
title="独立调查｜30多年不涨价，一年亏400多万元：这趟慢火车为什么还在开？"
description="这趟绿皮车1年亏400多万元为何还开"
url="https://www.163.com/dy/article/L8CVUHJ80514R9KU.html"
type="news"
articleAuthor="网易"
articlePublishedTime="2026-10-04T10:23:20+08:00"
}
::

### og:type=video.xxx

`video.xxx` 表示该页面是一个视频页面。根据视频的内容和规格细分为四个子类。

* `video.moive` - 影片
* `video.episode` - 电视节目的一集
* `video.tv_show` - 多集的电视节目
* `video.other` - 其他

通用的元数据：

* `video:actor` - 演员列表（字符串列表）
* `video:actor:role` - 饰演角色
* `video:director` - 导演列表（字符串列表）
* `video:writer` - 编剧列表（字符串列表）
* `video:duration` - 影片或视频时长
* `video:release_date` - 发布日期时间
* `video:tag` - 标签，列表

`og:type` 为 `video.episode` 时，还有一个 `video:series` 元数据，用于指定该剧集所属于的电视节目。

::message{level=danger}
话虽如此，现在的在线视频与电影平台很少完整提供这些视频元数据，尤其是演职员表。

这也许是因为一条只能写一个人的大量 `<meta>` 标签会影响网页解析速度，以及真的没有多少人会通过社媒中的分享卡片来了解影片的演职员表。
::

一般来说，视频页面最好搭配 `og:video` 提供预览视频，以供社媒上的其他用户便捷地预览视频内容，而无需主动打开网页。

下面是 [一个 Bilibili 视频页面](https://www.bilibili.com/video/BV1cSec6tEux/) 的示例，`og:type` 为 `video.other`。

::PlaygroundOgContainer{url="https://www.bilibili.com/video/BV1cSec6tEux/ "}
::PlaygroundOGCard
---
title: 选哪个？iPhone 18 Pro&Duo深度上手_哔哩哔哩_bilibili
description: 面对折叠屏手机，我们始终绕不开同一个问题“为什么不直接买一台好的直板机？”那 iPhone Duo，到底有没有它不可替代的地方？欢迎收看影视飓风 2026 年 iPhone 评测。哦对了，这次我们依旧准备了 100 台新 iPhone 送给大家，记得去动态参与抽奖！, 视频播放量 15351751、弹幕量 425435、点赞数 994940、投硬币枚数 831509、收藏人数 332309、转发人数 195797, 视频作者 影视飓风, 作者简介 无限进步！｜商务合作请联系邮箱：bd@ysjf.com（邮件中麻烦备注公司、咨询内容）｜店铺名：影视飓风，相关视频：iPhone18Pro拉完了，早知道就不选蓝色了！后悔了……，iPhone18Pro究竟买不买？不妨先看看我的见解，竟然强了这么多！iPhone 18 Pro/Max 一天使用感受！| 颜色/ 外观/ 灵动岛/ 相机/ 性能/ 散热/ 续航/ MOFT｜大耳朵TV，户晨风：你折叠它干什么玩意儿呢？，随身带80元一张的纸？2026影视飓风员工包里有什么！，【隔壁老谢】华为PuraX View测评：一阔遮百丑？，【何同学】一镜到底。iPhone 18 Pro首发体验，《Phone Duolingo》，iPhone 18pro黄牛都不要？现场来了
url: https://www.bilibili.com/video/BV1cSec6tEux/
type: video.other
image: https://i1.hdslb.com/bfs/archive/aec12235afcae7c12ed1eb3684c103ed407434bf.jpg@1200w_630h
siteName: 哔哩哔哩
video: https://player.bilibili.com/player.html?bvid=BV1cSec6tEux
videoType: text/html
videoDuration: 1632
videoReleaseDate: 2026-09-16T12:00:00.000Z
videoTag:
- 2026苹果秋季新品
- 评测
- 4K
- 手机
- iPhone18Pro
- iPhoneDuo
---
::
::

按照规范，`og:video` 属性应当提供流媒体文件，例如 `mp4` 之类。但显然，上面的预览使用的是 Bilibili 外链播放器。

视频平台（如 Bilibili、YouTube 等）出于版权内容保护、弹幕加载、清晰度选择、私有播放协议等考量，可能会使用专用外链播放器而非标准流媒体文件。此时需要解析方使用
`<iframe>` 等应对 HTML 内容的容器来播放媒体，或者使用平台专用的其他视频解析方案，或者回退到 `og:image`
只显示特色图像。对于视频页面，一般可以认为 `og:image` 就是视频的封面。

另外一些个人站点、小规模视频平台，或者一些短视频平台等可能会遵循规范，直接在 `og:video` 中提供流媒体文件。也可能不会。

### 理论上的电视节目剧集卡片

那我们人为地提供一下完整的信息，来看看 Facebook 曾经梦想的电视剧集分享卡片是长什么样的吧？

::PlaygroundOgContainer{url="https://mango.js.cn/video/ep508404/ （假的）"}
::PlaygroundOGCard
---
title: 间谍过家家 第一话 任务1 <枭>行动
description: 每个人都有不可告人的一面。<黄昏>是维斯达利斯情报局奥斯塔尼亚对策科<WISE>的一名优秀间谍。为调查威胁两国和平的人物——奥斯塔尼亚国家统一党总裁多诺万·德斯蒙，上级给予了他一个绝密任务。任务名为：<枭（Strix）>行动。
url: https://mango.js.cn/video/ep508404/
type: video.episode
image: http://i0.hdslb.com/bfs/bangumi/image/f50a08cc1562f2c1e933b656c00db3fcafd110e9.png
siteName: 芒果客栈（假的）
videoDuration: 1456
videoReleaseDate: 2022-04-30T13:00:00.000Z
videoTag:
- 漫画改
- 战斗
- 搞笑
- 日常
- 2022
videoActor:
- name: 江口拓也
  role: 劳埃德·福杰
- name: 种崎敦美
  role: 阿尼亚·福杰
- name: 早见沙织
  role: 约尔·福杰
videoDirector:
- 古桥一浩
videoWriter:
- 远藤达哉
videoSeries: 间谍过家家
---
::
::

芒果粗略地找了一圈，没有找到哪个视频或者电影网站使用开放图谱协议完整提供以上信息的。

### og:type=book

`book` 用于图书等出版物，拥有以下四个元数据。

* `book:author` - 作者，列表
* `book:isbn` - ISBN
* `book:release_date` - 出版日期（时间？）
* `book:tag` - 标签，列表

与 `video` 的元数据类似，这些数据在实际的图书网站中也是鲜有返回。下面以
[某水电工摸鱼所作科幻作品的豆瓣页面](https://book.douban.com/subject/3066477/) 为例，注意标签和出版日期是人为补充的。

::PlaygroundOgContainer{url="https://book.douban.com/subject/3066477/ "}
::PlaygroundOGCard
---
title: 三体Ⅱ
description: 三体人在利用魔法般的科技锁死了地球人的科学之后，庞大的宇宙舰队杀气腾腾地直扑太阳系，意欲清除地球文明。面对前所未有的危局，经历过无数磨难的地球人组建起同样庞大的太空舰队，同时，利用三体人思维透明的致...
url: https://book.douban.com/subject/3066477/
type: book
image: /api/og/fetch-img?url=https%3A%2F%2Fimg3.doubanio.com%2Fview%2Fsubject%2Fl%2Fpublic%2Fs3078482.jpg&origin=https%3A%2F%2Fbook.douban.com%2Fsubject%2F3066477%2F
siteName: 豆瓣
bookAuthor: 
- 刘慈欣
bookIsbn: "9787536693968"
bookReleaseDate: 2008-05
bookTag:
- 科幻
- 外星生命
- 未来
---
::
::

## 实际应用
