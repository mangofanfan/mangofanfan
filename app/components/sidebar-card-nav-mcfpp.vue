<script setup lang="ts">
const { data: mcfpp } = await useAsyncData('mcfpp-nav', () => {
  return queryCollection('mcfpp').order('index', 'ASC').all()
})
const { data: mcfppVscodeExtension } = await useAsyncData('mcfpp-vscode-extension-nav', () => {
  return queryCollection('mcfppVscodeExtension').order('index', 'ASC').all()
})
</script>

<template>
  <card>
    <prose-a class="block" href="/mcfpp"><strong>MCFPP 索引页</strong></prose-a>
    <prose-hr />
    <p class="font-semibold font-misans">MCFPP</p>
    <prose-a class="block" v-for="link of mcfpp" :href="link.path">{{ link.title }}</prose-a>
    <prose-hr />
    <p class="font-semibold font-misans">MCFPP VS Code 扩展</p>
    <prose-a class="block" v-for="link of mcfppVscodeExtension" :href="link.path">{{
      link.title
    }}</prose-a>
  </card>
</template>

<style scoped></style>
