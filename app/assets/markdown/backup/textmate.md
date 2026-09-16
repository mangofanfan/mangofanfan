> # Writing a TextMate Grammar: Some Lessons Learned
> 
> 编写 TextMate 语法：一些经验和教训

---

::translate-paragraph
#o
此文是原文的一份翻译副本，由 :term-tip-mangosuan 和 :term-tip-mangofan 合作完成。

发布：2014 年 2 月 17 日，14:35:46。

作者：Matt Neuburg。

地址：[apeth.com](https://www.apeth.com/nonblog/stories/textmatebundle.html)

经过一番努力搜索后，芒果没有找到已有的对此文的翻译，所有地方（包括 :term-tip-vscode 官方扩展开发文档）都只给出此文的链接，希望有 TextMate 需求的开发者自行领会。

所以有了这篇译文。

#t
> 此为非官方翻译，且已获得作者授权。

> 只在翻译栏中出现的引用块是**译注**，也就是芒果帆帆的补充。
> 
> 原文中作者使用的编辑器是 TextMate，一款 macOS 平台的代码编辑器，也正是 TextMate 语法文件的创建和推广者。

> 芒果帆帆已尽力确保翻译文本的准确性，翻译按原文提供。需要补充的内容以**译注**形式提供。
> 
> 原文中的*斜体*标记和外链在复制时丢失，在译文中均已添加完整。如需查看原样的原文，还请通过原文链接前往。
::

---

::translate-paragraph
#o
Although TextMate has been around for a long time (in computer years) and many language bundles exist, it is startling to find that the process of writing a language grammar remains poorly documented. Having recently managed to write a grammar of my own for the first time, here are some things I learned along the way.

#t
尽管 TextMate 已经存在了很长时间（按计算机的年份来算），而且已经出现了许多语言包，但令人惊讶的是，编写语言语法的过程仍然缺乏文档记录。
最近我头一次设法写出了[属于自己的语法](https://github.com/mattneub/AsciiDoc-TextMate-2.tmbundle)，以下是我在此过程中学到的一些东西。
::

::translate-paragraph
#o
## Time Involved

#t
## 所需时间
::

::translate-paragraph
#o
Writing a grammar can be a slow business. It took me some weeks just to prepare, collecting information and locating and studying the existing instructions and documentation.

#t
编写语法可能是一件缓慢的差事。我光是做准备、收集信息、查找并研究现有的说明和文档，就花了好几周时间。
::

::translate-paragraph
#o
It then took me about three weeks of extremely frustrating, difficult work before I got my first two scopes working in the grammar. (This was mostly because of undocumented things you mustn’t do and things that TextMate can’t do, both of which I tell you about later on this page.) After that, though, it was remarkably smooth sailing, and I was able to finish the entire grammar in a week. Here are some git log excerpts:

#t
之后，我又花了大约三周时间做着极其令人沮丧、艰难的工作，才让语法中的前两个作用域正常工作。（这主要是因为有些你绝不能做的未记录事项，以及 TextMate 做不到的事情，这两点我都会在本页后面讲到。）不过在那之后，进展就出奇地顺利，我得以在一周内完成整个语法。以下是一些 git log 摘录：

> 译注：“scope”翻译为“作用域”，可以认为是对源代码文档按照语法进行切分得到的单元。
::

```terminaloutput
Date:   Wed Jan 15 13:59:57 2014 -0800
    initial commit

Date:   Wed Feb 5 09:20:18 2014 -0800
    finally got recursively related match patterns working!

Date:   Wed Feb 12 19:58:51 2014 -0800
    ready for first release!
```

::translate-paragraph
#o
## How Scopes Are Styled

#t
## 作用域是如何被设置样式的
::

::translate-paragraph
#o
One of the chief reasons for writing a grammar is syntax coloring — which, like so much else about a grammar, depends on scopes. The rules for how a scope should be colored and styled, however, are to be found, not in the grammar itself, but in themes and also in settings.

#t
编写语法的主要原因之一是语法着色——而它和语法中的许多其他方面一样，取决于作用域。然而，作用域应如何着色和设置样式的规则，并不在语法本身之中，而是在主题以及设置里。

> 译注：TextMate 语法文件只按照正则规则，给源代码的不同片段划分不同的作用域，例如关键字、内置类型等。
> 
> TextMate 语法文件不负责给不同的作用域上色，而是只对作用域进行划分和打标签。上色（或称：语法高亮）由编辑器（例如：
> :term-tip-vscode 或 TextMate 编辑器）完成，并由编辑器应用颜色主题。
::

::translate-paragraph
#o
In particular:
* In TextMate 2, the standard themes are all in the Themes bundle. The user will probably have selected one of these themes. You have no control over which it is; yet upon this choice depends how your grammar will affect the look of a document.
* Themes can also be hidden away in other bundles. \(Fortunately, at the moment, no standard bundle that I use, other than the Themes bundle, contains any themes.\)
* Settings can color and style scopes, like miniature one-rule themes.

#t
尤其是：
* 在 TextMate 2 中，标准主题全都位于 Themes bundle 中。用户很可能已经选中了其中某个主题。你无法控制具体是哪一个；可是，用户的选择同样会影响你的语法作用在源代码上的实际效果。
* 主题也可能藏在其他 bundle 中。（幸运的是，目前我使用的标准 bundle 中，除了 Themes bundle 之外，没有任何一个包含主题。）
* 设置也可以像微型的单规则主题那样，为作用域着色并设置样式。

> 译注：“bundle”（直译为捆绑包）是 TextMate 编辑器的插件形式，类似于 VS Code 的扩展和 JetBrains IDEs 的插件。
::

::translate-paragraph
#o
Since themes and settings are going to have an effect on how your scopes are displayed, you should take some time to examine the existing themes, as well as looking through all settings of all bundles, to get some notion of what this effect might be. To save you some time, I will now summarize the information that I gathered in this regard.

#t
既然主题和设置会影响你的作用域显示效果，你就应该花些时间查看现有主题，并浏览所有 bundle 中的所有设置，以便大致了解这种影响可能是什么。为了节省你的时间，我现在总结一下我在这方面收集到的信息。
::

::translate-paragraph
#o
### Standard Themes

#t
### 标准主题
::

::translate-paragraph
#o
Unfortunately, different standard themes affect different scopes; ideally you should note down every scope listed in every theme, but this would take too long. Here are some of the main general scopes that are styled by the standard themes; these are scopes that you generally want to use, because you can rely on the user to have selected a standard theme that will style them for you:

#t
遗憾的是，不同的标准主题会使用不同的作用域；理想情况下，你应该记下*每个*主题中列出的*每个*作用域，但这太耗时了。以下是标准主题会设置样式的一些*主要通用作用域*；这些通常是你*想要*使用的作用域，因为你可以依靠用户选择的标准主题来设置这些作用域的样式：
::

* comment
* constant
* constant.character.escape
* constant.language
* constant.numeric
* declaration.section entity.name.section
* declaration.tag
* deco.folding
* entity.name.function
* entity.name.tag
* entity.name.type
* entity.other.attribute-name
* entity.other.inherited-class
* invalid
* invalid.deprecated.trailing-whitespace
* keyword
* keyword.control.import
* keyword.operator.js
* markup.heading
* markup.list
* markup.quote
* meta.embedded
* meta.preprocessor
* meta.section entity.name.section
* meta.tag
* storage
* storage.type.method
* string
* string source
* string.unquoted
* support.class
* support.constant
* support.function
* support.type
* support.variable
* text source
* variable
* variable.language
* variable.other
* variable.parameter

::translate-paragraph
#o
### Settings

#t
### 设置
::

::translate-paragraph
#o
I was stunned to discover that, in addition to themes, a bundle’s settings can style scopes. It turns out that this fact is extremely important. For example, I scratched my head for about two weeks, trying to figure out why my italic text was shown as italic. I couldn’t find any theme that was doing this. Then one day I stumbled on the Text bundle, which contains the responsible setting.

#t
我震惊地发现，除了主题之外，bundle 的“设置”还能为作用域设置样式。事实证明，这一点极其重要。例如，我挠头琢磨了大约两个星期，想弄明白为什么我的斜体文本会显示为斜体。我找不到任何主题会这么做。后来有一天，我偶然发现了 Text bundle，里面就包含了那个起作用的设置。
::

::translate-paragraph
#o
Here are the chief bundle settings to be aware of:
* **Text bundle**: `markup.bold`, `markup.italic`, `markup.underline`. (The underlining imposed by markup.underline is also how the Hyperlink Helper bundle injects underlining onto your URLs.) There are some other settings here, but they affect things like soft wrapping (also something to watch out for).
* **Themes bundle**: `markup.heading.n`, `markup.quote`, `markup.raw.block`. These settings affect both the font and size of these scopes. In my opinion, they are among the most horrible side effects of using TextMate 2. (If I wanted font and size to vary through my document, I’d be using Microsoft Word, for heaven’s sake. I’m here for the text. It’s called TextMate, after all.) To avoid having your text affected by these settings, avoid these scopes. I have also disabled these settings in my copy of TextMate, but you can’t rely on every user to do that.
* **TextMate bundle**: `meta.separator`.

#t
以下是你需要了解的主要 bundle 设置：
* **Text bundle**：`markup.bold`、`markup.italic`、`markup.underline`。（由 `markup.underline` 施加的下划线，也正是 Hyperlink Helper bundle 为你的 URL 注入下划线的方式。）这里还有一些其他设置，但它们影响的是自动换行之类的东西（同样需要留意）。
* **Themes bundle**：`markup.heading.n`、`markup.quote`、`markup.raw.block`。这些设置会同时影响这些作用域的字体和字号。在我看来，它们是使用 TextMate 2 最糟糕的副作用之一。（如果我想让文档中的字体和字号变来变去，我早就去用 Microsoft Word 了，简直搞笑。我来这里是为了文本。毕竟它叫 TextMate 嘛。）为了避免你的文本受这些设置影响，避开这些作用域。我也在自己的 TextMate 副本中禁用了这些设置，但你不能指望每个用户都会这么做。
* **TextMate bundle**：`meta.separator`。
::

::translate-paragraph
#o
If you use or enable other bundles, keep your eyes peeled for settings that may perform scope styling. For example:
* **Diff bundle**: `markup.changed`, `markup.deleted`, `markup.inserted`; `meta.diff.header`, `meta.diff.index`, `meta.diff.range`.

#t
如果你使用或启用了其他 bundle，请留意那些可能会设置作用域样式的设置项。例如：
* **Diff bundle**：`markup.changed`，`markup.deleted`，`markup.inserted`；`meta.diff.header`，`meta.diff.index`，`meta.diff.range`。
::

::translate-paragraph
#o
The Source bundle doesn’t contain any style settings, but it does have some settings that determine what counts as a word character for purposes of code completion (as explained in this article) as well as word selection and navigation, so you might want to be careful with the distinctions being made here.

#t
Source bundle 不包含任何样式设置，但它确实有一些设置，用于确定在代码补全（如
[这篇文章](https://macromates.com/blog/2012/clever-completion/)
所述）以及单词选择和导航中，什么算作单词字符，因此你可能需要注意这里所做出的区分。
::

::translate-paragraph
#o
## Standard Scopes

#t
## 标准作用域
::

::translate-paragraph
#o
The official list of scopes that are considered standard or conventional is not quite the same as the list of scopes that are commonly styled by themes. It’s good to have this list on hand. The list as given in the documentation is as follows. I have starred once the entries that are present also in the list of commonly styled scopes (though note that for some reason there are commonly styled scopes that are not present in this list); I have double-starred the entries that are styled by settings:

#t
被认为属于标准或约定俗成的官方作用域列表，与主题通常设置样式的作用域列表并不完全相同。手头备有这样一份列表是很有好处的。
[文档](https://macromates.com/manual/en/language_grammars#naming_conventions)
中给出的列表如下。我用一个星号标注了同时出现在常用样式作用域列表中的条目（不过要注意，出于某种原因，有些常用样式作用域并未出现在这份列表中）；用两个星号标注了由设置进行样式设置的条目：
::

* comment\*
  * line
    * double-slash
    * double-dash
    * number-sign
    * percentage
    * \[character\]
  * block
    * documentation
* constant\*
  * numeric\*
  * character
    * escape\*
  * language\*
  * other
* entity
  * name
    * function\*
    * type\*
    * tag()
    * section\*
  * other
    * inherited-class\*
    * attribute-name\*
* invalid\*
  * illegal
  * deprecated
* keyword\*
  * control \[control.import\*\]
  * operator \[operator.js\*\]
  * other
* markup
  * underline**
    * link
  * bold\*\*
  * heading\*
  * italic\*\*
  * list\*
    * numbered
    * unnumbered
  * quote\* \(and \*\*\)
  * raw
  * other
* meta
* storage\*
  * type \[type.method\*\]
  * modifier
* string\* \(and string source\*\)
  * quoted
    * single
    * double
    * triple
    * other
  * unquoted\*
  * interpolated
  * regexp
  * other
* support
  * function\*
  * class\*
  * type\*
  * constant\*
  * variable\*
  * other \[other.variable\*\]
* variable
  * parameter\*
  * language\*
  * other\*

::translate-paragraph
#o
The Bundle Development bundle will also assist you as you edit your grammar by marking unusual scope names.

#t
在你编辑语法时，Bundle Development bundle 也会协助你，标出那些不常见的 scope 名称。

> 译注：Bundle Development bundle 是 TextMate 编辑器内的一个内置功能模块 /
> 插件，用于辅助开发人员编写语法文件。
> 
> 如您不使用 TextMate，例如 VS Code，可使用对应扩展如
> <https://marketplace.visualstudio.com/items?itemName=pedro-w.tmlanguage> 。
::

::translate-paragraph
#o
Note that although the documentation claims that meta scope is not styled, nevertheless some meta subscopes are in the list of scopes styled by themes and settings above.

#t
请注意，尽管文档声称 meta 作用域不会被应用样式，但上面所列的由主题和设置应用样式的作用域列表中，仍然包含一些 meta 的子作用域。
::

::translate-paragraph
#o
## Regular Expressions

#t
## 正则表达式
::

::translate-paragraph
#o
Grammar match rules are written as Ruby regular expressions. You need to be conversant with these! Download a copy of the Oniguruma regular expression syntax (used by Ruby) and keep it handy. Things to note:
* Greedy, reluctant, and possessive matches
* Lookbehind and lookahead — your match rules are likely to make extensive use of these
* Shy groups, named groups, named group references, and “variables” (the “Tanaka Akira Special”, allowing you to refer forward to a group by number or name) — I found named groups, in particular, extremely helpful for clarifying complicated expressions
* `\G` — This is a way of anchoring an attempted match in exactly the place where the previous match ended (useful when a grammar works by carving up a document completely into contiguous scopes)

#t
语法匹配规则以 :term-tip-ruby 正则表达式书写。你必须熟练掌握它们！下载一份
[Oniguruma 正则表达式语法](https://www.geocities.jp/kosako3/oniguruma/doc/RE.txt)
（Ruby 所用）并放在手边随时查阅。需要注意以下几点：

> 译注：此下载链接已失效。

* 贪婪匹配、懒惰匹配和占有匹配
* 后顾断言与前瞻断言——你的匹配规则很可能会大量使用它们
* 害羞组、命名组、命名组引用以及“变量”（即“Tanaka Akira Special”，允许你按编号或名称向前引用某个组）——我发现命名组尤其有助于厘清复杂的表达式
* `\G` — 这是一种将尝试匹配锚定在上一次匹配恰好结束位置的方法（当语法通过把文档完全切分成连续的作用域来发挥作用时，这很有用）
::

::translate-paragraph
#o
It will also be a good idea to keep Rubular open in your browser. It allows you to test regular expressions, indicating matched groups.

#t
在浏览器中保持打开 [Rubular](https://rubular.com/) 也是个好主意。它允许你测试正则表达式，并指示出匹配的组。

> 译注：[Regex101](https://regex101.com/) 也是一个不错的正则测试与学习网站，且支持中文。
::

::translate-paragraph
#o
Bear in mind, however, that because of the way the TextMate parser surveys your document, all regular expressions used in grammar match rules must apply to a single line at a time. A single expression cannot embrace multiple lines. Thus it is possible to write a regular expression that appears to work in Rubular (or TextMate’s regex Find) but will fail as part of a grammar.

#t
不过请记住，由于 TextMate 解析器扫描文档的方式，语法匹配规则中使用的所有正则表达式都必须*一次只应用于一行*。单个表达式不能跨越多行。因此，有可能写出一个在 Rubular（或 TextMate 的正则查找）中看似可用，但作为语法的一部分却会失败的正则表达式。
::

::translate-paragraph
#o
Another pitfall is that TextMate will not complain if you write a bad regular expression; the expression will just fail silently. That’s probably a good thing in general, but it can drive you mad while trying to understand why your regular expression isn’t working. This is another reason why Rubular is useful; it will show a descriptive error message if the expression itself is syntactically faulty.

#t
另一个陷阱是，如果你写了一个错误的正则表达式，TextMate 并不会报错；这个表达式只会悄无声息地失败。总的来说，这大概是件好事，但在你试图弄明白为什么自己的正则表达式不起作用时，它可能会把你逼疯。这也是 Rubular 有用的另一个原因：如果表达式本身在语法上就有问题，它会显示一条描述性的错误信息。
::

::translate-paragraph
#o
Regular expressions will be surrounded by single quotes in the grammar. To express a single quote within a regular expression in a grammar, use two single quotes in succession.

#t
在语法文件中，正则表达式会被单引号包围。要在语法文件的正则表达式内部表示一个单引号，就连续使用两个单引号。
::

::translate-paragraph
#o
## Grammar Structure

#t
## 语法结构
::

::translate-paragraph
#o
We now come to the actual apparent structure of a language grammar. I say “apparent” because I’m just guessing, based on my experience. The documentation is shockingly uninformative about this. There is no formal complete definitive specification, so far as I have discovered, of the structure of a grammar. Moreover, many aspects of a grammar are described in separate and scattered documents that can be difficult to discover. You should certainly keep on hand a copy of the grammar page in the manual, as well as James Edward Gray II’s book. But I will attempt to do a better job here of assembling and summarizing the facts.

#t
现在我们来看看一门语言语法实际呈现出来的结构。我说“呈现出来的”，是因为这只是我根据自己的经验所作的猜测。关于这一点，文档的信息量少得令人震惊。就我目前所发现的而言，并不存在关于语法结构的正式、完整、权威的规范说明。此外，语法的许多方面都分散在各自独立且零散的文档中加以描述，这些文档可能很难找到。你当然应该手边备有一份[手册中的语法页面](https://macromates.com/manual/en/language_grammars#language_grammars)，以及 James Edward Gray II 的[书](https://pragprog.com/book/textmate/textmate)。不过，我会在这里尽力把相关事实更好地汇集和总结一番。

> 译注：书的链接似乎也已失效。
::

::translate-paragraph
#o
### Property List Syntax

#t
### 属性列表语法
::

::translate-paragraph
#o
The grammar is portrayed by the bundle editor as an old-style property list. Under the hood, however, it is a new-style property list, i.e. XML. This means that every time you save, the grammar is “compiled” into a new-style property list, with an error dialog if you’ve made a mistake such that this can’t be done; and every time you abandon the grammar window, when you return to it, the window is repopulated by “decompiling” the saved XML into an old-style property list. Therefore:
* The grammar contents may not look the same when you return to it as when you left it; for example, things whose order does not matter (dictionary elements) may appear in a different order.
* If you leave the grammar window after seeing the error dialog and without correcting the error, you will lose your recent work, because your recent work wasn’t saved, and now it has been wiped out by reading and decompiling the previously saved XML from disk.

#t
> 译注：此段内容涉及 TextMate 编辑器的特性。根据译者经验来看，在今天的参考意义有限。

该语法由 bundle 编辑器呈现为旧式属性列表。但在底层，它其实是新式属性列表，即 XML。这意味着，每次你保存时，语法都会被“编译”为新式属性列表；如果你犯了某种导致无法完成编译的错误，就会出现错误对话框；而每次你离开语法窗口后，再回到该窗口时，窗口会通过将已保存的 XML“反编译”为旧式属性列表来重新填充内容。因此：
* 当你回到语法时，其内容可能和你离开时不一样；例如，那些顺序无关紧要的内容（字典元素）可能会以不同的顺序出现。
* 如果你在看到错误对话框后离开语法窗口，却没有更正错误， 你将会丢失最近的工作 ，因为你的最近工作没有被保存，而现在它已经被从磁盘读取并反编译先前保存的 XML 的操作抹掉了。
::

::translate-paragraph
#o
(This is more of a problem than you might expect, because the bundle editor window is responsive to clicks when it is not frontmost. Thus, you might switch to another window to study something about why your property list might be invalid, then click on the bundle editor window to switch back, and discover that, because of where you clicked, you’ve accidentally left your grammar window and have lost all your recent work. I know this from experience, obviously! My solution is: before switching away from the bundle editor with unsaved changes, copy its contents and paste them into BBEdit for safekeeping.)

#t
（这个问题比你预想的更严重，因为 bundle 编辑器窗口即使不在最前面，也会响应点击。因此，你可能会切换到另一个窗口去研究为什么你的属性列表可能无效，然后点击 bundle 编辑器窗口想切回来，却发现由于你点击的*位置*，你不小心离开了语法窗口，并丢失了所有最近的工作。不要问我是怎么知道这一点的！我的解决办法是：在带着未保存的更改离开 bundle 编辑器之前，先复制其内容并粘贴到 BBEdit 中妥善保存。）
::

::translate-paragraph
#o
An old style property list has two kinds of collection: arrays and dictionaries.
* An array, bounded by parentheses `()`, is an ordered list of elements separated by comma. It does no harm to follow the last element with a comma as well, and I recommend that you do so.
* A dictionary, bounded by curly braces `{}`, is an unordered list of name–value pairs separated by and ending with semicolon. A name–value pair is joined by an equal sign. The name does not have to be quoted, and usually will not be, unless it contains spaces or numbers. String values will be single quoted.

#t
旧式属性列表有两种集合：数组和字典。
* 数组由括号 `()` 包围，是一个由逗号分隔的有序元素列表。在最后一个元素后面也加上逗号并无妨害，而且我建议你这样做。
* 字典由花括号 `{}` 界定，是一个无序的名称–值对列表，各名称–值对之间以及末尾都用分号分隔。名称–值对由等号连接。名称不必加引号，通常也不会加引号，除非其中包含空格或数字。字符串值将使用单引号。
::

::translate-paragraph
#o
**NOTE**: In the grammar structure, any dictionary can contain a comment entry. This can be extremely useful and I recommend liberal use of this feature.

#t
**注意**：在语法结构中，*任何*字典都可以包含一个 comment 条目。这一点极为有用，我建议大量运用这一特性。
::

::translate-paragraph
#o
### Top Level Structure

#t
### 顶层结构
::

::translate-paragraph
#o
Before I can describe the top level of a language grammar, I need to tell you that a match rule (also called a pattern) is a dictionary. But I’m not going to tell you what’s in a match rule until later.

#t
在描述某种语言语法的顶层之前，我需要先告诉你， *匹配规则*（也称为*模式*）是一个字典。但匹配规则*里面*有什么，我稍后再讲。
::

::translate-paragraph
#o
The top level, in the TextMate 2 bundle editor window, is a dictionary — that is, it’s a pair of curly braces {}. Some of the entries in the real underlying dictionary are now edited through fields in the bundle editor drawer. Of these, the most important is the grammar’s scope, listed in the drawer’s Grammar field. This is the main scope that will be assigned to the entire document. It is typically a specialization of some existing scope, in order to acquire related bundle-based features, though not usually in such a way that an existing grammar will be injected automatically on top of yours.

#t
在 TextMate 2 的 bundle 编辑器窗口中，顶层是一个字典——也就是说，它是一对花括号 `{}`。底层真实字典中的某些条目现在通过 bundle 编辑器抽屉中的字段来编辑。其中最重要的是语法的作用域，列在抽屉的语法（Grammar）字段中。这是将分配给整个文档的主作用域。它通常是某个现有作用域的特化，以便获得相关的基于 bundle 的功能，不过通常不会以让现有语法自动注入到你的语法之上的方式进行特化。
::

::translate-paragraph
#o
For example, `text.html.markdown` is not magically imposed upon by the Text bundle’s grammar (which is scoped to `text.plain`) or by the HTML bundle’s grammar (which is scoped to `text.html.basic`). But because it is a specialization of `text.html`, it does magically acquire any features scoped to `text.html`, such as the Command-Ampersand keyboard shortcut from the HTML bundle.

#t
例如，Text bundle 的语法（其作用域为 `text.plain`）或 HTML bundle 的语法（其作用域为 `text.html.basic`）并不会神奇地强加到 `text.html.markdown` 上。但是，由于它是 `text.html` 的一种特化，它确实会神奇地获得任何作用域为 `text.html` 的功能，例如来自 HTML bundle 的 Command-Ampersand 键盘快捷键。
::

::translate-paragraph
#o
On the other hand, in the Bundle Development bundle, the Language Grammar grammar is scoped as `source.plist.textmate.grammar` exactly so that the Property List bundle’s Property List (Old-Style) grammar (`source.plist`) can be magically imposed upon it; the former is a pure specialization of the latter.

#t
另一方面，在 Bundle Development bundle 中，Language Grammar 语法的作用域被精确地设置为 `source.plist.textmate.grammar`，正是为了让属性列表 bundle 的属性列表（旧式）语法（`source.plist`）能够神奇地施加于其上；前者是后者的纯粹特化。
::

::translate-paragraph
#o
From here on, let’s confine ourselves to what’s shown in the bundle editor window itself. The top-level dictionary can contain (aside from a comment) a patterns array and (optionally) a repository dictionary, and that’s all.

#t
从现在开始，让我们仅局限于 bundle 编辑器窗口本身所显示的内容。顶层字典可以包含（除注释外）一个 patterns 数组和（可选的）一个 repository 字典，仅此而已。
::

::translate-paragraph
#o
* A patterns array is an array of match rules. The fact that it’s an array is important, because order matters. Matches are performed in the order listed. TextMate considers lines of a document one at a time, looking within each one for matches. When we make a match, that’s the end for everything in that line up to that point. Thus, you can effectively make conditional rules by judicious ordering of a patterns array.
* A repository is a dictionary, and it may contain two kinds of thing:
  * A repository may contain named match rules. The fact that the rules are named is important, because this means that a match rule can refer to another match rule by name, provided the latter is in a repository.
  * A repository may contain named top levels. That is, a repository entry might be a name paired with a dictionary containing a patterns array and (optionally) a repository dictionary.

#t
* patterns 数组是由匹配规则组成的数组。它作为数组这一点很重要，因为*它的顺序至关重要*。匹配是按照列出的顺序进行的。TextMate 逐行考虑文档中的每一行，在每一行内寻找匹配项。一旦我们完成了一次匹配，该行中直到该匹配点之前的所有内容就到此为止了。因此，通过精心安排 patterns 数组的顺序，你可以有效地创建条件规则。
* repository 是一个字典，它可以包含两种类型的内容：
  * repository 可以包含具名的*匹配规则*。规则*具名*这一点很重要，因为这意味着一个匹配规则可以*通过名称*引用另一个匹配规则，只要后者也位于 repository 中。
  * repository 可以包含具名的*顶层*。也就是说，repository 中的一个条目可能是键值对：一个名称作为键，对应一个 patterns 数组和（可选的）repository 字典作为值。
::

::translate-paragraph
#o
The patterns array inside a named dictionary inside a repository provides a way of naming (and thus referring to) a whole bunch of match rules simultaneously.

#t
repository 中具名字典内部的 patterns 数组提供了一种同时命名（从而引用）一整组匹配规则的方式。
::

::translate-paragraph
#o
The repository inside a named dictionary inside a repository has no structural significance — it is not special merely because it is at a deeper level — but it is certainly an organizational convenience, especially because the bundle editor gives you structural code folding.

#t
repository 内的具名字典中的 repository 并没有结构上的意义——它并不会仅仅因为位于更深的层级而变得特殊——但它确实带来组织上的便利，尤其是因为 Bundle 编辑器提供了结构化的代码折叠功能。
::

::translate-paragraph
#o
To illustrate and explain, here’s the structure of the Markdown grammar:

#t
为了说明和解释，下面是 Markdown 的语法的结构：
::

```textmate
{
  patterns = (... match rules ...);
  repository = {
    block = {
      patterns = (... match rules ...);
      repository = {
        blockquote = {... one match rule ...};
        ...
      };
    };
  };
}
```

::translate-paragraph
#o
With that structure, the name `block` can be used to refer to all of the block > patterns match rules simultaneously. The blockquote match rule, despite its depth (a repository within a repository), can be referred to from anywhere.

#t
有了这种结构，名称 `block` 可以用来同时指代所有 `block > patterns` 匹配规则。`blockquote` 匹配规则尽管层级很深（repository 中的 repository），却可以从任何地方引用。
::

![演示图片](textmate/grammarTopLevel.png)

::translate-paragraph
#o
## Match Rules

#t
## 匹配规则
::

::translate-paragraph
#o
A match rule, also known as a *pattern*, is where the power lies in a language grammar. It is the part of the grammar that actually instructs TextMate’s parser what to do: “as you walk through the text, look for this pattern and assign this scope.”

#t
匹配规则，也称为*模式*，是语言语法强大之处所在。它是语法中真正指示 TextMate 解析器要做什么的部分：“当你遍历文本时，查找这个模式并赋予这个作用域。”
::

::translate-paragraph
#o
A match rule, as I’ve already said, is a dictionary. In describing the overall structure of the language grammar, I’ve already told you the two main places where match rules can go:
* A match rule can be one entry in a `patterns` array.
* A match rule can be a named dictionary in a repository.

#t
正如我已经说过的，匹配规则是一个字典。在描述语言语法的整体结构时，我已经告诉过你匹配规则可以放入的两个主要位置：
* 匹配规则可以是 `patterns` 数组中的一个条目。
* 匹配规则可以是 repository 中的一个命名字典。
::

::translate-paragraph
#o
I have not, however, said anything yet about what is inside a match rule dictionary. Now it’s time to do that. There are actually three possible structures for the contents of a match rule:
* An `include`.
* A `match` pattern.
* A `begin` / `end` (or `begin` / `while`) pattern.

#t
然而，我还没有说过匹配规则字典内部有什么。现在是时候说这个了。匹配规则的内容实际上有三种可能的结构：
* 一个 `include`。
* 一个 `match` 模式。
* 一个 `begin` / `end`（或 `begin` / `while`）模式。
::

::translate-paragraph
#o
We will consider each in turn. But first, I’ll mention two things that any match rule can contain:
* A comment. This is a name–value pair named `comment`.
* An off switch. This is a name–value pair named `disabled`, with value `1`. This is a convenient way to experiment or develop, leaving a rule in place while effectively commenting it out.

#t
我们将依次讨论它们。但首先，我要提到*任何*匹配规则都能包含的两样东西：
* 一条注释。这是一个名为 `comment` 的名称–值对。
* 一个关闭开关。这是一个名为 `disabled` 的名称–值对，其值为 `1`。这是一种方便的试验或开发方式，可以保留规则，同时实际上把它注释掉。
::

::translate-paragraph
#o
### An Include Match Rule

#t
### include 匹配规则
::

::translate-paragraph
#o
An `include` match rule is a way of saying: “Substitute for me the named match rule(s) I hereby specify.” Such a match rule contains, I believe, just one name–value pair. The name of that pair is `include`. The value is usually the name of something in the repository at any level, preceded by a hash-sign. (But it cannot, I believe, be `#repository`, even though that might be the name of something in the repository.)

#t
一条 `include` 匹配规则是这样一种表达方式：“用我在此指定的具名匹配规则来替换我。”这样的匹配规则显然只包含一个键值对。该对的名称是 `include`。其值通常是 repository 中任意层级的某个事物的名称， 前面带有一个井号 。（但我认为，它不能是 `#repository`，即便那可能是 repository 中某个事物的名称。）
::

::translate-paragraph
#o
To see `include` rules in action, let’s return to and fill out a little further the structure of the Markdown grammar:

#t
要看看 `include` 规则如何生效，让我们回到 Markdown 语法的结构，并再稍微补充一下：
::

```textmate
{
  patterns = (
    { include = '#block'; }
  );
  repository = {
    block = {
      patterns = (
        { include = '#separator'; };
        { include = '#heading'; };
        { include = '#blockquote'; };
        ...
      );
      repository = {
        blockquote = {... one match rule ...};
        heading = {... one match rule ...};
        ...
        separator = {... one match rule ...};
      };
    };
  };
}
```

::translate-paragraph
#o
Consider how, by means of include rules, the `blockquote` match rule is actually brought into play. There is only one top-level match rule — the `include` rule specifying `#block`. This rule effectively substitutes for itself the entire array of `patterns` listed under `block` in the repository. These patterns are themselves all include rules. The result is exactly as if the top level `patterns` array were the include rule for `#separator`, then the include rule for `#heading`, then the include rule for `#blockquote`, and so on.

#t
请思考一下，借助 include 规则，`blockquote` 匹配规则实际上是如何被真正启用的。顶层只有一条匹配规则——即指定 `#block` 的 include 规则。这条规则实际上是把 repository 中 `block` 下列出的整个 `patterns` 数组替换到自己的位置上。这些模式本身全都是 include 规则。结果来看，顶层的 `patterns` 即为：`#separator` 的 include 规则，是 `#heading` 的 include 规则，然后是 `#blockquote` 的 include 规则，依此类推。
::

::translate-paragraph
#o
Those include rules, in turn, are virtually replaced by the rules that their values name — the actual `separator` rule from the repository, the actual `heading` rule from the respository, the actual `blockquote` rule from the repository, and so forth. Those actual rules are all defined in the second-level repository.

#t
而那些 include 规则，又会被其值所指名的规则所实际取代——即来自 repository 的*真正*的 `separator` 规则、来自 repository 的*真正*的 `heading` 规则、来自 repository 的*真正*的 `blockquote` 规则，等等。那些真正的规则全都定义在第二级 repository 中。
::

::translate-paragraph
#o
(Note that the order of the `include` rules in the `patterns` array is significant; an array is ordered. The order of the actual rules in the second-level repository, on the other hand, is undefined and unimportant; it happens to be shown as alphabetical, and that’s convenient, but it’s just a detail of the display implementation.)

#t
（注意，`patterns` 数组中各条 `include` 规则的顺序是有意义的；数组是有序的。而另一方面，第二级 repository 中那些真正的规则的顺序则是无意义的，也不重要；它现在恰好按字母顺序显示，只是图个方便，这是实现方面的一个细节。）
::

::translate-paragraph
#o
The value of an `include` rule can alternatively be a scope name. This is a good way to inject an entire grammar inside yours. For example, in my AsciiDoc bundle, I assume that the contents of a passthrough block (never mind what that is) will be XML. Therefore, inside my match rule for a passthrough block, I have an `include` rule specifying `text.xml`. This causes the whole grammar from the XML bundle to come into play in this region of my document. In addition, TextMate 2 permits a single named item to be plucked from a foreign repository using the syntax `scopeName#itemName`.

#t
`include` 规则的值也可以是一个*作用域名称*。这是将整个语法注入到你自己语法中的一种好方法。例如，在我的 AsciiDoc bundle 中，我假定透传块（passthrough block，别管它是什么）的内容将是 XML。因此，在我为透传块编写的匹配规则中，我有一条 `include` 规则，指定了 `text.xml`。这会让 XML bundle 中的整个语法在我的文档的这一区域中发挥作用。此外，TextMate 2 允许使用 `scopeName#itemName` 这一语法从外部 repository 中摘取单个命名项。
::

::translate-paragraph
#o
The value of an `include` rule can also be `$self`, meaning the whole current grammar, or `$base`, the grammar inside which we are embedded. They are used by several prominent grammars (such as the Objective-C grammar), but I have never used them and I don’t quite understand the details.

#t
`include` 规则的值还可以是 `$self`，即整个当前语法，或者 `$base`，即我们被嵌入其中的那个语法。它们被若干著名语法（例如 Objective-C 语法）所使用，但我从未用过它们，也不大理解其细节。
::

::translate-paragraph
#o
As I mentioned at the outset, as far as I can tell, if a match rule contains an `include` key, that is its only key (except possibly for `comment` and `disabled`).

#t
正如我在开头提到的，据我所知，如果一条匹配规则包含 `include` 键，那么这就是它唯一的键（可能除了 `comment` 和 `disabled` 之外）。
::

![演示图片](textmate/grammarMatchRuleType1.png)

::translate-paragraph
#o
### A One-Pattern Rule

#t
### 单模式规则
::

::translate-paragraph
#o
A one-pattern rule must contain at least this key–value pair:

#t
一条单模式规则至少必须包含以下键值对：
::

::translate-paragraph
#o
* The `match` key. Its value is a regular expression that the TextMate parser is to look for.

#t
* `match` 键。它的值是一个正则表达式，供 TextMate 解析器查找。
::

::translate-paragraph
#o
This is, I am at pains to stress, a single-line regular expression. The TextMate parser will not examine more than one line of text at a time; thus, a regular expression that includes a newline (\n) anywhere other than as the last matched character will never match. By the same token, though, it can be quite useful (especially in a “prose” language grammar such as the Markdown grammar) to end a regular expression with $\n? as a way of snarfing up the newline at the end of the line if there is one.

#t
我要竭力强调，这是一个*单行*正则表达式。TextMate 解析器一次不会检查超过一行文本；因此，如果一个正则表达式中包含换行符（`\n`），而它的位置不是在最后一个匹配字符处，那么这个正则表达式将永远不会匹配。不过，同样地，在正则表达式末尾加上 `$\n?`，用它来吞掉行尾的换行符（如果有的话），也可能相当有用（尤其是在像 Markdown 语法这样的“散文”语言语法中）。
::

::translate-paragraph
#o
A one-pattern rule may also contain this key–value pair:

#t
单模式规则还可以包含这个键值对：
::

::translate-paragraph
#o
* The `name` key. Its value is a scope, or an expression that evaluates to a scope. This is the scope that will be applied to the matched text. This scope assignment, in turn, has far-reaching implications for how the matched text will be styled by themes and settings, as I’ve already described above.

#t
* `name` 键。它的值是一个作用域，或者一个求值为作用域的表达式。这个作用域将被应用到匹配的文本上。同时，这个作用域的值对主题和设置如何为匹配文本设置样式具有深远影响，正如我上面已经描述的那样。
::

::translate-paragraph
#o
For example, here’s the rule from the Markdown grammar repository that picks out certain characters preceded by backslash:

#t
例如，下面是从 Markdown 语法的 repository 中挑选出某些前面带有反斜杠的字符的规则：
::

```textmate
escape = {
    name = 'constant.character.escape.markdown';
    match = '\\[-`*_#+.!(){}\[\]\\>]';
};
```

::translate-paragraph
#o
This means that any matches we find using the `escape` rule will be assigned the `constant.character.escape.markdown` scope. A theme or setting may then come along and style any `constant.character.escape` text.

#t
这意味着，我们使用 `escape` 规则找到的任何匹配项都会被赋予 `constant.character.escape.markdown` 作用域。然后，主题或设置可以自然而然的为任何 `constant.character.escape` 文本设置样式。
::

::translate-paragraph
#o
The scope name can be, as I mentioned earlier, “an expression that evaluates to a scope”. What do I mean by that? Well, the scope name is actually what TextMate calls a format string. For more about these, see this article. The syntax here is derived from shell programming syntax. With a format string, you can do things such as:

#t
如前所述，作用域名称可以是“一个求值结果为作用域的表达式”。我所说的*那个*是什么意思呢？其实，作用域名称就是 TextMate 所称的*格式字符串*。关于格式字符串的更多信息，请参见
[这篇文章](https://macromates.com/blog/2011/format-strings/)
。此处的语法源自 Shell 编程语法。借助格式字符串，你可以执行如下操作：
::

::translate-paragraph
#o
* Use a matched group as a term: Refer to it as `$0`, `$1`, and so forth.
* Use the value of a global variable as a term.
* Perform a transform, such as downcasing, on the value of a term.
* Do a find/replace on the value of a term.
* Supply a different result depending on whether a term (such as a matched group) is defined or not.

#t
* 将匹配组用作项：用 `$0`、`$1` 等来引用它。
* 将全局变量的值用作项。
* 对某项的值执行转换，例如转为小写。
* 对词条的值进行查找/替换。
* 根据一个项（例如匹配到的组）是否被定义，给出不同的结果。
::

::translate-paragraph
#o
A one-pattern rule may also contain this key–value pair:

#t
单模式规则还可以包含这个键值对：
::

::translate-paragraph
#o
* The `captures` key. Its value is a dictionary. In this dictionary, each key is a number or name corresponding to a matched group from the `match` expression, and the corresponding value is a dictionary. This dictionary may contain one or both of these entries:
  * A `name`. This is the scope that will be assigned to the matched group text.
  * A `patterns` array. This is a list of match rules to be sought within the matched group text — thus permitting the search for matches to continue inside the matched text.

#t
* `captures` 键。它的值是一个字典。在这个字典中，每个键都是一个数字或名称，对应 `match` 表达式中的一个匹配组，而对应的值是一个字典。这个字典可以包含以下条目中的一个或两个：
  * 一个 `name`。这是将赋给匹配组文本的作用域。
  * 一个 `patterns` 数组。这是一份*匹配规则列表*，需要在*匹配组文本内部*查找——从而允许匹配搜索在匹配到的文本内部继续进行。

> 译注：至不了解“匹配组”概念的同学，这是正则表达式的功能，可以从匹配命中的文本中提取不同的组，称之为匹配组。
> 
> 一个正则表达式可以包含多个匹配组。一个表达式中，（如有的话，）匹配组从前到后依次编号，从 1 开始。
::

::translate-paragraph
#o
This use of the `captures > patterns` structure is extremely important. Without it, a stretch of text matched by a match rule is considered finished, and TextMate’s search proceeds to the rest of the line after the matched text. With it, the stretch of matched text itself becomes a candidate for further matches.

#t
`captures > patterns` 结构的这种用法极其重要。没有它，由某条匹配规则匹配到的一段文本就会被视为已完成，TextMate 的搜索会继续处理该行中匹配文本*之后*的其余部分。有了它，匹配到的这段文本本身就成了进一步匹配的候选对象。
::

::translate-paragraph
#o
Here’s a simple minimal example. Imagine a toy markup language in which bold is delimited by asterisks and italic is delimited by underlines:

#t
下面是一个简单的最小示例。想象一种玩具标记语言，其中粗体用星号分隔，斜体用下划线分隔：
::

```textmate
{ patterns = 
  (
    {
      name = 'markup.bold.toy';
      match = '\*.*?\*';
    },
    {
      name = 'markup.italic.toy';
      match = '_.*?_';
    },
  );
}
```

::translate-paragraph
#o
This works, but only for bold and italic stretches of text that are separate, like this:

#t
这可行，但仅适用于*分开的*粗体和斜体文本段，就像这样：
::

```text
*This is bold.* _This is italic._ 
```

::translate-paragraph
#o
An italic stretch cannot occur inside a bold stretch, because once a stretch of text has been matched as bold, it is discarded from further consideration. If we want italic inside bold, and vice versa, to be possible, we can use the captures > patterns structure to duplicate the italic pattern inside the bold pattern and the bold pattern inside the italic pattern:

#t
斜体片段不能出现在粗体片段内部，因为一旦一段文本被匹配为粗体，它就会被排除在后续考虑范围之外。如果我们希望粗体内部可以出现斜体，反之亦然，我们可以使用 `captures > patterns` 结构，在粗体模式内部复制斜体模式，并在斜体模式内部复制粗体模式：
::

```textmate
{ patterns = 
  (
    {
      name = 'markup.bold.toy';
      match = '\*.*?\*';
      captures = {
        0 = { 
          patterns = (
            {
              name = 'markup.italic.toy';
              match = '_.*?_';
            }
          );
        };
      };
    },
    {
      name = 'markup.italic.toy';
      match = '_.*?_';
      captures = {
        0 = { 
          patterns = (
            {
              name = 'markup.bold.toy';
              match = '\*.*?\*';
            }
          );
        };
      };
    },
  );
}
```

::translate-paragraph
#o
That sort of thing is perfectly legal — the `patterns` array is a list of match rules, and we are providing match rules. And it works, correctly marking up text such as this:

#t
这种做法完全合法—— `patterns` 数组是一组匹配规则，而我们提供的正是匹配规则。而且它确实有效，能够正确地标记像这样的文本：
::

```text
*This is bold _containing italic_.* 
And _this is italic *containing bold*._
```

::translate-paragraph
#o
In this case, though, a neater approach would be to move the match rules into the repository so that they can be referred to by name, and use the captures > patterns structure with the patterns match rules being include rules, to continue the search for italic inside a matched bold stretch of text, and vice versa:

#t
不过在这种情况下，更简洁的做法是把匹配规则移入 repository，以便可以通过名称来引用它们，并使用 `captures > patterns` 结构， 其中 `patterns` 匹配规则为 `include` 规则 ，从而在已匹配的一段粗体文本中继续搜索斜体，反之亦然：
::

```textmate
{ patterns = (
    { include = '#bold'; },
    { include = '#italic'; },
  );
  repository = {
    bold = {
      name = 'markup.bold.toy';
      match = '\*.*?\*';
      captures = { 0 = { patterns = ( { include = '#italic'; } ); }; };
    };
    italic = {
      name = 'markup.italic.toy';
      match = '_.*?_';
      captures = { 0 = { patterns = ( { include = '#bold'; } ); }; };
    };
  };
}
```

::translate-paragraph
#o
WARNING: Do not put a `patterns` array at the top level of a one-pattern match rule. It doesn’t generate any explicit error, but it doesn’t work correctly either. So, for example, this is wrong:

#t
警告： 不要在单模式匹配规则的顶层放置 `patterns` 数组。它不会产生任何显式错误，但也不能正常工作。因此，举例来说， *这样写是错误的*：
::

```textmate
name = 'markup.bold.toy';
match = '\*.*?\*';
patterns = ( { include = '#italic'; } );
```

::translate-paragraph
#o
You are getting the benefit of my hard-fought experience here; it took me about a week of wrestling (and some direct help from Allan Odgaard) to learn the right way to do an `include` inside a one-pattern match rule.

#t
你在这里得到的是我历经艰难摸索的经验；我花了大约一周的反复折腾（以及 Allan Odgaard 的一些直接帮助），才学会在单模式匹配规则中正确使用 `include` 的方法。
::

![演示图片](textmate/grammarMatchRuleType1.png)

::translate-paragraph
#o
### A Two-Pattern Rule

#t
### 双模式规则
::

::translate-paragraph
#o
A two-pattern rule must contain two regular expressions: either begin and end, or (new in TextMate 2) begin and while. These are still single-line regular expressions (the TextMate parser does not consider more than one line at a time), but there are two of them, so together they may delimit a stretch of text that embraces multiple lines.

#t
一条双模式规则必须包含两个正则表达式：要么是 `begin` 和 `end`，要么是（TextMate 2 中新增的）`begin` 和 `while`。它们仍然是单行正则表达式（TextMate 解析器一次不会考虑超过一行），但由于有两个这样的表达式，它们合在一起就可以界定一段可跨越多行的文本。
::

::translate-paragraph
#o
* The `begin` key is a regular expression that will be sought initially.
* If the `begin` regular expression generates a match, TextMate will start looking immediately after it (starting in the same line, if the `begin` match did not snarf up the entire line) for the `end` or `while` expression.
  * If you provided an `end` expression, TextMate will keep walking the document until it matches the `end` expression, and will stop.
  * If you provided a `while` expression, TextMate will keep walking the document until it comes to a line where the `while` expression fails.

#t
* `begin` 键是一个正则表达式，将首先被查找。
* 如果 `begin` 正则表达式产生了匹配，TextMate 会从匹配结束之后紧接着的位置开始（如果 `begin` 的匹配没有吞掉整行，就从同一行开始）查找 `end` 或 `while` 表达式。
  * 如果你提供了 `end` 表达式，TextMate 会继续在文档中向下查找，直到匹配到 `end` 表达式，然后停下。
  * 如果你提供了 `while` 表达式，TextMate 会继续在文档中向下查找，直到遇到 `while` 表达式匹配失败的那一行。
::

::translate-paragraph
#o
Neither of these pairs works quite the way I would have intuitively expected, so I’m going to say some more about them.

#t
这两对组合的表现都跟我直觉上预期的很不一样，所以我要再多说几句。
::

::translate-paragraph
#o
With `begin` / `end`, if the `end` pattern is not found, the overall match does not fail: rather, once the `begin` pattern is matched, the overall match runs to the end pattern or to the `end` of the document, whichever comes first. The underlying architectural reason is that the TextMate parser does not backtrack; once the `begin` pattern is matched, it is matched successfully and that’s that — TextMate can’t change its mind and decide that it shouldn’t have matched the `begin` pattern after all.

#t
对于 `begin` / `end`，如果*没有*找到 `end` 模式，整体匹配并不会失败 ：相反，一旦 `begin` 模式匹配成功，整体匹配就会一直延续到 `end` 模式*或文档末尾*，以先到者为准。其底层架构上的原因是 TextMate 的解析器不会回溯；一旦 `begin` 模式匹配成功，它就是匹配成功了，仅此而已——TextMate 无法改变主意，认定它当初本不该匹配 `begin` 模式。
::

::translate-paragraph
#o
This is a major limitation in the degree of intelligence a language grammar can exhibit; it is said to be due to the need for speed, and perhaps for simplicity. In any case, it is intentional, and some grammars actually take deliberate advantage of this behavior. For example, the Property List Old-Style grammar starts like this:

#t
这是语言语法所能表现出的智能程度的一大限制；据说这是由于对速度的需求，或许也是为了简单。无论如何，这是有意为之的，而且有些语法实际上会故意利用这种行为。例如，属性列表旧式语法开头是这样的：
::

```textmate
{ patterns = (
    { begin = '(?=\(|\{)';
      end = '(?=not)possible';
```

::translate-paragraph
#o
The expression `(?=not)possible` is, uh, not possible; the next character can’t be “n” if the next character is “p”. This `end` pattern is designed to fail. The whole pair thus means: Once you have encountered a left parenthesis or a left curly brace, immediately snarf it up along with the entire remainder of the document (and just about everything else in the grammar then works through `include` rules inside that snarfed-up material).

#t
表达式 `(?=not)possible` ，嗯……是不可能的；如果下一个字符是“p”，那下一个字符就不可能是“n”。这个 `end` 模式被设计为必然失败。因此这一对整体意味着：一旦遇到左圆括号或左花括号，就立即把它连同文档剩余的全部内容一起吞掉（然后语法中几乎所有其他内容都通过这个被吞下内容里的 `include` 规则来运作）。
::

::translate-paragraph
#o
With `begin` / `while`, things are even stranger. It’s rather difficult for me to deduce what the rules are; they are not yet documented, and I know of only one grammar that uses `begin` / `while`, namely the Markdown grammar, so my available examples are quite limited. Here’s what I’ve been able to guess:

#t
对于 `begin` / `while`，情况就更加奇怪了。我相当难以推断规则是什么；它们还没有文档记录，而且我只知道有一个语法使用了 `begin` / `while`，也就是 Markdown 语法，因此我可用的例子相当有限。以下是我所能猜测到的：
::

::translate-paragraph
#o
1. Unlike `begin` / `end`, the text matched by `begin` / `while` stops at the end of the current line. Thus, if the `begin` is encountered and the `while` is never encountered, only the rest of the line containing the `begin` text is subsumed into the matched text.
2. After encountering a `begin` match, the TextMate parser looks in the next line to see if it can match the `while` pattern. If it can, it incorporates the matched text and the entire rest of that line, and looks in the next line to see if it can match the `while` pattern. This continues until a line is encountered in which the `while` pattern cannot be matched.

#t
1. 与 `begin` / `end` 不同，`begin` / `while` 匹配的文本会在当前行末尾停止。因此，如果遇到了 `begin` 而从未遇到 `while`，那么只有包含 `begin` 文本的该行剩余部分会被并入匹配文本中。
2. 在遇到 `begin` 匹配之后，TextMate 解析器会在*下一行*中查找，看它能否匹配 `while` 模式。如果能，它就会把匹配到的文本*以及该行剩余的全部内容*一并纳入，然后再到*下一行*中查找，看它能否匹配 `while` 模式。如此继续，直到遇到某一行无法匹配 `while` 模式为止。
::

::translate-paragraph
#o
Again, there is no backtracking; failure to find the `while` pattern at all is not a reason for rejecting the `begin` match that was already found. Notice also that nothing about these rules says that the resulting matched stretches of text have to be contiguous. That’s because they don’t have to be contiguous! So, for example, let’s say that the `begin` pattern matches an asterisk \(*\) and the `while` pattern matches a plus sign \(\+\). Then \(matching stretches are shown in caps\):

#t
同样，这里没有回溯；完全找不到 `while` 模式，并不能成为拒绝已经找到的 `begin` 匹配的理由。另请注意，这些规则中没有任何一条规定：最终匹配到的文本片段必须是连续的。这是因为它们并不需要连续！所以，举个例子，假设 `begin` 模式匹配星号（\*），而 `while` 模式匹配加号（+）。那么（匹配到的片段用大写字母表示）：
::

```text
This is +no match.
This is *A MATCH.

This is +no match.
This is *A MATCH.
This is +ALSO A MATCH.
This is +A MATCH TOO.

This is +no match.
```

::translate-paragraph
#o
Well, I told you it was strange! However, it seems likely that I’m abusing the `begin` / `while` rule with this example. This curious “from here to the end of the line” match behavior is probably intended for patterns that mark an entire line in terms of how it begins. You’ll notice that all the Markdown grammar uses of the `begin` / `while` work that way. For example, the blockquote rule is written like this:

#t
好吧，我*告诉过你*这很奇怪！不过，我这个例子很可能是在滥用 `begin` / `while` 规则。这种奇特的“从这里到行尾”的匹配行为，大概是针对那些依据*行的开头方式*来标记*整行*的模式而设计的。你会注意到，Markdown 语法中所有使用 `begin` / `while` 的地方都是这样运作的。例如，blockquote 规则是这样写的：
::

```text
begin = '(^|\G)(>) ?';
while = '(^|\G)(>) ?';
```

::translate-paragraph
#o
That means, in essence: match an entire line that begins with one \(`begin`\) or more \(`while`\) greater-than signs \(and perhaps one space after the greater-than sign\), and keep matching entire successive lines \(`while`\) that begin that way.

#t
也就是说，本质上：匹配以一个大于号（`>`）（`begin`）或多个（`while`）大于号开头（且大于号后可能有一个空格）的整行，并持续匹配以该方式开头的整个连续行（`while`）。

> 译注：这是 Markdown 语法中的引用块。
::

::translate-paragraph
#o
Now let’s talk about other key–value pairs that can appear in a two-pattern rule.

#t
现在，我们来谈谈双模式规则中可以出现的其他键值对。
::

::translate-paragraph
#o
* The `name` key. This is the scope \(or an expression evaluating to a scope\) to be applied to the entire matched stretch\(es\) of text starting at the start of the `begin` match.
* The `contentName` key. This is the scope to be applied to what’s between the `begin` match and the `end` match \(or the end of the document\). \(With `begin` / `while`, this isn’t illegal, but it’s pointless, as it covers exactly the same stretch\(es\) as the `name` scope.\)
* The `beginCaptures` and `endCaptures` \(or `whileCaptures`\) keys. These work like the `captures` key in the one-pattern rule: the value is a dictionary each of whose entries refers to a match group in the begin, end, or while pattern respectively, and is itself a dictionary containing name or patterns \(or both\). Thus you can apply a scope to, and/or continue searching inside, a matched stretch of text. If the name or number of the matched group happens to be the same for both the `begin` pattern and the other pattern, you can \(if appropriate\) use `captures` as a shorthand to avoid saying the same thing twice.
* The `patterns` key. This is like the `patterns` key inside the `captures` and `beginCaptures` \(and so forth\) dictionaries, but it applies to the region between the `begin` and `end` matches. Again, this is so that you can continue searching inside this stretch of text, which otherwise would be marked down as completed \(and TextMate would start matching after the `end` match\).

#t
* `name` 键。这是要应用于从 `begin` 匹配开始处算起的整个匹配文本片段的作用域（或求值为作用域的表达式）。
* `contentName` 键。这是要应用于 `begin` 匹配与 `end` 匹配*之间*内容（或文档末尾）的作用域。（对于 `begin` / `while`，这并不违规，但毫无意义，因为它覆盖的文本片段与 `name` 作用域完全相同。）
* `beginCaptures` 和 `endCaptures`（或 `whileCaptures`）键。它们的工作方式类似于单模式规则中的 `captures` 键：其值是一个字典，其中每个条目分别引用 begin、end 或 while 模式中的一个匹配组，而每个条目本身又是一个包含 name 或 patterns（或两者兼有）的字典。因此，你可以为一段匹配到的文本应用作用域，和/或继续在该文本内部搜索。如果匹配组的名称或编号恰好同时适用于 `begin` 模式和其他模式，那么你可以（在合适时）使用 `captures` 作为简写，以免把同一件事说两遍。
* `patterns` 键。它类似于 `captures`、`beginCaptures`（等等）字典内部的 `patterns` 键，但它作用于 `begin` 和 `end` 匹配之间的区域。同样，这是为了让你可以继续在这段文本内部搜索；否则这段文本会被标记为已完成，然后 TextMate 会从 `end` 之后继续进行匹配）。
::

::translate-paragraph
#o
A surprise arises if a match specified in the `patterns` array can be satisfied by continuing beyond the `end` match. What happens is that the match does continue beyond the `end`, and causes the `end` to shift with it. For example, suppose we have this rule:

#t
如果 `patterns` 数组中指定的某个匹配可以通过延续到 `end` 匹配之后来满足，就会出现一个意想不到的情况。实际发生的是，该匹配确实会延续到 `end` 之后，并导致 `end` 随之移动。例如，假设我们有这样一条规则：
::

```text
bold = {
  name = 'markup.bold.toy';
  begin = '\*';
  end = '\+';
  patterns = (
    { name = 'markup.italic.toy'; 
      match = '_.*?_';},
  );
};
```

::translate-paragraph
#o
If we start out like this, then things behave as we expect:

#t
如果我们这样开始，那么一切正如预期：
::

```text
This is *a
bold+ stretch of text.
```

::translate-paragraph
#o
The words “a bold” are in bold, and that’s the end of that. But now:

#t
“a bold”这几个词是粗体，一切安好。但现在：
::
```text
This is *a
_bold+ stretch_ of text.
```

::translate-paragraph
#o
I would have expected that since the italic rule can’t be satisfied inside the matched bold stretch, it wouldn’t be matched. However, TextMate has loaded the entire second line for examination, and thus succeeds in matching the words “bold stretch” as italic. Moreover, we have now “punched through” the original `end` of the bold stretch, and the entire rest of the line becomes bold, along with the entire rest of the document until and unless we come to another bold `end` match \(a plus sign\). I find this both surprising and disappointing, as it greatly limits the kinds of natural logical structure you can successfully express.

#t
我原本以为，既然斜体规则无法在已匹配的粗体片段内部得到满足，它就不会被匹配。然而，TextMate 加载了*整个第二行*进行检查，因此成功地将“bold stretch”这几个词匹配为斜体。此外，我们现在已经“穿透”了粗体片段原本的 `end`，于是*该行剩余的全部内容*都变成了粗体，连同*文档剩余的全部内容*也会变成粗体，直到并且除非我们遇到*另一个*粗体 `end` 匹配（一个加号）。我觉得这既令人惊讶又让人失望，因为它极大地限制了你能够成功表达的自然逻辑结构类型。
::

::translate-paragraph
#o
\(In addition, we are told that, in case both a subpattern \(from the `patterns` array\) and the main end pattern would end exactly on the same character, the end pattern wins unless you set the `applyEndPatternLast` key to 1. I don’t understand what this means and I won’t try to explain it.\)

#t
（此外，我们被告知，如果某个子模式（来自 `patterns` 数组）和主 end 模式恰好会在同一个字符处结束，那么 end 模式胜出，除非你把 `applyEndPatternLast` 键设为 1。我不明白这是什么意思，也不打算尝试解释它。）
::

![演示图片](textmate/grammarMatchRuleType3.png)

::translate-paragraph
#o
## Developing Your Grammar

#t
## 开发你的语法
::

::translate-paragraph
#o
In conclusion, some pearls of advice about the process of actual development of your grammar.

#t
最后，关于实际开发你的语法的过程，给出一些宝贵的建议。
::

::translate-paragraph
#o
Collect all the documentation I’ve mentioned (including, I dare to suggest, this article) and leave everything open on your computer screen so that you can consult it as you work.

#t
收集我提到的所有文档（恕我斗胆建议，也包括这篇文章），并把它们都打开放在你的电脑屏幕上，以便你在工作时查阅。
::

::translate-paragraph
#o
Now create your initial language grammar and start writing rules. Your first and constant question will be, at all times: “Is this working as I intend?” Thus you will need to have open, at all times, a TextMate document whose type is set to correspond to the grammar you are developing. As you create rules, add test text to the document so that you can see how it is affected.

#t
现在创建你的初始语言语法，并开始编写规则。你的第一个问题也是始终不变的问题，在任何时候都会是：“它是否按我预期的方式工作？”因此，你需要始终保持打开一个 TextMate 文档，并将其类型设置为与你正在开发的语法相对应。在创建规则时，向该文档中添加测试文本，以便观察它受到怎样的影响。
::

::translate-paragraph
#o
The big issue, of course, is whether a given stretch of text is being assigned the scope you think it should be. Unfortunately, TextMate gives you no simple way to discover this. You cannot, for example, say “Show me all the scope runs of this document.” Nor can you search for a scope within a document. So you need some other way to examine the scope\(s\) in force at a point of the document.

#t
当然，最大的问题在于，一段给定的文本是否被赋予了你认为它应该拥有的作用域。遗憾的是，TextMate 并没有提供什么简单的方法来发现这一点。例如，你无法说“显示此文档中所有的作用域区段”。你也不能在文档中搜索某个作用域。因此，你需要用其他方式来检查文档中某一点上生效的作用域。
::

::translate-paragraph
#o
One important technique is to select some text and then press Control-Shift-P or Control-Shift-Command-P. These are commands from the Bundle Development bundle that display the current scopes\(s\) in a tooltip \(which, unfortunately, vanishes if you so much as twitch the mouse\).

#t
一个重要的技巧是：选中一些文本，然后按 Control-Shift-P 或 Control-Shift-Command-P。这些是来自 Bundle Development bundle 的命令，它们会在工具提示中显示当前的作用域（遗憾的是，你哪怕只是轻轻动一下鼠标，它也会消失）。

> 译注：对于 VS Code，命令面板中有可以显示 TextMate 作用域的命令，同样在工具提示中显示，同样动一下鼠标就会消失 UwU。
::

::translate-paragraph
#o
Another clever device is to impose your own theme containing a special artificial scope \(such as `text.testing`\) that it styles in a very prominent way; you can then temporarily use that special scope as the name or contentName value in a rule to see just where that rule is applied in your test document. A newly created theme is empty, so you’ll probably want to paste into your theme the contents of an existing theme. For example, copy the whole contents of the Mac Classic theme; make a new theme in your bundle; select the new theme’s contents and paste the Mac Classic theme contents in its place; and now add a scope such as this:

#t
另一个巧妙的做法是套用你自己的主题，其中包含一个特殊的人为作用域（例如 `text.testing`），并让主题以非常醒目的方式为其设置样式；这样你就可以暂时将该特殊作用域用作规则中的 name 或 contentName 值，从而看清该规则在你的测试文档中究竟应用到了哪里。新建的主题是空的，所以你很可能希望把某个现有主题的内容粘贴到你的主题中。例如，复制 Mac Classic 主题的全部内容；在你的 bundle 中新建一个主题；选中新主题的内容，并把 Mac Classic 主题的内容粘贴到其位置；然后添加这样一个作用域：
::

```text
{   scope = 'text.testing';
    settings = {
        foreground = '#FFFFFF';
        background = '#0000FF';
    };
},
```

::translate-paragraph
#o
Now bring your test document to the front and choose View > Theme > YourTheme to apply your special theme to it.

#t
现在把你的测试文档置于最前，然后选择 View > Theme > YourTheme，将你的特殊主题应用到它上面。
::

::translate-paragraph
#o
The bad news here is that if you make a change to your theme, it is not registered immediately in your test document; you have to choose View > Theme > YourTheme again in order to make any changes take effect. (Like themes, certain other changes are applied only lazily. For example, if your bundle is to have Folding settings or Table of Contents settings, you’ll find that it can be quite difficult to nudge TextMate to reflect any changes you make in those settings.)

#t
坏消息是，如果你对主题做了更改，它并不会立即在你的测试文档中生效；你必须*再次*选择 View > Theme > YourTheme，才能让任何更改生效。（与主题一样，某些其他更改也只会延迟应用。例如，如果你的 bundle 要包含 Folding 设置或 Table of Contents 设置，你会发现要让 TextMate 反映你在这些设置中所做的任何更改可能相当困难。）
::

::translate-paragraph
#o
On the other hand, the good news — the really good news — is that any change you make in your grammar takes effect as soon as you save. Thus it is very easy to work simultaneously on the test document and the grammar. You can make a change in your grammar, save, and then immediately examine your test document to see how it is styled. If you’re using the special theme trick that I just suggested, you can create or modify a rule and set its scope to `text.testing` to see that it carves up the document the way you expect, before changing its scope to the real value you ultimately want it to have.

#t
另一方面，好消息——*真正*的好消息——是，你在*语法*中做出的任何更改都会——*保存就生效* 。因此，同时处理测试文档和语法非常容易。你可以在语法中做出更改、保存，然后立即查看测试文档，看看它的样式如何。如果你正在使用我刚才建议的特殊主题技巧，你可以创建或修改一条规则，并将其作用域设置为 `text.testing`，看看它是否按你预期的方式切分文档，然后再将其作用域改为你最终希望它拥有的实际值。
::

::translate-paragraph
#o
Finally, be prepared to crash. This happens, presumably, because the combination of the grammar and the test document has driven TextMate temporarily insane. However, that’s not bad; it’s good, because it’s better that you should crash TextMate now, while developing your grammar, than that TextMate should crash later and cause someone \(maybe you\) editing a document under the influence of your grammar to lose work on that document. Moreover, you probably will not lose any work on your grammar, because the evil change that you made in the grammar didn’t go into effect until you saved; so, *ipso facto*, you did save. \(You might lose work on your test document, but that’s far less important. Still, you should be saving that test document often as well.\)

#t
最后，*要做好崩溃的准备*。这种情况的发生，想必是因为语法与测试文档的组合让 TextMate 暂时失去了理智。不过，这并不坏，反而是好事，因为与其让 TextMate 在以后崩溃，害得某人（也许是你自己）在编辑受你的语法影响的文档时丢失该文档上的工作，不如在你开发语法的时候就让 TextMate 现在崩溃。此外，你大概不会丢失任何语法方面的工作，因为你在语法中做出的那个糟糕改动要到保存之后才会生效；所以，*很负责任地说*，你确实保存过了。（你可能会丢失测试文档上的工作，但这并不重要。不过，你确实应该经常保存那份测试文档。）

> 译注：*ipso facto* 是拉丁语短语，直译为“通过事实本身” / “当然、理所应当”。
::

::translate-paragraph
#o
To recover from such a crash, do not be a ninny \(like me\) and open the test document again in TextMate. That might merely cause TextMate to crash again! It is the combination of your grammar and this test document that is the source of the trouble. Instead, open TextMate without any document, get back to the bundle editor, and try to undo whatever bad thing you did that is causing the crash. It will not always be clear what this is, but I suspect that it is usually some sort of infinite recursion caused by a match rule containing an `include` rule containing itself.

#t
要从这样的崩溃中恢复，*千万不要犯傻*（像我一样），又在 TextMate 中打开那个测试文档。那可能只会让 TextMate 再次崩溃！造成麻烦的根源正是你的语法与*这个测试文档*的组合。所以你应该直接启动 TextMate 而不要打开任何文档，回到 bundle 编辑器，试着撤销你做过的那件导致崩溃的坏事。到底是什么引发了崩溃并不总是非常清晰，但我猜大概是某种无限递归，其成因是一条 match 规则中包含了一条包含自身的 `include` 规则。
::
