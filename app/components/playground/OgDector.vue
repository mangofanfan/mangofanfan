<script setup lang="ts">
interface scheme {
  target: string
  raw: string
}

const success = ref(false)
const loading = ref(false)

const toast = useToast()
const raw = ref('')
const url = ref('')
function onSubmit() {
  $fetch('/api/og/fetch-og', { method: 'POST', body: { url: url.value } })
    .then((res) => {
      raw.value = (res as scheme).raw
      success.value = true
    })
    .catch((err) => {
      toast.add({
        color: 'error',
        title: '后端抓取错误：' + String(err),
      })
      success.value = false
    })
    .finally(() => (loading.value = false))
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="w-full flex flex-row gap-x-2">
        <UInput
          v-model="url"
          type="url"
          class="flex-1"
          icon="lucide:globe"
          placeholder="https://..."
        />
        <UButton class="flex-0" @click="onSubmit()">
          <UIcon name="lucide:search-code" />
        </UButton>
      </div>
    </template>

    <template #default>
      <div class="w-full h-100 flex items-center justify-center">
        <UProgress v-if="loading" orientation="horizontal" class="w-full" inverted />
        <div v-else-if="!success" class="w-[90%] h-[80%] bg-gray-500/60 rounded-lg" />
      </div>
    </template>

    <template #footer>
      <UAccordion
        :items="[
          {
            label: success ? '查看抓取结果（HTML）' : '暂无抓取结果',
            value: 'html',
            slot: 'html' as const,
          },
        ]"
        :unmount-on-hide="false"
      >
        <template #html="">
          <CodeBlock :code="raw" lang="html" />
        </template>
      </UAccordion>
    </template>
  </UCard>
</template>

<style scoped></style>
