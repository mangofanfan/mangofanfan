## .gitignore

```text
# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules
```

`.gitignore` 是一个文本文件，用于向 :term-tip-git 提供需要忽略的文件和目录列表。

文件中，每一行都是一个相对于自身的文件或目录名。允许空行和 `#` 开头的注释行。

在行首添加 `!` 表示 **不忽略** 该行内容。比如，部分 :term-tip-vscode 项目需要排除 `.vscode`
目录的大部分内容，但保留 `.vscode/extensions.json` 和 `.vscode/tasks.json` 作为公用配置，则可以如下设置：

```text
# 保留 VSCode 的部分配置
.vscode
!.vscode/extensions.json
!.vscode/tasks.json
```
