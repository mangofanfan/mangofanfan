<script setup lang="ts">
import type { BadgeArg } from '~/components/bagde.shared.ts'

defineProps<{
  badges: BadgeArg[]
}>()
</script>

<template>
  <div class="badge-group flex flex-row gap-x-3">
    <badge v-for="b in badges" :level="b.level">{{ b.text }}</badge>
  </div>
</template>

<style scoped></style>
