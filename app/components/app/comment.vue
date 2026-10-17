<script setup lang="ts">
defineProps<{
  route: string
}>()

const commentList = useTemplateRef('comment-list')
function reloadCommentList() {
  commentList.value?.reload()
}
</script>

<template>
  <div class="space-y-4">
    <app-comment-list ref="comment-list" :route="route" />
    <app-comment-form
      :route="route"
      @comment="
        (status) => {
          if (status) reloadCommentList()
        }
      "
    />
  </div>
</template>

<style scoped></style>
