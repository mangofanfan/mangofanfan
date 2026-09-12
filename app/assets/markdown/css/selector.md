## 选择器

CSS 样式通过选择器与 HTML 元素关联，这样才可以让正确的样式被应用在正确的元素身上。

选择器按照范围从宽到窄，可以选择如下类型：

* HTML 标签
* class 类名
* id
* 使用伪类的选择器

这里主要介绍前三种常见选择器。并没有说伪选择器不常见的意思。

### 优先级

简单来说，选择器应用样式的顺序是，上方列出的顺序从上到下，同级顺序从前到后，晚应用的同一属性覆盖早应用的属性。

而直观的优先级就与顺序相反。

考虑以下 HTML 片段。

```html
<div class="zhi-shi-container">
    <div>
        <p>芝士一个 div</p>
    </div>
    <div class="zhi-shi">
        <p>芝士二个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-3">
        <p>芝士三个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-4">
        <p>芝士四个 div</p>
    </div>
</div>
```

在一个 `zhi-shi-container` 中包含了四片 `zhi-shi`。在未添加任何样式时，其显示效果如下：

::html-playground
<div class="zhi-shi-container">
    <div>
        <p>芝士一个 div</p>
    </div>
    <div class="zhi-shi">
        <p>芝士二个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-3">
        <p>芝士三个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-4">
        <p>芝士四个 div</p>
    </div>
</div>
::

增加一些样式吧，首先给所有的 `div` 都加上边框。

```css
div.zhi-shi-container div {
    border: 1px solid #6F42C1;
}
```

::html-playground
<div class="zhi-shi-container">
    <div>
        <p>芝士一个 div</p>
    </div>
    <div class="zhi-shi">
        <p>芝士二个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-3">
        <p>芝士三个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-4">
        <p>芝士四个 div</p>
    </div>
</div>
<style>
div.zhi-shi-container div {
    border: 1px solid #6F42C1;
}
</style>
::

再给最外围的容器（container）设置一个 flex 纵向布局，添加一些内边距和子元素间距，方便我们观察。

```css
div.zhi-shi-container {
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
```

::html-playground
<div class="zhi-shi-container">
    <div>
        <p>芝士一个 div</p>
    </div>
    <div class="zhi-shi">
        <p>芝士二个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-3">
        <p>芝士三个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-4">
        <p>芝士四个 div</p>
    </div>
</div>
<style>
div.zhi-shi-container {
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
div.zhi-shi-container div {
    border: 1px solid #6F42C1;
}
</style>
::

对 div 标签使用的边框出现在了四片芝士上。注意这里，芝士外围的 container 不受 `div.zhi-shi-container div` 边框的影响。

聪明的同学马上就能猜出对类名 `zhi-shi` 应用样式后的效果了，比如我们给 `zhi-shi` 加一个背景颜色：

```css
div.zhi-shi-container div.zhi-shi {
    background-color: #9ECBFF;
}
```

::html-playground
<div class="zhi-shi-container">
    <div>
        <p>芝士一个 div</p>
    </div>
    <div class="zhi-shi">
        <p>芝士二个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-3">
        <p>芝士三个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-4">
        <p>芝士四个 div</p>
    </div>
</div>
<style>
div.zhi-shi-container {
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
div.zhi-shi-container div {
    border: 1px solid #6F42C1;
}
div.zhi-shi-container div.zhi-shi {
    background-color: #9ECBFF;
}
</style>
::

再聪明一些的同学也能猜出对 id `zhi-shi-3` 和 `zhi-shi-4` 应用样式的效果了，比如来给文字换两个颜色：

```css
div.zhi-shi-container div.zhi-shi#zhi-shi-3 {
    color: #c50059;
}

div.zhi-shi-container div.zhi-shi#zhi-shi-4 {
    color: #0003c5;
}
```

::html-playground
<div class="zhi-shi-container">
    <div>
        <p>芝士一个 div</p>
    </div>
    <div class="zhi-shi">
        <p>芝士二个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-3">
        <p>芝士三个 div</p>
    </div>
    <div class="zhi-shi" id="zhi-shi-4">
        <p>芝士四个 div</p>
    </div>
</div>
<style>
div.zhi-shi-container {
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
div.zhi-shi-container div {
    border: 1px solid #6F42C1;
}
div.zhi-shi-container div.zhi-shi {
    background-color: #9ECBFF;
}
div.zhi-shi-container div.zhi-shi#zhi-shi-3 {
    color: #c50059;
}
div.zhi-shi-container div.zhi-shi#zhi-shi-4 {
color: #0003c5;
}
</style>
::

### 精确选择

笨笨的同学一定也发现了，`div.zhi-shi-container div` 是什么意思呢？

选择器之间可以使用空格分隔，表示在前者选择的目标的子元素中选择后者，然后应用样式。

也就是说，`div.zhi-shi-container div` 帮助我们选择芝士容器中的所有芝士（`div`），而不是整个页面中所有的 `div`。

**空格是从前者的子元素中继续选择。**

你可能还见过 `>` 分隔两堆选择器，这与空格类似，只是 `>` 要求从前者的**直接子元素**中选择后者。

**空格允许从子元素的子元素中选择，允许从子元素\[的子元素...\]中选择，而 `>` 只允许从子元素中选择。**

然后，直接拼接的多个选择器就要求选择同时符合所有选择器的元素。例如 `div.zhi-shi#zhi-shi-3`
要求选择拥有 `zhi-shi` 类名、id 为 `zhi-shi-3` 的 `div`。

不过在前端的最佳实践中，一个页面内的 id 应该是唯一的，这时你就可以只写 `#zhi-shi-3`，效果是一致的。

同理，很多时候 `div` 也是可有可无的——很多时候，类名已经足够精确，只要你的页面拥有良好的实践，除非你有特殊需求。
