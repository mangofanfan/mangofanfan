type OgType =
  | 'website'
  | 'article'
  | 'news' // news 是非规范的类型，目前视作 article 处理
  | 'video.moive'
  | 'video.eposide'
  | 'video.tv_show'
  | 'video.other'
  | 'book'
  | 'profile'
  | 'payment.link'

export interface OgCardProps {
  title: string
  description?: string
  type?: OgType
  siteName?: string
  url?: string
  image?: string
  imageAlt?: string
  // 在 MDC 语法中可能难以指定非字符串类型，在此 hack。
  // 人工书写时应尽量传入 number 以避免歧义
  imageWidth?: number | string
  imageHeight?: number | string

  articleAuthor?: string
  articlePublishedTime?: string
  articleModifiedTime?: string
  articleExpirationTime?: string
  articleSection?: string
  articleTag?: string[]

  video?: string
  videoWidth?: number | string
  videoHeight?: number | string
  // 视频 MIME 类型。对于 text/html 已特殊处理。
  videoType?: string
  videoDuration?: number | string
  videoReleaseDate?: string
  videoActor?: { name: string; role: string }[]
  videoDirector?: string[]
  videoWriter?: string[]
  videoTag?: string[]
  videoSeries?: string

  bookAuthor?: string[]
  bookIsbn?: string
  bookReleaseDate?: string
  bookTag?: string[]
}

function isType(value: string): boolean {
  const values = [
    'website',
    'article',
    'news',
    'video.moive',
    'video.eposide',
    'video.tv_show',
    'video.other',
    'book',
    'profile',
    'payment.link',
  ]
  return values.includes(value)
}

export function useHtmlParser() {
  const parser = new DOMParser()

  function parse(raw: string): OgCardProps {
    const doc = parser.parseFromString(raw, 'text/html')
    const head = doc.head

    const props: Partial<OgCardProps> = {}
    for (const el of head.children) {
      switch (el.tagName) {
        case 'TITLE': {
          props.title = (el as HTMLTitleElement).innerText
          break
        }
        case 'META': {
          // 一些网站将开放图谱元数据名称存在 meta 元素的 name 中，更多网站存在 property 中
          const name =
            (el as HTMLMetaElement).name === ''
              ? el.getAttribute('property')
              : (el as HTMLMetaElement).name

          if (!name) continue // 既没有 name 也没有 property 的 meta 元素
          const content = (el as HTMLMetaElement).content

          // 分析 Meta 标签
          switch (name.toLowerCase()) {
            case 'og:title': {
              props.title = content
              break
            }
            case 'description': {
              props.description = content
              break
            }
            case 'og:description': {
              props.description = content
              break
            }
            case 'og:type': {
              props.type = isType(content) ? (content as OgType) : 'website'
              break
            }
            case 'og:image': {
              props.image = content
              break
            }
            case 'og:image:width': {
              props.imageWidth = Number(content)
              break
            }
            case 'og:image:height': {
              props.imageHeight = Number(content)
              break
            }
            case 'og:image:alt': {
              props.imageAlt = content
              break
            }
            case 'og:site_name': {
              props.siteName = content
              break
            }
            case 'og:url': {
              props.url = content
              break
            }
            case 'article:author': {
              props.articleAuthor = content
              break
            }
            case 'article:published_time': {
              props.articlePublishedTime = content
              break
            }
            case 'article:modified_time': {
              props.articleModifiedTime = content
              break
            }
            case 'article:expiration_time': {
              props.articleExpirationTime = content
              break
            }
            case 'article:section': {
              props.articleSection = content
              break
            }
            case 'article:tag': {
              props.articleTag = props.articleTag ? [...props.articleTag, content] : [content]
              break
            }
            case 'og:video': {
              props.video = content
              break
            }
            case 'og:video:width': {
              props.videoWidth = Number(content)
              break
            }
            case 'og:video:height': {
              props.videoHeight = Number(content)
              break
            }
            case 'og:video:type': {
              props.videoType = content
              break
            }
            case 'video:duration': {
              props.videoDuration = Number(content)
              break
            }
            case 'video:series': {
              props.videoSeries = content
              break
            }
            case 'video:release_date': {
              props.videoReleaseDate = content
              break
            }
            case 'video:director': {
              props.videoDirector = props.videoDirector
                ? [...props.videoDirector, content]
                : [content]
              break
            }
            case 'video:writer': {
              props.videoWriter = props.videoWriter ? [...props.videoWriter, content] : [content]
              break
            }
            case 'video:actor': {
              // TODO props.videoActor
              break
            }
            case 'video:tag': {
              props.videoTag = props.videoTag ? [...props.videoTag, content] : [content]
              break
            }
            case 'book:author': {
              props.bookAuthor = props.bookAuthor ? [...props.bookAuthor, content] : [content]
              break
            }
            case 'book:isbn': {
              props.bookIsbn = content
              break
            }
            case 'book:tag': {
              props.bookTag = props.bookTag ? [...props.bookTag, content] : [content]
              break
            }
            case 'book:release_date': {
              props.bookReleaseDate = content
              break
            }
          }
        }
      }
    }
    return props as OgCardProps
  }

  return { parse }
}
