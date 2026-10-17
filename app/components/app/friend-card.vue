<script setup lang="ts">
interface Props {
  name: string
  description: string
  link: string
  avatarUrl: string
  imageUrl?: string
}

defineProps<Props>()
</script>

<template>
  <UPageCard :description="description" class="w-full" spotlight orientation="horizontal" reverse>
    <img
      v-if="imageUrl"
      class="w-full h-full rounded-md"
      :src="imageUrl"
      :alt="`${name} 的博客大图`"
    />

    <template #header>
      <UUser
        :name="name"
        :description="link"
        :avatar="{
          src: avatarUrl,
          alt: `${name} 的博客 logo`,
        }"
      />
    </template>

    <template #footer>
      <UButton class="font-sans" variant="ghost" :to="link" target="_blank">穿过传送门</UButton>
    </template>
  </UPageCard>
</template>
