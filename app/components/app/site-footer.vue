<script setup lang="ts"></script>

<template>
  <div class="app-site-footer mt-8 print:hidden">
    <USeparator>
      <template #default>
        <div class="flex flex-row px-2 border border-default rounded-2xl divide-x divide-default">
          <a href="/sitemap.xml" target="_blank" class="px-2 py-1 text-muted text-sm">站点地图</a>

          <a
            href="https://icp.gov.moe/?keyword=20262632"
            target="_blank"
            class="px-2 py-1 text-muted text-sm"
            >萌ICP备20262632号</a
          >

          <a
            href="https://www.foreverblog.cn/go.html"
            target="_blank"
            class="px-2 py-1 text-muted text-sm"
            >虫洞</a
          >
        </div>
      </template>
    </USeparator>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">芒果帆帆的破站 • 芒果客栈 © {{ new Date().getFullYear() }}</p>
      </template>

      <template #default>
        <p class="text-sm text-muted">分离不过须臾，人们终将会再见。</p>
      </template>

      <template #right>
        <NuxtLink class="text-sm text-muted" to="/site/privacy">隐私政策</NuxtLink>
        <NuxtLink class="text-sm text-muted" to="/site/guide">客栈守则</NuxtLink>
        <NuxtLink class="text-sm text-muted" to="/site/friends">友链空间</NuxtLink>
      </template>
    </UFooter>
  </div>
</template>

<style>
.app-site-footer {
  font-family: var(--font-sans), sans-serif;
}
</style>
