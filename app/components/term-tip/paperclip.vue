<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '回形针'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        回形针 PaperClip 是于 2017 ~ 2021 年间运营的中国民间科普自媒体。由于较大争议，已停更并解散。
      </p>
      <p class="font-misans">
        尽管回形针已成为屁股不正的自媒体的“模范”。曾经他们的视频当之无愧是质量最高的科普视频。
      </p>
      <p class="font-misans">谁说曾经的我不是他们的粉丝呢？你说他怎么就非要夹带私货呢？</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
