<script setup lang="ts"></script>

<template>
  <div class="app-side-footer">
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

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">芒果帆帆的破站 • 芒果客栈 © {{ new Date().getFullYear() }}</p>
      </template>

      <template #right>
        <p class="text-sm text-muted">分离不过须臾，人们终将会再见。</p>
      </template>
    </UFooter>
  </div>
</template>

<style scoped></style>
