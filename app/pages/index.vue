<script setup lang="ts">
const title = '主页'
const description = '芒果客栈的首页，一切故事的起点……'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn/',
  ogType: 'website'
})
</script>

<template>
  <div class="index-page">
    <UPageHero
      headline="营业中"
      title="芒果客栈"
      orientation="horizontal"
    >
      <template #description>
        <div class="space-y-3 text-lg">
          <p>Iris Thompson 快步走在登机廊桥上，眼前这架飞机将带她回家。明天是她的 16 岁生日，Tommy 会在机场等她。</p>

          <p>海南文昌，人们围坐在正旺的篝火边，仰起头望向星空，万余米之上，万年风雪号的乘员组正在重返大气层。</p>

          <p>Christal 和 Iris 在圣诞树前十指相扣，彩灯在夜里星星点点闪烁着。她们望向彼此，雪花缓缓落下，寂静无声。</p>

          <p>Christal 站在一片星空中，她手边的 PDA 震动一下，传出新消息的提示音，她抬手，打开屏幕——</p>
        </div>
      </template>

      <NuxtImg
        src="/images/avatar.png"
        class="rounded-full shadow-2xl ring ring-default"
      />
    </UPageHero>

    <UPageSection
      id="features"
      title="恭喜你们，亲爱的 Iris，Christal。这是最好的结局。"
      description="欢迎你，远道而来的客人 ~ 故事已经结束了，接下来想要什么饮品？或者还想多听一些，别的故事？"
      :features="[{
        icon: 'i-lucide-rocket',
        title: '在校本科生',
        description: '就读于南京邮电大学软件工程专业，手写 HTML 是我的期末作业……？'
      }, {
        icon: 'i-lucide-palette',
        title: '独立开发者',
        description: '已经坚持做完 0 个个人项目，拥有丰富的开坑和弃坑经验。'
      }, {
        icon: 'i-lucide-zap',
        title: '全栈开发经验',
        description: '从 C/C++ 到 Rust，从桌面应用程序到 Web 后端，从 WordPress 主题到 Nuxt 静态站点，芒果已经历许多……'
      }, {
        icon: 'i-lucide-blocks',
        title: '个人服务器运维',
        description: '基于宝塔面板与宝塔被玩坏之后的 SSH 连接的服务器故障排查与检修。'
      }, {
        icon: 'i-lucide-code-2',
        title: '文字爱好者',
        description: 'SCP 中分部摸鱼读者，动漫同人小作文作者，偶尔喜欢翻译一些小玩意的闲人。'
      }, {
        icon: 'i-lucide-shield-check',
        title: '自媒体主播',
        description: '被腾讯游戏制裁之人，被网易游戏坑骗之人，被米哈游戏惊艳之人，连游戏都懒得玩之人。'
      }]"
    />
  </div>
</template>
