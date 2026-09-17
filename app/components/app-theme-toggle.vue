<script setup lang="ts">
const show = ref(false)
const colorMode = useColorMode()
</script>

<template>
  <div
    :class="[
      'app-theme-toggle size-12 rounded-lg flex flex-row items-center justify-center cursor-pointer border ',
      'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-600 border-black/40 hover:border-fan-300',
      'dark:bg-gray-800 dark:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-400 dark:border-white/40',
      '',
    ]"
    @click="show = !show"
  >
    <iconify-icon
      :class="['app-theme-icon', { active: show }]"
      size="28px"
      set="fa6-solid"
      name="gear"
    />
  </div>

  <transition name="app-theme-window">
    <div
      :class="[
        'app-theme-window rounded-lg border-2 flex flex-col p-2 backdrop-blur-md w-60',
        'bg-gray-50/50 text-gray-600 border-fan-300',
        'dark:bg-gray-800/50 dark:text-gray-100',
      ]"
      v-if="show"
    >
      <prose-p>设置 芒果.js 的色彩主题</prose-p>
      <prose-hr />
      <div class="flex flex-row gap-x-1">
        <div class="button-light flex-1" @click="colorMode.preference = 'light'">
          <iconify-icon set="fa6-solid" name="sun" />
        </div>
        <div class="button-dark flex-1" @click="colorMode.preference = 'dark'">
          <iconify-icon set="fa6-solid" name="moon" />
        </div>
        <div class="button-system flex-1" @click="colorMode.preference = 'system'">
          <iconify-icon set="fa6-solid" name="desktop" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* 主体选择唤起按钮 */
.app-theme-toggle {
  transition-property: color, background-color, border-color;
  transition-duration: 0.1s;
  transition-timing-function: ease;
}
.app-theme-icon.active {
  animation-name: zhuan-quan-quan;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes zhuan-quan-quan {
  0% {
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 主体选择 window */
.button-light,
.button-dark,
.button-system {
  height: 36px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.button-light {
  background-color: aliceblue;
  color: black;
}

.button-dark {
  background-color: black;
  color: aliceblue;
}

.button-system {
  background: linear-gradient(45deg in hsl, #ff5ec7, #e382ff);
  color: #575656;
}
</style>

<style>
.app-theme-window-enter-active,
.app-theme-window-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.4s;
  transition-timing-function: ease;
}

.app-theme-window-enter-from,
.app-theme-window-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
