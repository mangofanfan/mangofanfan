<script setup lang="ts"></script>
<template>
  <div class="default-container">
    <div class="blank" />
    <div class="default-layout">
      <card class="w-full">
        <slot />
      </card>
      <avatar class="size-80 border-4" src="/avatar.png" alt="Mango FanFan Q" />
      <link-display-card
        id="position-1"
        class="position"
        to="/me"
        title="已解锁情报"
        content="哼哼！"
      />
      <link-display-card
        id="position-2"
        class="position"
        to="/mc"
        title="Minecraft 有关"
        content="包括基于 Java 版的数据包和模组开发"
      />
      <link-display-card
        id="position-3"
        class="position"
        to="/web"
        title="网页 有关"
        content="包括你当前所正在浏览的此网站"
      />
      <link-display-card
        id="position-4"
        class="position"
        to="/blog"
        title="博客 日志"
        content="llo～(∠·ω< )⌒★"
      />
      <card class="w-full flex flex-col gap-y-2">
        <fan-h4>外部链接</fan-h4>
        <social-links />
      </card>
    </div>
  </div>
</template>

<style scoped>
div.default-container {
  /* 将压缩页面内容宽度的任务交给 container，保证绝对定位的卡片与头像位置相对 */
  padding: 0 20% 0;
}

div.blank {
  height: 20vh;
}

div.default-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  position: relative;
}

.position {
  position: absolute;
  width: 12rem;
}

#position-1 {
  top: 100px;
  left: -32px;
}

#position-2 {
  top: 200px;
  left: -64px;
}

#position-3 {
  top: 324px;
  left: -44px;
}

#position-4 {
  top: 100px;
  right: -32px;
}
</style>
