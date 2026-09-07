<script setup lang="ts"></script>

<template>
  <div class="app-footer flex flex-col gap-y-2">
    <card class="bg-blur w-full flex flex-col gap-y-2" extraClass="py-3 px-4">
      <p class="font-misans">芒果帆帆不使用 AI 技术来生成此站点的内容。</p>
      <p class="font-misans">
        本站点使用
        <term-tip-nuxt />
        自行设计维护，并以纯静态模式部署，不提供任何在线服务，且不与其他任何网站构成从属关系。
      </p>
    </card>
    <card class="bg-blur w-full">
      <social-links />
    </card>
  </div>
</template>

<style scoped></style>
