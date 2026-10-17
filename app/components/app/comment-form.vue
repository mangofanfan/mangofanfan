<script setup lang="ts">
import * as z from 'zod'

const { route } = defineProps<{
  route: string
}>()
const emits = defineEmits<{ comment: [status: boolean] }>()

const status = ref<'hidden' | 'show' | 'loading'>('hidden')

const schema = z.object({
  name: z.string(),
  email: z.email(),
  link: z.url({ protocol: /^https?$/ }).optional(),
  content: z.string().max(200).min(8),
})
type Schema = z.output<typeof schema>
const form = reactive<Partial<Schema>>({
  name: '',
  email: '',
  link: '',
  content: '',
})

const turnstileToken = ref('')
let turnstileWidgetId: string | null = null
// 加载 CloudFlare Challenge 脚本后，Turnstile 示例位于 Window 上。
function initTurnstile() {
  turnstileWidgetId = turnstile.render('#turnstile-container', {
    sitekey: '0x4AAAAAAFXdbTxM6IDtE_vI',
    callback: function (token) {
      console.log('已完成 CloudFlare Turnstile 挑战。')
      turnstileToken.value = token
    },
    'timeout-callback': function () {
      turnstileToken.value = ''
    },
    'expired-callback': function () {
      turnstileToken.value = ''
    },
  }) as string
}
// 刷新 Turnstile 小部件
function reloadTurnstile() {
  if (turnstileWidgetId) turnstile.reset(turnstileWidgetId)
}

// 仅初始化一次，后续只重置
let isInit = false
watch(status, (value) => {
  if (value === 'show') {
    if (!isInit) {
      initTurnstile()
      isInit = true
    } else {
      reloadTurnstile()
    }
  }
})

const toast = useToast()
async function onSubmit() {
  status.value = 'loading'
  try {
    await $fetch('/api/site/comment', {
      method: 'POST',
      body: { ...form, token: turnstileToken.value, route },
    })
    toast.add({
      title: '评论成功~',
      description: '请注意如果评论内容不宜，仍然可能被隐藏。',
      color: 'success',
    })
    emits('comment', true)
  } catch {
    toast.add({
      title: '评论失败…',
      description: '请稍后再试，或检查表单填写情况。',
      color: 'error',
    })
    emits('comment', false)
  } finally {
    status.value = 'hidden'
  }
}
</script>

<template>
  <div class="app-comment-form font-sans">
    <transition>
      <div
        v-show="status === 'hidden'"
        class="p-8 rounded-xl border border-default bg-muted cursor-pointer h-50"
        @click="status = 'show'"
      >
        <span class="text-muted">点击以加载评论表单</span>
      </div>
    </transition>

    <transition>
      <div v-show="status === 'show'" class="p-5 rounded-xl border border-default bg-default">
        <!-- 评论表单 -->
        <UForm class="w-[80%] ml-auto mr-auto space-y-3" :schema>
          <UFormField label="名称" name="name" required>
            <UInput v-model="form.name" class="w-full" type="text" />
          </UFormField>

          <UFormField label="电子邮件地址" name="email" required>
            <UInput v-model="form.email" class="w-full" type="email" />
          </UFormField>

          <UFormField label="网站" name="link" hint="可选">
            <UInput v-model="form.link" class="w-full" type="url" />
          </UFormField>

          <UFormField label="留言内容" name="content" required>
            <UTextarea v-model="form.content" class="w-full" autoresize />
          </UFormField>

          <div id="turnstile-container" />

          <div class="text-muted text-xs">
            芒果客栈使用 CloudFlare Turnstile 验证您的评论行为，
            <prose-a to="/site/privacy">隐私政策</prose-a>
            中包含更多说明。你的评论还需要符合
            <prose-a to="/site/guide">客栈守则</prose-a>
            ，否则将不会显示。
          </div>

          <div class="space-x-3">
            <UButton color="neutral" @click="status = 'hidden'">取消评论</UButton>
            <UButton color="primary" :disabled="turnstileToken === ''" @click="onSubmit"
              >提交评论</UButton
            >
          </div>
        </UForm>
      </div>
    </transition>

    <transition>
      <div
        v-show="status === 'loading'"
        class="border rounded-xl p-8 h-50 border-default bg-muted flex flex-col justify-center"
      >
        <UProgress inverted />
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
