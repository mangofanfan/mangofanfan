## CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

...

## [1.1.4]

...
```

这是一个 :term-tip-markdown 文件，其作用是记录项目的 **更新日志**。此文件并非必须，事实上据芒果所知确实也比较罕见。

::message{level="info"}
[Keep a changelog](https://keepachangelog.com/zh-CN/1.1.0/) 网站说明了更详细的信息，也可以去看看？
::

::message{level="info"}
这是一个推荐文件，一般并非强制需求。
::

## 为什么需要更新日志？

作为版本管理的一部分。

为了让用户更好的了解项目的版本信息和更新内容，开发者 **理应** 维护一份人类可读的更新日志。

虽然 :term-tip-git 的提交记录也能看出项目的变迁，但那是工程记录，而非供用户阅读的。事实上，开发者往往也难以阅读 git 历史。

所以更新日志是有必要的。

## 约定的文件结构

更新日志名为 `CHANGELOG.md` 或 `changelog.md`。

在文件头部，添加以下内容作为标识：

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
```

在标记更新日志遵循规范的同时，这也会帮助一些自动工具获取项目的更新日志。

然后，对每一个版本使用如下结构的文本进行描述：

```markdown
## [0.2.1]

### Added
- 增加 mango.js 依赖

### Fixed
- 修复 MG-2345
- 修复 MG-360
```

对于三级标题表示的变更类型，我们做如下类型约定：

* Added - 新添加的功能。
* Changed - 对现有功能的变更。
* Deprecated - 已经不建议使用，即将移除的功能。
* Removed - 已经移除的功能。
* Fixed - 对 bug 的修复。
* Security - 对安全性的改进。

更新日志中，历史版本从近到远排布，初始版本在文件底部。

然后，为了表示正在开发的版本的更新，我们在已发布的最新版本的上方添加 **待发布版本** 的更新：

```markdown
## [Unreleased]

### ?
- ???
```

如上，我们拥有了一个规范的、人类可读的更新日志。
