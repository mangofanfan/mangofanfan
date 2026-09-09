---
title: 创建简单模板
description: 创建简单 MCFPP 数据包模板
index: 2
---

本页文档将引导您创建**简单 :term-tip-mcfpp 数据包模板**，并介绍简单模板的各部分内容。

::message{level="info"}
本页文档的大部分内容是在扩展开发过程中编写的。
::

## 什么是简单模板？

MCFPP 有两种使用方式，其一是通过命令行，其二是通过 Gradle。

此扩展优先实现使用方式其一，以尽快实现可用。

一些术语 / 规范 / 实践尚不被 MCFPP 官方所认可，因为 MCFPP 目前也处于早期阶段。本扩展会随 MCFPP
官方的动静而尽快更新，我保证。

## 使用命令创建

在安装完 MCFPP 扩展的 :term-tip-vscode 中，按下 `F1` 按键，或点击 VS Code
窗口顶部的输入栏并输入 `>`，进入命令面板。

![命令面板中的 MCFPP 命令](/mcfpp/vscode-command-panel.png)

选择**创建简单 MCFPP 数据包模板**，然后 VS Code 将询问三个问题，需要依次回答：

* 将要创建的数据包的**名称**是什么？
* 将要创建的数据包的**工作区**位于哪里？
* 使用什么版本的 **MCFPP 编译器**？

一些更具体的信息如下：

* 数据包名称将是最终产物的名称。
  * 如，创建名为 `OneBlockSkyIsland` 的数据包，那么最终得到的产物文件为 `OneBlockSkyIsland.zip`。
  * 数据包名称与 Minecraft 中的**命名空间**概念无直接关系。
  * 数据包名称不会在项目的其他部分硬性要求。大部分时候，我们都只认命名空间。
* 工作区将是你使用 VS Code 开发数据包的地点。
  * 你需要提供一个指向 Minecraft 的游戏存档目录中的一个存档文件夹的路径。
  * 形如 `D://.../.minecraft/saves/新的世界`。
  * 这会有助于你在游戏中即刻测试数据包。
* MCFPP 编译器不内置在扩展中，因此需要随项目创建而下载。
  * 实现 :term-tip-lsp 的[语言服务器](tech-book.md)内置在扩展中是合理的，但 MCFPP 编译器似乎不行。
  * 因此，扩展会从 :term-tip-github 获取已发布的 MCFPP 编译器列表，并提供给你选择。
  * 选择后，扩展会在创建项目时下载该编译器到项目中。
  * 扩展也提供了一个选项，让你跳过编译器下载，在创建项目后自行解决 MCFPP 编译器问题。

::message{level="warning"}
关于编译器的版本问题，请参见 [这个问题](../issues.md#github-releases-中的最新-mcfpp-编译器版本过低)。

关于解决方案，请参见 [获得 MCFPP 编译器](../get-mcfpp-compiler.md)。
::

三样信息提供完毕后，如验证无误，扩展将开始创建一个简单 MCFPP 数据包模板。

## 工作区内容

如果未跳过编译器下载，那么下载 MCFPP 编译器可能需要一段时间。下载完成后，VS Code
会提示你打开新创建的工作区。

在新创建的工作区中，本扩展暂时约定如下模板文件和目录：

* `datapack.json` - 配置文件。
* `src/` - 源代码目录。
* `.mcfpp/` - 一些辅助资源的目录，例如 MCFPP 编译器。

还有一些通用的可能有所帮助的文件和目录：

* `.gitignore` - :term-tip-git 的 ignore 文件。
* `.vscode` - VS Code 的配置文件目录，其中包含推荐配置。
* `README.md` - :term-tip-readme 。

`datapack.json` 的更多内容可参见 [MCFPP API 的有关页面](https://www.mcfpp.top/zh/quickstart/01project/02config-file.html)。
扩展只提供了一个模板，其中内容需要由您进行修改。

```json [datapack.json]
{
  "version": "1.21.4",
  "sourcePath": "src",
  "description": "Description. U can use JSON text here.",
  "namespace": "mcfpp",
  "jar": [],
  "targetPath": "E:\\path\\to\\your\\.minecraft\\saves\\Test World\\datapacks",
  "noDatapack": false,
  "compileArgs": []
}
```

::message{level="warning"}
文档中表述的一些参数被编译器报无效，但不影响构建。
::

此文件的名称也是本扩展约定的。如果你愿意，可以把它改成其他名称，只需记得同步更新编译命令即可。

## 开始工作

在 `README.md` 中也包含了一些简单的指南。

使用 `Ctrl` + `Shift` + `B` 打开快速构建面板，选择 `mcfpp` 开头的构建任务，即可构建数据包到目标目录。

建议保持游戏开启且进入该世界，然后在游戏中适时输入 `/reload` 来加载数据包。

生成的模板项目中包含一个 `example.mcfpp` 源文件，定义了 `hello()` 方法。因此，在游戏中加载完数据包后，你可以使用
`/function mcfpp:hello` 来调用该方法编译成的函数。

## 切换到完整模板

:working

但其实可以预告一下，不是什么简单的事情（）
