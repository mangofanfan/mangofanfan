<script setup lang="ts">
const title = '主页'
const description = '芒果客栈的首页，一切故事的起点……'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn/',
  ogType: 'website',
})

const { data: posts } = useAsyncData('index-posts', async () => {
  return queryCollection('blog').where('published', '=', true).order('date', 'DESC').limit(3).all()
})
</script>

<template>
  <div class="index-page">
    <UPageHero headline="营业中" title="芒果客栈" orientation="horizontal">
      <template #description>
        <div class="space-y-3 text-lg">
          <p>
            Iris Thompson 快步走在登机廊桥上，眼前这架飞机将带她回家。明天是她的 16 岁生日，Tommy
            会在机场等她。
          </p>

          <p>
            海南文昌，人们围坐在正旺的篝火边，仰起头望向星空，万余米之上，万年风雪号的乘员组正在重返大气层。
          </p>

          <p>
            Christal 和 Iris
            在圣诞树前十指相扣，彩灯在夜里星星点点闪烁着。她们望向彼此，雪花缓缓落下，寂静无声。
          </p>

          <p>Christal 站在一片星空中，她手边的 PDA 震动一下，传出新消息的提示音——</p>

          <p>你的潜意识指引你走上这条路。</p>

          <p>你称之为命运。</p>
        </div>
      </template>

      <NuxtPicture
        src="/images/avatar.png"
        alt="MangoFanFan's avatar.png"
        :img-attrs="{ class: 'rounded-full shadow-2xl ring ring-default' }"
        :width="727"
        :height="727"
        preload
      />
    </UPageHero>

    <UPageSection
      id="features"
      title="最新日志"
      description="在顶部栏目「芒果日志」查看目前的完整日志列表"
    >
      <UBlogPosts orientation="horizontal">
        <UBlogPost
          v-for="post of posts"
          :key="post.path"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :date="post.date"
          :image="
            post.image && {
              src: post.image,
              alt: `${post.title} 的特色图像`,
              width: 1600,
              height: 900,
              densities: '1x 2x',
              sizes: 'sm:100vw md:100vw lg:50vw xl:430px',
              format: 'auto',
            }
          "
          variant="soft"
        />
      </UBlogPosts>
    </UPageSection>
  </div>
</template>
