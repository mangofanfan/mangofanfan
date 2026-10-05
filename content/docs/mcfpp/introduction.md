---
title: MCFPP 简明介绍
description: 一门为 Minecraft Java 数据包开发所设计的语言
index: 1
---

:term-tip-mcfpp 是一门为 Minecraft Java 版数据包开发所设计的语言。

::message{level=info}
由于在本部分的文档中会大量提及 `MCFPP` 关键词，因此在每一页中只提供一次术语表。
::

---

## 语言简述

### 数据包的诞生

Mojang 自 1.13 起，为 Java 版推出了「数据包」。

在数据包中，开发者可以以 MC 命令来编写脚本，在原版的基础上更方便地实现游戏玩法的开发。

在数据包出现以前，原版开发的模式局限于地图设计，以及通过地图中的命令方块来实现高级玩法。
现在，通过数据包，开发者获得了更简单的原版开发方式，并且可以将游戏玩法与地图创作解绑。

### 数据包的不足

数据包什么都好，唯一的问题在于，其要求开发者以 Minecraft 命令来进行脚本编写。

Minecraft 命令在游戏中是合格的，但是用于编写游戏脚本以实现复杂玩法的话，还是过于简陋且复杂了。

加上，Mojang 在新版本的更新中经常改动命令与数据包系统，这在给大部分玩家带来更好的游戏体验的同时，对于数据包开发却是毁灭性的。
旧版的数据包需要额外的工作才能升级到新版，且升级后不再和旧版游戏兼容。

其实在其他的场景中，我们有专门的工具或体系用于解决此问题。

* 在 Java 版模组开发中，通过成熟的构建工具链，模组可以轻松实现 1.7 ~ 26.1、Forge + Fabric + Quilt + NeoForge 的广泛兼容；
* 在 Python 等编程语言中，新的版本总是对一定范围内的旧版本保持兼容；
* ……

而 Minecraft Java 目前尚不存在这种先进的工具。

## 芒果为 MCFPP 做什么了吗？

很抱歉，芒果没有为 MCFPP 本身做出任何贡献……

但是，[在 Visual Studio Market 上的一个 MCFPP VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=MangoFanFanw.mcfpp)
是我维护的！

::link-github-card{name="MCFPP-vscode-extension" url="https://github.com/mangofanfan/MCFPP-vscode-extension"}
