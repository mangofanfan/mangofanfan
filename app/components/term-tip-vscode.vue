<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Visual Studio Code'
})
const links = [{ name: '官方网站', url: 'https://code.visualstudio.com/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        简称 VS Code，一个广泛流行的代码编辑器，拥有丰富多样的扩展，由微软发布并开源。
      </p>
      <p class="font-misans">支持 Windows Linux macOS，同时还有网页版等版本。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
