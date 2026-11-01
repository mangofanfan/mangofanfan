export default defineAppConfig({
  ui: {
    header: {
      slots: {
        body: 'font-sans',
      },
    },
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
    contentSurround: {
      slots: {
        root: 'font-sans',
      },
    },
    pageAside: {
      slots: {
        root: 'font-sans',
      },
    },
  },
})
