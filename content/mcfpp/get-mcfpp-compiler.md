---
title: 获得 MCFPP 编译器
description: 需要获得编译器，然后才能开始使用 MCFPP 进行创作。
index: 5
---

:term-tip-mcfpp 是一门新的高级编程语言，其源代码通过编译后得到数据包产物。因此，你需要：

* Java 21 及以上版本的 Java 运行时。
* MCFPP 编译器。

## 获取 Java

:working

## 获取 MCFPP 编译器
### 从 GitHub Releases 下载

在 [MCFPP 的 GitHub Releases 列表](https://github.com/MinecraftFunctionPlusPlus/MCFPP/releases)
中选择一个版本，下载 `MCFPP.jar` 文件。

### 自行构建

如果 GitHub Releases 的版本不符要求，你就需要自行构建编译器。这需要一定的知识储备，大体上是比较简单的。

1. 克隆 MCFPP 仓库；
2. 导入 Gradle 项目；
3. 运行 Tasks/build 中的 build 任务；
4. 在 `/build/libs` 中收获构建产物 `MCFPP-<VERSION>.jar`。

如果你使用 JetBrains IntelliJ IDEA，以上步骤应该已经足够清晰；否则，日后会补充更详细的指南以供阅读。
