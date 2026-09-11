<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '小柚子'
})
const links = [{ name: '南邮官网', url: 'https://www.njupt.edu.cn/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">南京邮电大学对学生的亲切化称呼。“柚”同“邮”。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
