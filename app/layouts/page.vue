<script setup lang="ts"></script>

<template>
  <div class="page-layout">
    <slot />
    <div>
      <card class="bottom-section flex flex-col gap-y-2">
        <link-display-card to="/" title="返回首页" content="查看芒果的其他有关内容 ~" />
        <social-links />
      </card>
    </div>
  </div>
</template>

<style scoped>
div.page-layout {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bottom-section {
  margin-top: 18px;
}
</style>
