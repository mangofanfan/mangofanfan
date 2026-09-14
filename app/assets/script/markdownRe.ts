const reg = /::translate-paragraph\r?\n#o\r?\n(.*?)\n#t\r?\n(.*?)\r?\n::/gms

export function getOriginMarkdown(source: string) {
  console.log('已获取原文 Markdown。')
  return source.replaceAll(reg, '$1')
}

export function getTranslationMarkdown(source: string) {
  console.log('已获取翻译 Markdown。')
  return source.replaceAll(reg, '$2')
}
