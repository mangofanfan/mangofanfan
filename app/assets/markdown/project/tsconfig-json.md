## tsconfig.json

```json
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "Node16",
    "target": "ES2022",
    "lib": [
      "ES2022"
    ],
    "outDir": "out",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "out"
  ]
}
```

`tsconfig.json` 顾名思义，是对于 :term-tip-typescript 的设置。此文件的出现表明当前目录是一个 TypeScript
项目的根目录，该项目使用此文件作为语言配置。

此文件一般由脚手架工具或模板负责创建，无需手动编写。除了有时，需要进行修改以解决一些问题。

::message{level=info}
如果有需要的话，[TypeScript 官方文档中的 tsconfig.json 描述在这里](https://www.typescriptlang.org/zh/docs/handbook/tsconfig-json.html)。
::

一个与它功能类似的文件是 `jsconfig.json`。顾名又思义，是对于 :term-tip-javascript 的设置。

### 包含目录 / 排除目录

`include` 列表是包含的 TypeScript 源代码目录。`src/**/*` 即包含 `src` 下的所有文件。

注意这个写法会包含 `src` 下的**所有文件**。如果只想包含 TypeScript 文件，就改为 `src/**/*.ts`，以此类推。

`exclude` 列表是排除的目录。`node_modules` 一般必选，其他的根据需要增加。

你也可以使用 `files` 列表来逐个添加 TypeScript 文件。

### 编译器设置

`compilerOptions` 是 TypeScript 编译器的设置。一般来说，为了获得更广泛的兼容性和安全性，TypeScript
代码需要被编译为 JavaScript 代码后执行，无论是在 :term-tip-nodejs 还是在浏览器中。

这里设置了一些编译选项。一般由脚手架或模板负责生成。
