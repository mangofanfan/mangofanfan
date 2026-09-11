<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Axios'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">一个网络请求库，比原生 <code>fetch</code> 更简洁强大。</p>
      <p class="font-misans">支持在项目层面设置请求头、身份验证、错误处理、代理使用等高级需求。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
