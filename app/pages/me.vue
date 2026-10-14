<script setup lang="ts">
import type { PageFeatureProps } from '@nuxt/ui'

const features = ref<PageFeatureProps[]>([
  {
    title: 'Bilibili',
    description: '@芒果帆帆w',
    icon: 'ant-design:bilibili-outlined',
    to: 'https://space.bilibili.com/354535460',
    target: '_blank',
  },
  {
    title: 'GitHub',
    description: '@mangofanfan',
    icon: 'ant-design:github-filled',
    to: 'https://github.com/mangofanfan',
    target: '_blank',
  },
  {
    title: '知乎',
    description: '@芒果帆帆',
    icon: 'ant-design:zhihu-outlined',
    to: 'https://www.zhihu.com/people/mang-guo-fan-fan',
    target: '_blank',
  },
])

const title = '芒果帆帆'
const description = '芒果帆帆是谁呢？'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://mango.js.cn/me',
})
</script>

<template>
  <div class="me-page">
    <UPageHero title="芒果帆帆" description="芒果客栈的主理人">
      <NuxtPicture
        :img-attrs="{ class: 'rounded-lg shadow-2xl' }"
        src="/images/background.png"
        alt="Minecraft screenshot"
      />
    </UPageHero>

    <UPageSection title="员工福利" description="到底福利在哪里啊喂？">
      <UBlogPost
        title="大三上学期实验安排"
        description="B24042311 班级参与的实验课，从总表中整理"
        to="/file/grade-3-1-exp-sch"
      />
    </UPageSection>

    <UPageSection
      title="自说自话"
      description="其实是这样称呼自己的芒果"
      :features="[
                  {
                  icon: 'i-lucide-rocket',
    title: '在校本科生',
    description: '就读于南京邮电大学软件工程专业，手写 HTML 是我的期末作业……？',
    },
    {
    icon: 'i-lucide-palette',
    title: '独立开发者',
    description: '已经坚持做完 0 个个人项目，拥有丰富的开坑和弃坑经验。',
    },
    {
    icon: 'i-lucide-zap',
    title: '全栈开发经验',
    description:
    '从 C/C++ 到 Rust，从桌面应用程序到 Web 后端，从 WordPress 主题到 Nuxt 静态站点，芒果已经历许多……',
    },
    {
    icon: 'i-lucide-blocks',
    title: '个人服务器运维',
    description: '基于宝塔面板与宝塔被玩坏之后的 SSH 连接的服务器故障排查与检修。',
    },
    {
    icon: 'i-lucide-code-2',
    title: '文字爱好者',
    description: 'SCP 中分部摸鱼读者，动漫同人小作文作者，偶尔喜欢翻译一些小玩意的闲人。',
    },
    {
    icon: 'i-lucide-shield-check',
    title: '自媒体主播',
    description:
    '被腾讯游戏制裁之人，被网易游戏坑骗之人，被米哈游戏惊艳之人，连游戏都懒得玩之人。',
    },
    ]" />

    <UPageSection title="社交媒体" description="从以下渠道关注芒果客栈的最新情报" :features />
  </div>
</template>

<style scoped></style>
