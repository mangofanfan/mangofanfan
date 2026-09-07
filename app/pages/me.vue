<script setup lang="ts">
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <div class="flex flex-col gap-y-4 items-center">
    <fan-image class="w-full max-w-120" src="屏幕截图 2025-09-24 143856.png" />
    <fan-h1>芒果帆帆的可公开情报</fan-h1>
    <card extraClass="px-4 py-3">
      <ul class="flex flex-col gap-y-1">
        <li>可用称呼：<badge level="fan">芒果帆帆</badge> <badge level="info">芒果鱼</badge></li>
        <li>常住地区：<badge level="fan">中国 江苏省 南京市</badge></li>
        <li>使用语言：<badge level="fan">简体中文</badge> <badge level="info">EN(US)</badge></li>
      </ul>
    </card>

    <fan-h2>联系方式</fan-h2>
    <div class="w-fit flex flex-col gap-y-2">
      <card class="flex flex-col gap-y-2">
        <p class="text-lg font-misans font-semibold">社交媒体账号</p>
        <p class="font-misans">芒果帆帆随机活跃在各社交平台，以下是主要活动地点的准确地址。</p>
        <social-links />
      </card>
      <card class="flex flex-col gap-y-2">
        <p class="text-lg font-misans font-semibold">邮箱</p>
        <p class="font-misans"><badge level="fan">自定义免费企业邮</badge> fan@fanfan.moe</p>
        <p class="font-misans"><badge level="warning">教育邮箱</badge> B████████@njupt.edu.cn</p>
        <p class="font-misans"><badge level="info">常规邮箱</badge> mangofanfanw@icloud.com</p>
        <p class="font-misans"><badge level="info">常规邮箱</badge> mangofanfanw@hotmail.com</p>
        <p class="font-misans"><badge level="info">常规邮箱</badge> sweetmangoes@qq.com</p>
      </card>
      <card class="flex flex-col gap-y-2">
        <p class="text-lg font-misans font-semibold">聊天</p>
        <p class="font-misans">
          Bilibili、知乎等平台私聊可用，需在一条消息内说明来意，否则可能不予回复。
        </p>
        <p class="font-misans">
          <del>如已获得芒果的聊天软件好友，则你将收获一个随时在线的小憨批（）</del>
        </p>
      </card>
    </div>

    <fan-h2>教育经历</fan-h2>
    <div class="w-fit flex flex-col gap-y-3">
      <card>
        <p class="text-xl font-misans">
          <span class="font-bold">南京市将军山小学</span>
        </p>
        <p class="text-lg font-misans text-gray-600">莫等闲，白了少年头，空悲切。</p>
        <prose-a class="font-misans" href="http://jjsxx.jnjy.net.cn/">官方网站</prose-a>
      </card>
      <card>
        <p class="text-xl font-misans">
          <span class="font-bold">南京市将军山中学</span>
        </p>
        <p class="text-lg font-misans text-gray-600">大鹏一日乘风起，扶摇直上九万里。</p>
        <prose-a class="font-misans" href="http://jjszx.jnjy.net.cn/">官方网站</prose-a>
      </card>
      <card>
        <p class="text-xl font-misans">
          <span class="font-bold">南京市东山高级中学</span> |
          <span class="text-gray-600">理科（物理 · 化学 · 地理） 普通班</span>
        </p>
        <p class="text-lg font-misans text-gray-600">汇聚最优学子，打造最强高中。</p>
        <prose-a class="font-misans" href="http://dsgjzx.jnjy.net.cn/">官方网站</prose-a>
      </card>
      <card>
        <p class="text-xl font-misans">
          <span class="font-bold">南京邮电大学</span> | <span class="text-gray-600">本科</span>
        </p>
        <p class="text-lg font-misans text-gray-600">
          计算机学院、软件学院、网络空间安全学院 软件工程
        </p>
        <prose-a class="font-misans" href="https://www.njupt.edu.cn/">官方网站</prose-a>
      </card>
    </div>
  </div>
</template>

<style scoped></style>
