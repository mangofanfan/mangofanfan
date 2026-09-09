<script setup lang="ts"></script>

<template>
  <ol class="fan-ol flex flex-col gap-y-1">
    <slot />
  </ol>
</template>

<style>
ol.fan-ol {
  counter-reset: fan-ol-li;
}

ol.fan-ol li.fan-li {
  counter-increment: fan-ol-li;
  position: relative;
  padding-left: 1.8rem;
}

ol.fan-ol li.fan-li::before {
  content: counter(fan-ol-li); /* 输出当前序号 */
  position: absolute;
  left: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: var(--color-cyan-600, #0ea5e9);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
