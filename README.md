## @hll/stone-business

@hll/stone-business 是针对 stone 中，高频使用的组件进行抽象出来的一个组件集合。通常放置业务公用组件
主体可包含：

- 页面级组件（可抽离的页面）
- 功能组件 (弹窗、城市选择等)
- 工具方法（tools & useHooks）

#### 目录注释：

<pre>
    <code language="zsh">
/src
    ├── index.ts                 // 源码入口
    ├── hooks                    // 常用hooks
    │   ├── useMounted           
    │   └── index.ts             // 入口
    ├── utils                    // 工具方法
    │   ├── index.ts             // 工具方法入口
    │   ├── tools.ts             // 实用函数
    │   └── other.ts             // 其他请求
    └── components               // 功能组件
        ├── Button               // 按钮
        ├── Modal                // 弹窗
        ├── NoData               // 空数据占位
        ├── Toast                // 提示信息
        └── index.ts             // 功能组件入口
    </code>
</pre>

```bash
$ yarn
```

```bash
// 查看文档 & 开发组件
$ yarn start
```

```bash
// 构建文档查阅html
$ yarn docs:build
// 利用http-server，进入dist/index.html即可查看文档说明
```

```bash
// 构建本地包, 发包通过 https://van.huolala.work/libraries/729/task?id=116948  进行发布
$ yarn build
```

```
// 业务使用 业务组件大驼峰，工具函数小驼峰，hooks use开头
import { Button, centToYuan, useMounted } from '@hll/stone-business'

```

### 基于 Dumi 和 father-build 构建

###

todo 几种打包出来的格式区别
