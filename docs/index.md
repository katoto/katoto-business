### 简介

katoto-business 是针对,高频使用的组件进行抽象出来的一个组件集合。通常放置业务公用组件
主体可包含

- 页面级组件（可抽离的页面）
- 功能组件 (弹窗、城市选择等)
- 工具方法（tools & useHooks）

#### 目录注释：

<pre>
/src
    ├── index.ts                 // 源码入口
    ├── hooks                    // 常用hooks
    │   ├── useMounted           
    │   └── index.ts             // 入口
    ├── utils                    // 工具方法
    │   ├── index.ts             // 工具方法入口
    │   └── tools.ts             // 实用函数
    └── components               // 功能组件
        ├── Button               // 按钮
        ├── ModalCascader        // 城市弹窗
</pre>

#### 开发

```bash
$ yarn
```

```bash
// 查看文档 & 开发组件
$ yarn start
```

```bash
// 构建文档查阅html
$ yarn build
// 利用http-server，进入cd dist/index.html即可查看文档说明

```

```bash
// 发布：构建本地包
$ yarn build
// 发布doc 静态站点
```

```
⚠️注意：命名方式上，业务组件大驼峰、工具函数小驼峰、hooks 使用use开头

import { Button, centToYuan, useMounted } from 'katoto-business'

```

#### 资料

[基于 Dumi 和 father-build 构建](https://www.npmjs.com/package/father-build)

[father-build 是如何工作的](https://yes-1-am.gitbook.io/blog/web-kai-fa-guo-wang-gong-zuo-chen-dian/fatherbuild-shi-ru-he-gong-zuo-de)
