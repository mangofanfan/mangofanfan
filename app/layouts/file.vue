<script setup lang="ts">
const filename = ref('未命名文件')
const description = ref('未描述的文件')
const iconname = ref('')

provide('set-file-meta', (arg1: string, arg2: string, arg3: string) => {
  filename.value = arg1
  description.value = arg2
  iconname.value = arg3
})
</script>

<template>
  <div class="file-layout p-6 flex flex-col gap-y-4">
    <div class="bg-muted border border-info rounded-md flex flex-row px-5 py-3 gap-x-4">
      <UIcon :name="iconname" class="size-16" />

      <div class="flex flex-col gap-y-2">
        <p class="font-sans text-xl flex flex-row gap-x-3">
          <span class="text-info font-medium">文件</span>
          <span>{{ filename }}</span>
        </p>
        <p class="font-sans">{{ description }}</p>
      </div>
    </div>

    <slot />
  </div>
</template>

<style scoped></style>
