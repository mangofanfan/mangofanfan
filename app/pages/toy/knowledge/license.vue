<script setup lang="ts">
import type { BadgeArg } from '~/components/bagde.shared.ts'

definePageMeta({
  layout: 'toy',
})

useSeoMeta({
  title: '许可证',
  description: '你经常会遇到的各种软件许可证。',
})

const { data: mit_ast } = await useAsyncData('license-mit', () =>
  $fetch('/api/markdown/license/mit')
)
const mit_badges: BadgeArg[] = [
  { level: 'info', text: '宽容' },
  { level: 'warning', text: '非 Copyleft' },
  { level: 'info', text: '兼容 GPL' },
]

const { data: gpl_ast } = await useAsyncData('license-gpl', () =>
  $fetch('/api/markdown/license/gpl')
)
const gpl_badges: BadgeArg[] = [
  { level: 'warning', text: '非宽容' },
  { level: 'info', text: 'Copyleft' },
]

const PanelBody = defineComponent({
  setup(_, { slots }) {
    return () =>
      h(
        'div',
        {
          class:
            'relative flex flex-col divide-y lg:divide-x divide-dashed divide-gray-300 lg:flex-row',
        },
        [
          h(
            'div',
            { class: 'lg:min-w-100' },
            h('div', { class: 'sticky top-20 flex flex-col gap-1 px-2 py-2' }, slots.default?.())
          ),
          h('div', { class: 'min-w-0 px-2 py-2' }, slots.md?.()),
        ]
      )
  },
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <card extraClass="px-5 py-3">
      <fan-h2>许可证</fan-h2>
      <fan-hr />
      <prose-p>软件许可证、授权、特许、授权条款……</prose-p>
      <prose-p>
        开发者使用许可证保护他们辛苦创作的代码。对于商业代码，使用商业许可证；对于开源代码，使用开源许可证。
      </prose-p>
      <prose-p>下面列出了一些常见的开源许可证，并区分每种许可证的特点，供你参考。</prose-p>
    </card>

    <card extraClass="px-5 py-3">
      <prose-ul>
        <prose-li
          ><badge level="info">宽容</badge> -
          允许该协议授权的代码被用于其他协议授权的项目。</prose-li
        >
        <prose-li
          ><badge level="info">Copyright</badge> -
          保留所有权利，未经授权不允许任何形式的使用。</prose-li
        >
        <prose-li
          ><badge level="info">Copyleft</badge> -
          允许该协议授权的代码自由使用，但衍生项目也需以该协议授权开源。不等同于完全放弃权利。</prose-li
        >
      </prose-ul>
    </card>

    <card extraClass="px-5 py-3">
      <prose-p>如果你正在为自己的项目寻找一个许可证……</prose-p>
      <prose-p>
        请看看 <prose-a href="https://choosealicense.com/zh/">选择一个许可证</prose-a>！
        这里拥有更全面详细的说明，并列出了每一种许可证的使用方式和注意事项。
      </prose-p>
    </card>

    <card extraClass="px-5 py-3">
      <tabs>
        <tab-panel label="MIT" value="mit">
          <PanelBody>
            <badge-group :badges="mit_badges" />
            <prose-p><strong>MIT License</strong>，MIT 许可证，起源于麻省理工学院。 </prose-p>
            <message level="fan">
              <prose-p>
                允许任何人使用、复制、修改、合并、发布、散布、再许可及/或贩售软件副本。
              </prose-p>
            </message>
            <message level="danger">
              <prose-p>须在软件的所有副本或实质部分中保留著作权声明及许可声明。</prose-p>
            </message>
            <template #md>
              <ContentRenderer v-if="mit_ast" :value="mit_ast" :data="mit_ast.data" />
            </template>
          </PanelBody>
        </tab-panel>

        <tab-panel label="GPL" value="gpl">
          <PanelBody>
            <badge-group :badges="gpl_badges" />
            <prose-p>
              <strong>GNU General Public License</strong>，GPL 许可证，当前最新及通用为 v3.0 版本。
            </prose-p>
            <message level="fan">
              <prose-p>允许任何人使用，包括商业使用、分发与再修改</prose-p>
            </message>
            <message level="danger">
              <prose-p>
                在分发时对产物<strong>同样开源</strong>，并同样
                <strong>使用 GPL 许可证</strong>
                ，并保留原作者的署名，且需声明对原作的代码的修改（如有）。
              </prose-p>
            </message>
            <prose-p>
              GPL 协议受到诟病的一点就是其<strong>传染性</strong>。一旦你的代码库中使用到了受 GPL
              许可的开源代码，则你的代码库也需以 GPL 协议开源。
            </prose-p>
            <template #md>
              <ContentRenderer v-if="gpl_ast" :value="gpl_ast" :data="gpl_ast.data" />
            </template>
          </PanelBody>
        </tab-panel>
      </tabs>
    </card>
  </div>
</template>

<style scoped></style>
