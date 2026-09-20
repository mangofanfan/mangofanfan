> # The /llms.txt file, v2
> 
> /llms.txt 文件，第二版

---

::translate-paragraph
#o
> A proposal to standardise on using an `/llms.txt` file to provide information to help agents use a website.

原文地址：[/llms.txt v2](https://llmstxt.org/)

作者：Jeremy Howard

发布于 2024 年 9 月 3 日

更新于 2026 年 8 月 10 日

#t
> 一项关于标准化使用 `/llms.txt` 文件来提供信息以帮助智能体使用网站的提议。

> 对一些术语使用了悬浮提示和译注。另外，随本文档一起翻译的还有 [llms.txt 提案更新历史](/toy/backup/llmstxt-change) 。

你可以在 [llmstxt.org](https://llmstxt.org/) 找到本提案的原始版本。
::

---

::translate-paragraph
#o
## Background

#t
## 背景
::

::translate-paragraph
#o
Agents now use websites constantly: a coding agent fetches a library's documentation to get an API call right, and a chat assistant with search reads pages to answer questions about a product. When this proposal was first written in 2024, this was largely a prediction. Today it is routine.

#t
:term-tip-agent 如今在不断地使用网站：一个编码智能体会抓取某个库的文档，以便正确调用 API；而一个带搜索功能的聊天助手则会阅读网页，来回答关于某个产品的问题。这份提案在 2024 年首次撰写时，这在很大程度上还只是一种预测。而今天，它已是常态。
::

::translate-paragraph
#o
But web pages are built for people. An HTML page wraps its information in navigation, ads, and JavaScript, and converting it back into clean text is difficult and imprecise. Context windows, while larger than they were, are still too small for most websites in their entirety, and every wasted token costs time and money. Agents are best served by concise, expert-level information gathered in a single, accessible location.

#t
但网页是为人类构建的。一个 HTML 页面会将其信息包裹在导航、广告和 :term-tip-javascript 之中，要把它重新转换为干净的文本既困难又不精确。上下文窗口——虽然比过去更大了——但对大多数网站的全部内容而言仍然太小，同时每一个被浪费的 token 都意味着时间和金钱的损耗。最适合智能体使用的，是汇集在单一的、易于访问的位置上的简洁的、专家级的信息。
::

::translate-paragraph
#o
This is v2 of the proposal, updated based on what I learned from two years of adoption: thousands of sites publish an llms.txt file, [documentation platforms generate one automatically](https://www.mintlify.com/docs/ai/llmstxt), and Chrome's Lighthouse [audits sites for one](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt) as part of its agentic browsing checks. The AI labs themselves publish llms.txt files for their own developer docs: [OpenAI](https://developers.openai.com/llms.txt), [Anthropic](https://docs.anthropic.com/llms.txt), and [Gemini](https://ai.google.dev/gemini-api/docs/llms.txt). The [Changes](/toy/backup/llmstxt-change) page describes what changed since v1, and why.

#t
这是该提案的第二版，根据我两年的工作中所了解到的情况进行了更新：数千个网站发布了 llms.txt 文件，[文档平台会自动生成一个](https://www.mintlify.com/docs/ai/llmstxt)，Chrome 的 Lighthouse [会检查网站是否拥有该文件](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)，作为其智能体浏览检查的一部分。AI 实验室本身也为自己的开发者文档发布了 llms.txt 文件：[OpenAI](https://developers.openai.com/llms.txt)、[Anthropic](https://docs.anthropic.com/llms.txt) 和 [Gemini](https://ai.google.dev/gemini-api/docs/llms.txt)。[变更页面](/toy/backup/llmstxt-change)描述了自第一版以来的变化及其原因。

> 译注：变更页面的原始地址为 <https://llmstxt.org/changes> ，上面的链接已跟随本提案一同翻译。
::

::translate-paragraph
#o
## Proposal

#t
## 提案
::

![llms.txt logo](llmstxt/logo.png)

::translate-paragraph
#o
We propose adding a `/llms.txt` markdown file to websites to provide LLM-friendly content. The file can be placed at the site root, or at any path within it, covering the pages under that path. This file offers brief background information, guidance, and links to detailed markdown files.

#t
我们提议在网站中添加一个 `/llms.txt` :term-tip-markdown 文件，以提供语言模型友好的内容。该文件可以放置在网站根目录，也可以放置在其中的任意路径下，覆盖该路径下的页面。该文件提供简要的背景信息、指引以及指向详细 Markdown 文件的链接。

> 译注：虽然该文件的名称为 `llms.txt`，但是其中文本内容的格式是 Markdown。
::

::translate-paragraph
#o
llms.txt markdown is human and LLM readable, but is also in a precise format allowing fixed processing methods (i.e. classical programming techniques such as parsers and regex).

#t
llms.txt Markdown 既可被人类阅读，也可被 LLM 阅读，但它同时采用了一种特殊的格式以支持固定的处理方法（即解析器和正则表达式等经典编程技术）。
::

::translate-paragraph
#o
We furthermore propose that pages with information that agents might need provide a clean markdown version of those pages at the same URL as the original page, either with `.md` appended (`page.html.md`) or with the extension replaced by `.md` (`page.md`). (URLs without file names should append `index.html.md` or `index.md` instead.)

#t
我们进一步建议，对于包含智能体可能所需信息的页面，应在与原页面相同的 URL 下提供这些页面的简洁 Markdown 版本：可以在末尾追加 `.md`（`page.html.md`），也可以将扩展名替换为 `.md`（`page.md`）。（不含文件名的 URL 则应改为追加 `index.html.md` 或 `index.md`。）
::

::translate-paragraph
#o
To help clients find these files, we recommend using standard link relations: `rel="alternate" type="text/markdown"` points to the markdown version of a page, and `rel="describedby"` points to the llms.txt file that covers it. (An llms.txt file describes all pages under its path, so `/docs/llms.txt` covers everything in `/docs/`.) These links can be provided as HTML `<link>` elements, or as an HTTP `Link:` response header. The header form also works for non-HTML resources, such as the markdown files themselves, and can be added in web server or CDN configuration without modifying any pages. For example:

#t
为了帮助客户端找到这些文件，我们建议使用标准链接关系：`rel="alternate" type="text/markdown"` 指向页面的 Markdown 版本，而 `rel="describedby"` 指向涵盖它的 llms.txt 文件。（一个 llms.txt 文件描述其路径下的所有页面，因此 `/docs/llms.txt` 覆盖 `/docs/` 中的所有内容。）这些链接可以作为 HTML `<link>` 元素提供，或作为 HTTP `Link:` 响应头提供。响应头形式也适用于非 HTML 资源，例如 Markdown 文件本身，并且可以在 Web 服务器或 CDN 配置中添加，无需修改任何页面。例如：
::

```
Link: </docs/page.html.md>; rel="alternate"; type="text/markdown", </docs/llms.txt>; rel="describedby"
```

::translate-paragraph
#o
The [FastHTML project](https://fastht.ml) follows these two proposals for its documentation. For instance, here is the [FastHTML docs llms.txt](https://www.fastht.ml/docs/llms.txt), placed at `/docs/` to cover just the documentation pages. And here is an example of a [regular HTML docs page](https://www.fastht.ml/docs/tutorials/by_example.html), along with exact same URL but with [a .md extension](https://www.fastht.ml/docs/tutorials/by_example.html.md).

#t
[FastHTML 项目](https://fastht.ml) 在其文档中遵循这两个提案。例如，这里是 [FastHTML 文档 llms.txt](https://www.fastht.ml/docs/llms.txt)，位于 `/docs/`，仅覆盖文档页面。这里还有一个
[常规 HTML 文档页面](https://www.fastht.ml/docs/tutorials/by_example.html) 的示例，以及完全相同的 URL，但[带有 .md 扩展](https://www.fastht.ml/docs/tutorials/by_example.html.md)。
::

::translate-paragraph
#o
Agents are expected to view or search `llms.txt` to find the information they need, then follow the relevant links. The links in an llms.txt file should therefore point to LLM-friendly content, such as the markdown versions of pages described above. The file itself stays small enough to fit in context. The detail lives behind the links, and is fetched only when needed.

#t
智能体应查看或搜索 `llms.txt`，以找到所需的信息，然后跟随相关链接。因此，llms.txt 文件中的链接应指向 LLM 友好型内容，例如上文所述的页面 Markdown 版本。文件本身保持足够小，以适配上下文。细节内容存放在链接指向的内容中，仅在需要时才会被获取。
::

::translate-paragraph
#o
llms.txt files are used most heavily for software documentation, where coding agents follow them to find API references and tutorials. The same structure works anywhere agents need a guided path into a site's content: a business outlining its structure and policies, a personal site answering questions about someone's CV, or a school providing access to course information.

#t
llms.txt 文件最常用于软件文档，编程智能体会跟随这些文件来查找 API 参考和教程。同样的结构适用于任何需要引导智能体访问站点内容的场景：企业概述其结构和政策、个人网站解答关于某人简历的问题，或学校提供对课程信息的访问。
::

::translate-paragraph
#o
Note that all [nbdev](https://nbdev.fast.ai/) projects now create .md versions of all pages by default. All Answer.AI and fast.ai software projects using nbdev have had their docs regenerated with this feature. For an example, see the [markdown version](https://fastcore.fast.ai/docments.html.md) of [fastcore's docments module](https://fastcore.fast.ai/docments.html).

#t
请注意，所有 [nbdev](https://nbdev.fast.ai/) 项目现在默认创建所有页面的 .md 版本。所有使用 nbdev 的 Answer.AI 和 fast.ai 软件项目都已使用此功能重新生成了文档。有关示例，请参阅 [fastcore 的 docments 模块](https://fastcore.fast.ai/docments.html) 的 [Markdown 版本](https://fastcore.fast.ai/docments.html.md)。

> 译注：此处的 `docments` 并非 `documents` 的笔误，而是特指在函数签名中用以代替函数文档注释的行内注释。
> 
> 可参阅上面的链接了解更多。如果你是人类，记得看原版而不是 Markdown 版本。
::

::translate-paragraph
#o
## Format

#t
## 格式
::

::translate-paragraph
#o
At the moment the most widely and easily understood format for language models is Markdown. Simply showing where key Markdown files can be found is a great first step. Providing some basic structure helps a language model to find where the information it needs can come from.

#t
目前，对于语言模型来说，最广泛且最易理解的格式是 Markdown。简单地指出关键 Markdown 文件的位置就是一个很好的开始。提供一些基本结构有助于语言模型找到所需信息的来源。
::

::translate-paragraph
#o
The `llms.txt` file is unusual in that it uses Markdown to structure the information rather than a classic structured format such as XML. The reason for this is that we expect many of these files to be read by language models and agents. Having said that, the information in llms.txt follows a specific format and can be read using standard programmatic-based tools.

#t
`llms.txt` 文件的独特之处在于，它使用 Markdown 来组织信息，而非 :term-tip-xml 等经典结构化格式。原因在于，我们预期许多这种文件将被语言模型和智能体阅读。虽然但是，llms.txt 中的信息仍遵循特定格式，并可使用基于标准编程的工具读取。
::

::translate-paragraph
#o
The llms.txt file spec is for files named `llms.txt`, at the root path `/llms.txt` of a website or at any subpath (e.g. `/docs/llms.txt`). A file covers the URLs under its path, and where more than one file applies, agents should use the most specific one. A file following the spec contains the following sections as markdown, in the specific order:

#t
llms.txt 文件规范适用于名为 `llms.txt` 的文件，包括位于网站的根路径 `/llms.txt` 或任何子路径（例如 `/docs/llms.txt`）。一个文件的范围涵盖其路径下的 URL，当多个文件包含一个 URL 时，智能体将使用最具体的那个。遵循规范的文件以 Markdown 格式包含以下部分，按特定顺序排列：
::

::translate-paragraph
#o
- An optional byte-order mark (BOM)
- An H1 with the name of the project or site. This is the only required section
- A blockquote with a short summary of the project, containing key information necessary for understanding the rest of the file
- Zero or more markdown sections (e.g. paragraphs, lists, etc) of any type except headings, containing more detailed information about the project and how to interpret the provided files
- Zero or more markdown sections delimited by H2 headers, containing "file lists" of URLs where further detail is available
  - Each "file list" is a markdown list, containing a required markdown hyperlink `[name](url)`, then optionally a `:` and notes about the file.

#t
- 可选的字节顺序标记（BOM）
- 一个带有项目或网站名称的 H1。这是唯一必需的章节
- 一个带有项目简短摘要的引用块，包含理解文件其余部分所需的关键信息
- 零个或多个任意类型的 Markdown 章节（例如段落、列表等），但标题除外，包含有关项目以及如何解读所提供文件的更详细信息
- 零个或多个由 H2 标题分隔的 Markdown 章节，包含可获取更多详细信息的 URL 的“文件列表”
  - 每个“文件列表”都是一个 Markdown 列表，包含一个必需的 Markdown 超链接 `[name](url)`，然后可选地跟一个 `:` 以及关于该文件的说明。
::

::translate-paragraph
#o
Here is a mock example:

#t
这是一个模拟示例：
::

::translate-paragraph
#o
```markdown
# Title

> Optional description goes here

Optional details go here

## Section name

- [Link title](https://link_url): Optional link details

## Optional

- [Link title](https://link_url)
```

#t
```markdown
# 标题

> 一些可有可无的简介

一些可有可无的描述

## 章节名称

- [链接标题](https://link_url): 一些可有可无的链接描述

## 可选的次要信息

- [链接标题](https://link_url)
```
::

::translate-paragraph
#o
The "Optional" section is used, by convention, for secondary information: links an agent can skip when a shorter context is needed.

#t
按照惯例，“Optional”部分用于次要信息：如果上下文受限，智能体可以跳过这些链接。
::

::translate-paragraph
#o
## Existing standards

#t
## 现存标准
::

::translate-paragraph
#o
llms.txt is designed to coexist with current web standards. While sitemaps list all pages for search engines, `llms.txt` offers a curated overview for LLMs. It can complement robots.txt by providing context for allowed content. The file can also reference structured data markup used on the site, helping LLMs understand how to interpret this information in context.

#t
llms.txt 旨在与当前的网络标准共存。站点地图为搜索引擎列出所有页面，而 `llms.txt` 则为 :term-tip-llm 提供精心整理的概览。它可以通过为允许的内容提供上下文来补充 robots.txt。该文件还可以引用站点上使用的结构化数据标记，帮助模型结合上下文理解如何解读这些信息。
::

::translate-paragraph
#o
The approach of using a standard filename follows `/robots.txt` and `/sitemap.xml` at the site root. And just as `index.html` gives any path a conventional location for its human-readable entry point, `llms.txt` gives any path a conventional location for its LLM-readable overview. robots.txt and `llms.txt` have different purposes. robots.txt lets automated tools know what access to a site is considered acceptable, such as for search indexing bots. llms.txt information is instead used on demand, when an agent needs information about a topic while assisting a user. Our expectation was that llms.txt would mainly be useful for *inference* rather than *training*, and that is how it has been used, though training runs could take advantage of the information too.

#t
使用标准文件名的做法沿袭了站点根目录下的 `/robots.txt` 和 `/sitemap.xml`。正如 `index.html` 为任意路径提供了人类可读入口点的常规位置一样，`llms.txt` 也为任意路径提供了 LLM 可读概览的常规位置。robots.txt 和 `llms.txt` 的用途不同，robots.txt 让自动化工具知道对站点的哪些访问是可接受的，例如对于搜索引擎的索引机器人。而 llms.txt 的信息则按需使用，当智能体在协助用户获取关于某个主题的信息时。我们的预期是，llms.txt 主要用于*推理*而非*训练*，而它也确实是这么被使用的，尽管训练运行也可以利用这些信息。
::

::translate-paragraph
#o
An alternative would be the Well-Known URIs standard \(RFC 8615\), which reserves the `/.well-known/` prefix for metadata files like this one. But well-known URIs exist only at the origin root, and many authors control only a path on a shared host: a GitHub Pages project site, for example, can publish files in its own directory but can never add one to the host's `/.well-known/`. Like `index.html`, an `llms.txt` describes the path where it sits, something a single root location cannot express. And anyone who can publish content at a path can provide one.

#t
另一种选择是 Well-Known URI 标准（RFC 8615），它为像本文件这样的元数据文件保留了 `/.well-known/` 前缀。但 Well-Known URI 只存在于源站根路径，而许多作者在共享主机上只控制一个路径：例如，GitHub Pages 项目站点可以在自己的目录中发布文件，却永远无法向主机的 `/.well-known/` 添加文件。与 `index.html` 一样，`llms.txt` 描述的是它所在的路径，而这是单一根位置无法表达的。并且，任何能够在某个路径下发布内容的人都可以提供一份。
::

::translate-paragraph
#o
sitemap.xml is a list of all the indexable human-readable information available on a site. This isn’t a substitute for `llms.txt` since it:

#t
sitemap.xml 是一个列表，列出了网站上所有可索引、可供人类阅读的信息。这也不是 `llms.txt` 的替代品，因为它：
::

::translate-paragraph
#o
- Often won’t have the LLM-readable versions of pages listed
- Doesn’t include URLs to external sites, even though they might be helpful to understand the information
- Will generally cover documents that in aggregate will be too large to fit in an LLM context window, and will include a lot of information that isn’t necessary to understand the site.

#t
- 通常不会列出语言模型可读的页面版本
- 不包括外部站点的 URL，尽管这些可能会对理解内容有所帮助
- 通常会包含对于语言模型而言过大，导致无法装入上下文窗口的文档，且还包含很多对理解站点并非必须的信息。
::

::translate-paragraph
#o
## Example

#t
## 示例
::

::translate-paragraph
#o
Here’s an example of `llms.txt`, in this case a cut down version of the file used for the FastHTML project \(see also the [full version](https://www.fastht.ml/docs/llms.txt)\):

#t
以下是一个 `llms.txt` 示例，这里使用的是 FastHTML 项目所用文件的精简版本（另见[完整版本](https://www.fastht.ml/docs/llms.txt)）：
::

```markdown
# FastHTML

> FastHTML is a python library which brings together Starlette, Uvicorn, HTMX, and fastcore's `FT` "FastTags" into a library for creating server-rendered hypermedia applications.

Important notes:

- Although parts of its API are inspired by FastAPI, it is *not* compatible with FastAPI syntax and is not targeted at creating API services
- FastHTML is compatible with JS-native web components and any vanilla JS library, but not with React, Vue, or Svelte.

## Docs

- [FastHTML quick start](https://fastht.ml/docs/tutorials/quickstart_for_web_devs.html.md): A brief overview of many FastHTML features
- [HTMX reference](https://github.com/bigskysoftware/htmx/blob/master/www/content/reference.md): Brief description of all HTMX attributes, CSS classes, headers, events, extensions, js lib methods, and config options

## Examples

- [Todo list application](https://github.com/AnswerDotAI/fasthtml/blob/main/examples/adv_app.py): Detailed walk-thru of a complete CRUD app in FastHTML showing idiomatic use of FastHTML and HTMX patterns.

## Optional

- [Starlette full documentation](https://gist.githubusercontent.com/jph00/809e4a4808d4510be0e3dc9565e9cbd3/raw/9b717589ca44cedc8aaf00b2b8cacef922964c0f/starlette-sml.md): A subset of the Starlette documentation useful for FastHTML development. 
```

::translate-paragraph
#o
To create effective `llms.txt` files, consider these guidelines:

#t
要创建有效的 `llms.txt` 文件，请考虑以下准则：
::

::translate-paragraph
#o
- Use concise, clear language.
- When linking to resources, include brief, informative descriptions.
- Avoid ambiguous terms or unexplained jargon.
- Test your file by asking an agent questions about your content, giving it only your llms.txt as a starting point.

#t
- 使用简洁清晰的语言。
- 链接到资源时，包含简短而精致的描述。
- 避免模糊的术语或未加解释的行话。
- 作为测试，在只向你的智能体提供 llms.txt 的情况下询问有关你的内容的问题。
::

::translate-paragraph
#o
## Directories

#t
## 目录
::

::translate-paragraph
#o
Here are a few directories that list the `llms.txt` files available on the web:

#t
以下是一些列出网络上可用的 `llms.txt` 文件的网站：
::

- [llmstxt.site](https://llmstxt.site/)
- [directory.llmstxt.cloud](https://directory.llmstxt.cloud/)
- [llmstxthub.com](https://llmstxthub.com/)

::translate-paragraph
#o
## Integrations

#t
## 集成
::

::translate-paragraph
#o
Many documentation platforms and CMSs can generate an llms.txt file automatically:

#t
许多文档平台和 :term-tip-cms{name="内容管理系统（CMS）"} 可以自动生成 llms.txt 文件：
::

::translate-paragraph
#o
- [Mintlify](https://www.mintlify.com/docs/ai/llmstxt) - Docs platform that generates llms.txt and markdown page versions for every site it hosts
- [GitBook](https://www.gitbook.com/blog/what-is-llms-txt) - Serves an llms.txt file for published docs sites
- [Yoast SEO](https://yoast.com/features/llms-txt/) - WordPress plugin that generates and maintains an llms.txt file
- [AIOSEO](https://aioseo.com/features/llms-txt/) - WordPress plugin with an llms.txt generator
- [Wix](https://support.wix.com/en/article/understanding-your-sites-llmstxt-file) - Generates an llms.txt file for every Wix site

#t
- [Mintlify](https://www.mintlify.com/docs/ai/llmstxt) - 一个为托管的每个站点生成 llms.txt 和 Markdown 版本的文档平台
- [GitBook](https://www.gitbook.com/blog/what-is-llms-txt) - 为已托管的站点提供 llms.txt
- [Yoast SEO](https://yoast.com/features/llms-txt/) - 生成并维护 llms.txt 的 :term-tip-wordpress 插件
- [AIOSEO](https://aioseo.com/features/llms-txt/) - 带有 llms.txt 生成器的 WordPress 插件
- [Wix](https://support.wix.com/en/article/understanding-your-sites-llmstxt-file) - 为每个 Wix 站点生成 llms.txt 文件

::

::translate-paragraph
#o
And various libraries and plugins are available to integrate the llms.txt specification into your workflow:

#t
并且有多种库和插件可以将 llms.txt 规范集成到你的工作流中：
::

::translate-paragraph
#o
- [JavaScript Implementation](https://llmstxt.org/llmstxt-js.html) - Sample JavaScript implementation
- [`vitepress-plugin-llms`](https://github.com/okineadev/vitepress-plugin-llms) - VitePress plugin that automatically generates LLM-friendly documentation for the website following the llms.txt specification
- [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms) - Docusaurus plugin for generating LLM-friendly documentation following the llmtxt.org standard
- [Drupal LLM Support](https://www.drupal.org/project/llm_support) - A Drupal Recipe providing full support for the llms.txt proposal on any Drupal 10.3+ site
- [`llms-txt-php`](https://github.com/raphaelstolt/llms-txt-php) - A library for writing and reading llms.txt Markdown files
- [`VS Code PagePilot Extension`](https://dmux.github.io/pagepilot) - PagePilot is a VS Code Chat participant that automatically loads external context (documentation, APIs, README files) to provide enhanced responses.
- [`server-llm-txt`](https://github.com/mcp-get/community-servers/tree/main/src/server-llm-txt) - MCP server that lets agents fetch and search llms.txt files

#t
- [JavaScript 实现](https://llmstxt.org/llmstxt-js.html) - 示例 :term-tip-javascript 实现
- [`vitepress-plugin-llms`](https://github.com/okineadev/vitepress-plugin-llms) - 自动为网站生成遵循 llms.txt 规范的大模型友好文档的 VitePress 插件
- [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms) - 自动为网站生成遵循 Llms.txt 标准的大模型友好文档的 Docusaurus 插件
- [Drupal LLM Support](https://www.drupal.org/project/llm_support) - 一个为 Drupal 10.3+ 的站点提供完整的 llms.txt 提案支持的 Drupal Recipe
- [`llms-txt-php`](https://github.com/raphaelstolt/llms-txt-php) - 一个用于读和写 llms.txt Markdown 文件的库
- [`VS Code PagePilot 扩展`](https://dmux.github.io/pagepilot) - PagePilot 是一个可以自动加载外部上下文（文档、API 和 :term-tip-readme ）以提供增强响应的 :term-tip-vscode 聊天参与者。
- [`server-llm-txt`](https://github.com/mcp-get/community-servers/tree/main/src/server-llm-txt) - 让智能体抓取和搜索 llms.txt 文件的 :term-tip-mcp-server
::

::translate-paragraph
#o
## Next steps

#t
## 下一步
::

::translate-paragraph
#o
The `llms.txt` specification is open for community input. A [GitHub repository](https://github.com/AnswerDotAI/llms-txt) hosts [this informal overview](https://github.com/AnswerDotAI/llms-txt/blob/main/nbs/index.qmd), allowing for version control and public discussion. A [community discord channel](https://discord.gg/aJPygMvPEN) is available for sharing implementation experiences and discussing best practices.

#t
`llms.txt` 规范开放接受社区意见。一个 [GitHub 仓库](https://github.com/AnswerDotAI/llms-txt) 托管着 [这份非正式概览](https://github.com/AnswerDotAI/llms-txt/blob/main/nbs/index.qmd)，以便进行版本控制和公开讨论。一个 [社区 Discord 频道](https://discord.gg/aJPygMvPEN) 可用于分享经验和讨论最佳实践。
::
