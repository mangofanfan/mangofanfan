<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
import type { NavigationMenuItem } from '@nuxt/ui'

const additionalItems = ref<NavigationMenuItem[] | null>(null)
const setANMI = (newVal: NavigationMenuItem[]) => (additionalItems.value = newVal)
provide('set-additional-navigation-menu-items', setANMI)
</script>

<template>
  <UApp :locale="zh_cn">
    <AppSiteHeader :additional-items />

    <UMain>
      <UContainer>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UContainer>
    </UMain>

    <USeparator>
      <template #default>
        <div class="flex flex-row px-2 border border-default rounded-xl divide-x divide-default">
          <a href="/sitemap.xml" target="_blank" class="px-2 text-muted text-sm">站点地图</a>

          <a
            href="https://icp.gov.moe/?keyword=20262632"
            target="_blank"
            class="px-2 text-muted text-sm"
            >萌ICP备20262632号</a
          >
        </div>
      </template>
    </USeparator>

    <AppSiteFooter />
  </UApp>
</template>
