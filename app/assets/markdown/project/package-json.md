## package.json

```json
{
  "name": "a-strange-nuxt-project",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@nuxt/content": "3.16.0",
    "@nuxt/eslint": "1.17.0",
    "@nuxt/image": "2.1.0",
    "@tailwindcss/vite": "^4.3.3",
    "@types/node": "^26.4.1",
    "better-sqlite3": "^13.0.3",
    "nuxt": "^4.5.2",
    "tailwindcss": "^4.3.3",
    "vue": "^3.5.42",
    "vue-router": "^5.3.0",
    "zod": "^4.5.4"
  },
  "devDependencies": {
    "@nuxt/icon": "^2.5.1",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.6",
    "prettier": "^3.9.6"
  }
}
```

此文件定义了该 Node 项目的许多项目特性。

::message{level="warning"}
一般而言，不需要频繁编辑此文件。
::

### 项目命令

在 `scripts` 中，使用键值对的方式定义了许多命令和别名。例如，`build` 被设定为 `nuxt build` 的别名，后者是
:term-tip-nuxt 项目的默认构建命令。

然后，在根目录下就可以使用以下命令来实现构建这个 Nuxt 项目。

```bash
npm run build
```

这等价于：

```bash
nuxt build
```

### 依赖

依赖分为运行时依赖和开发时依赖，分别记录在 `dependencies` 和 `devDependencies` 中。

运行时依赖会随项目构建而被一起打包，而开发时依赖只在对项目进行开发时需要。

典型的运行时依赖：

* :term-tip-vue 、 :term-tip-nuxt 等框架。
* :term-tip-axios 等客户端功能库。

典型的开发时依赖：

* :term-tip-eslint 、 :term-tip-prettier 等代码风格和检查工具。
