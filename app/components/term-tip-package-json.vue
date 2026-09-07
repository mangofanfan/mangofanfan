<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'package.json'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        Node
        项目的项目配置文件，配置了包括项目名称、作者等元数据，以及项目依赖、命令等信息，还可以包含自定义数据。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
