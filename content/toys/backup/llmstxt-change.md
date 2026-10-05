> # The /llms.txt file changes
> 
> /llms.txt 文件 变更记录

---

::translate-paragraph
#o
> A proposal to standardise on using an `/llms.txt` file to provide information to help agents use a website.

原文地址：[/llms.txt changes](https://llmstxt.org/changes)

#t
> 本页面是与 [提案原文](/toy/backup/llmstxt) 一同翻译的，拥有相同的作者。
::

---

::translate-paragraph
#o
## v2 \(August 2026\)

#t
## 第二版（2026 年 8 月）
::

::translate-paragraph
#o
The original llms.txt proposal was published in September 2024, when the idea that language models would routinely read websites was still speculative. Since then the community has taken to the proposal far more than I expected. Thousands of sites now publish an llms.txt file, [documentation platforms generate one automatically](https://www.mintlify.com/docs/ai/llmstxt), and coding agents use them reliably. That shift is what this revision reflects.

#t
最初的 llms.txt 提案发布于 2024 年 9 月，当时“语言模型会例行读取网站”这一想法仍只是推测。此后，社区对该提案的接受程度远超我的预期。如今已有数千个站点发布 llms.txt 文件，
[文档平台会自动生成一个](https://www.mintlify.com/docs/ai/llmstxt) ，编码智能体也可靠地使用它们。本次修订所反映的正是这一转变。
::

::translate-paragraph
#o
Adoption brought requests, and the commonest was discoverability. Given a page, how does an agent find its markdown version, or the llms.txt file that covers it, without guessing? v2 answers with standard link relations: `rel="alternate" type="text/markdown"` points to a page's markdown version, and `rel="describedby"` points to the llms.txt file that covers it, provided as HTML `<link>` elements or an HTTP `Link:` header.

#t
广泛的使用带来了更多的需求，其中最常见的便是可发现性。给定一个页面，智能体如何在不靠猜测的情况下找到它的 Markdown 版本，或涵盖它的 llms.txt 文件？提案的第二版用标准链接关系作出回答：`rel="alternate" type="text/markdown"` 指向页面的 Markdown 版本，`rel="describedby"` 指向涵盖它的 llms.txt 文件，以 HTML `<link>` 元素或 HTTP `Link:` 头的形式提供。
::

::translate-paragraph
#o
Practice also diverged from v1 in ways worth blessing. v1 specified one URL form for markdown versions, `.md` appended to the full page URL (`page.html.md`). Some publishing tools instead replace the extension (`page.md`), so v2 allows both. v1 permitted llms.txt files in subpaths without saying what that meant. v2 defines it: a file covers the pages under its path, and the most specific file applies. This is also what lets a site that only controls a path, such as a GitHub Pages project site, participate fully.

#t
在一些值得肯定的方面，第二版的实践也与第一版有所不同。第一版为 Markdown 版本指定了一种 URL 形式，即在完整页面 URL 后附加 `.md`（`page.html.md`）。一些发布工具则会替换扩展名（`page.md`），因此第二版允许两者并存。第一版允许在子路径中放置 llms.txt 文件，但没有规定这意味着什么。第二版对此作了定义：一个 llms.txt 文件覆盖其路径下的页面，而对于每个页面都应使用其最近的（最具体的）llms.txt 文件。这也正是让一些只控制某个路径的站点——例如 GitHub Pages 站点——能够完全参与其中的原因。
::

::translate-paragraph
#o
v1 said nothing about how llms.txt should be consumed, and described the `llms_txt2ctx` tool for expanding a file into an LLM context. v2 instead states the expectation directly: agents view or search the llms.txt to find what they need, then follow the relevant links, which should point to LLM-friendly content. The context-expansion tooling is no longer part of the proposal, and with it goes the special meaning of the `Optional` section, which told those tools what to omit. Optional sections are still allowed, and remain a useful convention for secondary links, but they no longer carry mechanical semantics. Finally, the background and examples now describe how agents actually use websites, rather than predicting that they might.

#t
第一版没有说明 llms.txt 应如何被消费，并描述了用于将文件展开为 :term-tip-llm 上下文的 `llms_txt2ctx` 工具。第二版则直接陈述了这一预期：智能体会查看或搜索 llms.txt 以找到所需内容，然后跟随相关链接，而这些链接应指向对 LLM 友好的内容。上下文展开工具已不再是提案的一部分，随之消失的还有 `Optional` 部分的特殊含义——它曾告诉那些工具应省略什么。Optional 部分仍然允许使用，并且它们仍是用于次级链接的有用惯例，但不再具有机械化的语义。最后，背景和示例现在描述的是智能体实际如何使用网站，而不是预测它们可能会这样做。
::
