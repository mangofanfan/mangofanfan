---
title: 扩展技术手册
description: MCFPP VSCode 扩展的技术手册
index: 100
---

本页介绍 :term-tip-mcfpp :term-tip-vscode 扩展的文件结构。

这些内容偏向扩展开发，因此如果你只是扩展的用户，此页内容对你可能没有帮助。

:link-github-card{name="MCFPP-vscode-extension" url="https://github.com/mangofanfan/MCFPP-vscode-extension"}

---

## 扩展提供的设置

### mcfpp.java.executablePath

> Java 可执行文件路径，用于启动 MCFPP 语言服务器和 MCFPP 编译器。
> 
> 需要 Java 21 及以上版本。

可配合扩展提供的命令 `mcfpp.command.testJavaExecutable` 检查是否可用。

### mcfpp.compiler.path

> MCFPP 编译器路径。

在使用模板创建的项目中，此设置已作为 **工作区设置** 被写入模板包含的 `.vscode/settings.json`
中，指向模板中包含的编译器（位于 `.mcfpp/mcfpp.jar`）故一般不需手动设置。

## 扩展提供的命令

### mcfpp.command.testJavaExecutable

> 测试扩展设置中的 Java 可执行文件路径是否可用。
> 
> 会同时检查 Java 版本是否大于等于 21。

### mcfpp.command.createSimpleDatepackTemplate

> 创建简单数据包模板。

请参见 [简单模板](./create-simple-template.md) 文档了解此命令。

## 扩展文件结构

扩展文件目录同时也是一个 :term-tip-git 仓库，因此有一些文件会让你感觉眼熟，这是正常的。

### /examples <badge level="info">模板文件</badge>

包含一些被用在模板中的示例文件。

在创建 MCFPP 数据包模板时，你会见到它们。

### /server <badge level="info">语言服务器</badge>

目录下包含 MCFPP 的语言服务器 `mcfpp-language-server.jar`。

语言服务器构建自 [mcfpp-language-support](https://github.com/Alumopper/mcfpp-language-support)，单 jar 产物大小为 80MB。
目前似乎没有优化方式，还请见谅。

语言服务器是 Java 程序，因此为启动语言服务器，扩展需要用户提供一个 Java 可执行程序路径，即扩展设置
`mcfpp.java.executablePath`。

### /src <badge level="info">源代码</badge>

目录下包含此扩展的源代码。

`extension.ts` 是 VS Code 对扩展文件的执行入口，其他源文件是芒果自行组织的。

此内容与 VS Code 扩展开发强相关，在此略过不提。

### /syntaxes <badge level="info">代码基本高亮</badge>

目录下有两个文件，`mcfpp.tmLanguage.json` 和 `mcfpp.tmLanguage.yaml`。

* `mcfpp.tmLanguage.json` 是 VS Code 读取的实际文件；
* `mcfpp.tmLanguage.yaml` 是人类可读的源文件。

```yaml [mcfpp.tmLanguage.yaml]
# 注意：VS Code 不会加载此文件，仅作为源文件维护。
# 修改此文件后需转换为 JSON（js-yaml）
$schema: https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json
name: MCFPP
scopeName: source.mcfpp
fileTypes:
  - mcfpp

patterns:
  - include: "#comment"

repository:
  # repository 条目必须是对象（内部用 patterns 包裹），不能直接是数组
  # 注释
  comment:
    patterns:
      # 文档注释 #{ ... }#
      - name: comment.block.documentation.mcfpp
        begin: '#\{'
        end: '\}#'
      # 块注释 ## ... ##
      - name: comment.block.mcfpp
        begin: "##"
        end: "##"
      # 行注释 # ...（必须放在最后）
      - name: comment.line.mcfpp
        match: "#.*"
```

上面展示了 yaml 文件的一部分。该文件定义了一系列规则集，在每个规则集中使用字符匹配的方式选中文本，并应用规则。

`comment` 是一个规则集（注释），`patterns` 是其中包含的规则。注意到截取的代码片段中，`comment` 包含了三个规则，对应三种不同的注释。

使用 `begin` 和 `end` 选取文本段落并应用 `name` 规则名称，或者使用 `match` 进行正则匹配并应用 `name` 规则名称。

这样，只要再编写对 MCFPP 语言的关键字的规则，并赋予对应的规则名称，我们就可以完成对 :term-tip-mcfpp 源文件的代码内容匹配。
再之后，只要为不同的规则名称的片段应用不同的颜色，就可以实现代码的基础高亮了。

![MCFPP 代码基础高亮](/mcfpp/code-highlight.png)

不过你还需要运行一行命令来将对 yaml 文件的更改同步到 json 文件中，因为 VS Code 实际读取的是 json 文件。

```bash
npx js-yaml syntaxes/mcfpp.tmLanguage.yaml > syntaxes/mcfpp.tmLanguage.json
```

或者，在 :term-tip-package-json 中，芒果已经定义了一个项目命令：

```bash
npm run syntaxes
```
