<script setup lang="ts">
const hpSource = useTemplateRef('html-playground-source')
const hpIframe = useTemplateRef('html-playground-iframe')
const hpHead = useTemplateRef('html-playground-head')
const hpBody = useTemplateRef('html-playground-body')
const ready = ref(false)
const id = useId()

const iframeHeight = ref(40)
const iframeHeightPx = computed(() => `${iframeHeight.value + 10}px`)

onMounted(() => {
  if (hpBody.value) hpBody.value.dataset.iframeId = id
  hpHead.value?.insertAdjacentHTML(
    'afterbegin',
    `<head><style>[data-iframe-id="${id}"],[data-iframe-id="${id}"] *{padding:0;margin:0;box-sizing:border-box;}</style></head>`
  )
  nextTick(() => (ready.value = true))
})
</script>

<template>
  <div class="html-playground-source hidden" ref="html-playground-source">
    <component is="head" ref="html-playground-head" />
    <component is="body" ref="html-playground-body">
      <slot />
    </component>
  </div>
  <iframe
    v-if="ready"
    class="html-playground border border-black"
    :srcdoc="hpSource?.innerHTML"
    ref="html-playground-iframe"
    @load="iframeHeight = hpIframe?.contentWindow?.document.body.scrollHeight ?? 40"
  />
</template>

<style scoped>
iframe.html-playground {
  height: v-bind(iframeHeightPx);
}
</style>
