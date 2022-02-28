## 基于 dumi & father-build 快速组件模板

```bash
$ yarn
```

```bash
// 查看文档 html
$ yarn start
```

```bash
// 构建文档查阅html
$ yarn docs:build
// 利用http-server，进入dist/index.html即可查看文档说明
```

```bash
// 构建本地包,推送和更新前运行,最终在项目基本路径会找到dist三方包（组件库）
$ yarn lib:build
```

```
// 业务使用
import DetailInfo from 'my-lib'

...
<DetailInfo />
...
```
