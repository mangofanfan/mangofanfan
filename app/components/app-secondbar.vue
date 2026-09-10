<script setup lang="ts">
/**
 * 在屏幕宽度低于 md 时，
 * AutoMode === true => 左侧边栏隐藏在屏幕左侧边框外，
 * false => 移动到屏幕内。
 *
 * 在屏幕宽度高于 md 时，AutoMode 被忽略，永远常态显示。
 */
const isAutoMode = ref(true)
</script>

<template>
  <div
    :class="[
      'secondbar flex flex-col gap-y-3',
      'fixed w-full top-22 px-8 z-10 md:w-60 md:z-0 md:relative md:top-0 md:left-0 md:px-0',
      'md:shrink-0 md:basis-60',
      isAutoMode ? 'right-200' : 'left-0',
    ]"
  >
    <slot />
  </div>

  <client-only>
    <teleport to="#home-teleports">
      <fan-button
        level="fan"
        shape="circle"
        class="size-8 md:hidden"
        @click="
          () => {
            nextTick(() => (isAutoMode = !isAutoMode))
          }
        "
      >
        <icon name="fa6-solid:house" />
      </fan-button>
    </teleport>
    <teleport to="body">
      <div
        :class="[
          'secondbar-col-mask fixed z-9 w-full h-full top-0 left-0 md:hidden',
          { hidden: isAutoMode },
        ]"
        @click="isAutoMode = true"
      />
    </teleport>
  </client-only>
</template>

<style scoped>
div.secondbar {
  max-height: 70vh;
  overflow-y: auto;
}

@media screen and (width>= 48rem) {
  div.secondbar {
    max-height: 100%;
    overflow-y: unset;
  }
}

div.secondbar-col-mask {
  background-color: rgb(245 245 245 / 0.4);
  backdrop-filter: blur(16px);
}
</style>
