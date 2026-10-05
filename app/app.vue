<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
import type { NavigationMenuItem } from '@nuxt/ui'

const additionalItems = ref<NavigationMenuItem[] | null>(null)
const setANMI = (newVal: NavigationMenuItem[]) => (additionalItems.value = newVal)
const removeANMI = () => (additionalItems.value = [])
provide('set-additional-navigation-menu-items', setANMI)
provide('remove-additional-navigation-menu-items', removeANMI)
</script>

<template>
  <UApp :locale="zh_cn">
    <NuxtLoadingIndicator />

    <AppSiteHeader :additional-items />

    <UMain>
      <UContainer>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UContainer>
    </UMain>

    <AppSiteFooter />
  </UApp>
</template>
