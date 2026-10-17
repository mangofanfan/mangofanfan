<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { data: page } = useAsyncData('site-friends', async () => {
  return await queryCollection('site').path('/site/friends').first()
})

const title = '友链空间'
const description = '与芒果客栈建立友好关系是非常简单的事情，只要在这里点击评论，就可以宣告完成了~'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn/site/friends',
  ogType: 'website',
})
useHead({
  script: [
    {
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
      type: 'text/javascript',
      defer: true,
      key: 'turnstile',
      id: 'turnstile',
    },
  ],
})
</script>

<template>
  <div class="site-guide-page pt-6 flex flex-col gap-y-4">
    <h1 class="text-3xl">友链空间</h1>

    <h2 class="my-4 text-2xl font-medium">梦今天的方向</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <app-friend-card
        link="https://www.alumopper.top/"
        name="灵感狐的灵感小窝"
        description="一只一只一只魔法狐狐"
        avatar-url="https://www.alumopper.top/assets/home/logo.png"
        image-url="https://www.alumopper.top/assets/images/avatar.png"
      />
      <app-friend-card
        link="https://naiwenel.com/"
        name="小涵Naiwenelの个人网站"
        description="这里是小涵，希望你天天开心哦~"
        avatar-url="https://naiwenel.com/assets/images/naiwenel-avatar.jpg"
      />
    </div>

    <h2 class="my-4 text-2xl font-medium">梦开始的地方</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <app-friend-card
        link="https://starxn.com/"
        name="星辰云"
        description="以实惠稳定的云产品致力造福百万草根站长"
        avatar-url="https://oss.starxw.com/Nexts/favicon.png"
        image-url="https://starxn.com/assets/cover.webp"
      />
      <app-friend-card
        link="https://www.foreverblog.cn/"
        name="十年之约"
        description="从加入那天起，博客十年不关，或者更久，并且一直在写。"
        avatar-url="https://www.foreverblog.cn/favicon.ico"
        image-url="/images/20261015/for-ten-years.png"
      />
    </div>

    <UCard v-if="page" class="mt-36" title="提交您的博客站点">
      <ContentRenderer :value="page" />

      <ClientOnly>
        <app-comment route="/site/friends" />
      </ClientOnly>
    </UCard>
  </div>
</template>

<style scoped></style>
