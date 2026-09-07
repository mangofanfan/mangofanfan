<script setup lang="ts"></script>
<template>
  <div class="default-container">
    <div class="blank" />
    <div class="default-layout">
      <card class="w-full">
        <slot />
      </card>
      <avatar
        class="size-full border-2 md:size-80 md:border-4"
        src="/avatar.png"
        alt="Mango FanFan Q"
      />
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
/* 中小屏幕（移动端）拥有常规首页 */
div.default-container {
  padding: 0 8% 0;
}

div.default-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  position: relative;
}

div.blank {
  height: 4rem;
}

.position {
  width: 100%;
}

/* 1024（lg）以上屏幕拥有定制首页 */
@media screen and (min-width: 1024px) {
  div.default-container {
    /* 将压缩页面内容宽度的任务交给 container，保证绝对定位的卡片与头像位置相对 */
    padding: 0 20% 0;
  }

  div.blank {
    height: 20vh;
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
}
</style>
