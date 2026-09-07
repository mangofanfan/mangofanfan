<script setup lang="ts">
definePageMeta({
  layout: 'page',
})

const imagesMSOnlinePanelV2 = ['屏幕截图 2025-10-09 205918.png', '屏幕截图 2025-10-09 205650.png']
</script>

<template>
  <header class="sticky top-3 z-10">
    <app-header />
  </header>
  <div class="flex flex-col items-center gap-y-4">
    <fan-h1>网页开发</fan-h1>

    <fan-h2>现役网站</fan-h2>
    <p class="font-misans">
      网站并非必须从头建起，已有许多成熟的建站工具、网站框架等，为不同水平的开发者服务。
    </p>
    <p class="font-misans">而现在，芒果将掌握其中一切奥秘。</p>
    <div class="flex flex-col gap-y-3 w-fit">
      <card>
        <p class="font-semibold text-lg font-misans">建站工具</p>
        <p class="font-misans"><term-tip-wordpress />、<term-tip-mediawiki />、……</p>
      </card>
      <card>
        <p class="font-semibold text-lg font-misans">后端框架</p>
        <p class="font-misans"><term-tip-django />、Flask、FastAPI、SpringBoot、……</p>
      </card>
      <card>
        <p class="font-semibold text-lg font-misans">前端框架</p>
        <p class="font-misans"><term-tip-vue />、Bootstrap、<term-tip-tailwindcss />、……</p>
      </card>
    </div>

    <prose-hr class="w-full" />
    <fan-h2>已归档项目</fan-h2>
    <fan-h3>最初之作：智心平台</fan-h3>
    <div class="flex flex-row gap-x-6 justify-center items-center">
      <div class="flex flex-col gap-y-3">
        <fan-h4>v1版本</fan-h4>
        <p>
          起初是为了大一时的一个竞赛项目，一群
          <term-tip-little-pomelo /> 一拍即合，拟定了一个路线，做出了一个「智心平台」。
        </p>
        <link-github-card name="智心平台" url="https://github.com/mangofanfan/MSOnlinePanel" />
        <p>
          此时的第一版智心平台网站是完全依靠 <term-tip-django /> 实现的纯 Server
          结构，不包含任何人工编写的 JavaScript。
        </p>
      </div>
      <fan-image class="w-full max-w-120" src="智心平台-v1.png" />
    </div>
    <div class="flex flex-row gap-x-8 justify-center items-center">
      <fan-image-gallery
        class="w-full max-w-120"
        :images="imagesMSOnlinePanelV2"
        image-class="w-full max-w-120"
      />
      <div class="flex flex-col gap-y-3">
        <fan-h4>v2版本</fan-h4>
        <p>
          演变至此时，智心平台已经进入了第二迭代。此版本未在 GitHub
          开源，因为那时芒果对自己新掌握的前端技术尚不自信。
        </p>
        <p>
          二迭代的智心平台本身是由 <term-tip-vue /> 实现的纯 Client 结构，并使用了
          <term-tip-element-plus /> 组件库。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
