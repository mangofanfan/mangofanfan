---
title: 组件测试
description: 在此页面统一测试内容组件的显示效果。
date: 2026-09-17
---

## 重写的标准组件

与 HTML 标准元素对应的组件。

### 代码块

可以是行内代码，比如 `print` 是 :term-tip-python 的 builtin 方法，无需任何形式的 `import print` 即可使用。

也可以是代码块。

```css
@import 'tailwindcss';

@theme {
  --color-fan-50: oklch(0.979 0.03 196.672);
  --color-fan-100: oklch(0.961 0.056 189.385);
  --color-fan-200: oklch(0.942 0.085 189.453);
  --color-fan-300: oklch(0.888 0.128 189.552);
  --color-fan-400: oklch(0.825 0.128 189.312);
  --color-fan-500: oklch(0.803 0.13 189.296);
  --color-fan-600: oklch(0.701 0.118 187.727);
  --color-fan-700: oklch(0.536 0.091 188.875);
  --color-fan-800: oklch(0.447 0.076 186.208);
  --color-fan-900: oklch(0.29 0.049 186.257);
  
  --font-misans: MiSans, sans-serif;
  --font-maple-mono: Maple Mono CN, monospace;
}

@custom-variant dark (&:where(.dark, .dark *));
```

### 引用块

> 这是一条引用消息。

> 你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。
> 
> 游戏发生在一个被称作「提瓦特」的幻想世界。在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。

## 芒果.js 专有组件

### 徽章

徽章是行内组件，所以应该这样使用。<badge level="fan">注意事项</badge>

徽章可以加在标题之后，比如[这个页面](../mcfpp/vscode-extension/tech-book.md)。<badge level="info">提供信息</badge>

徽章还有两种级别。<badge level="warning">这是警告</badge><badge level="danger">这是危险</badge>

### 消息

::message{level=fan}
特色消息。
::

::message{level=info}
信息级别的消息。
::

::message{level=warning}
警告级别的消息。
::

::message{level=danger}
危险级别的消息。
::

::message{level=info}
那如果是一条……

有一点长！

的消息呢？
::

### 施工中

:working
