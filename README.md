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
        ├── BigCalendarCustom    // 大日历
        
</pre>

#### 开发

```bash
$ yarn
```

```bash
// 查看文档 & 开发组件启动
$ yarn start
```

```bash
// 构建文档查阅html
$ yarn build
// 利用http-server，进入cd dist/index.html即可查看文档
```

```bash
// 发布：构建本地包
$ yarn build
// 发布doc 静态站点
```

```
⚠️注意：命名方式上，业务组件大驼峰、工具函数小驼峰、hooks使用use开头

import { Button, centToYuan, useMounted } from 'katoto-business'

```

引入 katoto-big-calendar 包

#### react 生态精选组件

| 类型           |                                                                                                                                                                                                                                                                                                             推荐组件 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 可视化图表     |                                                                                                                                                                                                              [Ant Design Charts](https://charts.ant.design/zh/) \| [AntV 数据可视化解决方案](https://antv.vision/zh) |
| React Hooks 库 |                                                                                                                                                                                                                                                                                     [ahooks](https://ahooks.js.org/) |
| 表单           |                                                                                                               [ProForm](https://procomponents.ant.design/components/form/) \| [Formily](https://formilyjs.org/#/bdCRC5/dzUZU8il) \| [react-hook-form](https://react-hook-form.com/) \| [formik](https://formik.org/) |
| 布局           |                                                                                                                                                                   [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) \| [react-grid-system](https://github.com/sealninja/react-grid-system) |
| 拖拽           | [dnd-kit](https://dndkit.com/) \| [react-beautiful-dnd](https://react-beautiful-dnd.netlify.app/?path=/story/single-vertical-list--basic) \| [react-dnd](https://github.com/react-dnd/react-dnd) \| [react-sortable-hoc](https://clauderic.github.io/react-sortable-hoc/#/basic-configuration/basic-usage?_k=f8rlpy) |
| 代码编辑器     |                                                                                                                                                                [react-codemirror2](https://github.com/scniro/react-codemirror2) \| [react-monaco-editor](https://github.com/react-monaco-editor/react-monaco-editor) |
| 可视化图表     |                                                                                                                                                                                                              [Ant Design Charts](https://charts.ant.design/zh/) \| [AntV 数据可视化解决方案](https://antv.vision/zh) |
| 富文本编辑器   |                                                                                                                                                                                                                  [react-quill](https://zenoamaro.github.io/react-quill/) \| [braft-editor](https://braft.margox.cn/) |
| JSON 显示器    |                                                                                                                                                                                                                                                        [react-json-view](https://github.com/mac-s-g/react-json-view) |
| 拾色器         |                                                                                                                                                                                                                                                            [react-color](http://casesandberg.github.io/react-color/) |
| 响应式         |                                                                                                                                                                                     [react-responsive](https://github.com/yocontra/react-responsive/) \| [react-media](https://github.com/ReactTraining/react-media) |
| 复制到剪贴板   |                                                                                                                                                                                                                                           [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) |
| 页面 meta 属性 |                                                                                                                                                                                           [react-helmet](https://github.com/nfl/react-helmet) \| [react-helmet-async](https://github.com/staylor/react-helmet-async) |
| 图标           |                                                                                                                                                                                                           [react-fontawesome](https://fontawesome.com/) \| [react-icons](https://github.com/react-icons/react-icons) |
| 二维码         |                                                                                                                                                                                                                                                                 [qrcode.react](https://zpao.github.io/qrcode.react/) |
| 顶部进度条     |                                                                                                                                                                                                                                                                      [nprogress](https://ricostacruz.com/nprogress/) |
| 应用国际化     |                                                                                                                                                                                                                                   [FormatJS](https://formatjs.io/) \| [react-i18next](https://react.i18next.com/) ｜ |
| 代码高亮       |                                                                                                                                                                                                                     [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) |
| Markdown 渲染  |                                                                                                                                                                                                                                                         [react-markdown](https://remarkjs.github.io/react-markdown/) |
| 无限滚动       |                                                                                                                                             [rc-virtual-list](https://github.com/react-component/virtual-list/) \| [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component) |
| 地图           |                                                                                                          [react-google-maps](https://tomchentw.github.io/react-google-maps/) \| [google-map-react](https://github.com/google-map-react/google-map-react) \| [react-amap 高德](https://github.com/ElemeFE/react-amap) |
| 视频播放       |                                                                                                                                               [react-player](https://github.com/CookPete/react-player) \| [video-react](https://github.com/video-react/video-react) \| [video.js](https://videojs.com/guides/react/) |
| 右键菜单       |                                                                                                                                                                                                                                                        [react-contexify](https://github.com/fkhadra/react-contexify) |
| Emoji          |                                                                                                                                                                                                                                                                  [emoji-mart](https://github.com/missive/emoji-mart) |
| 图片裁切       |                                                                                                                                                                               [antd-img-crop](https://github.com/nanxiaobei/antd-img-crop) \| [react-image-crop](https://github.com/DominicTobias/react-image-crop/) |
| 趋势线         |                                                                                                                                                                                                                                                  [react-sparklines](https://github.com/borisyankov/react-sparklines) |
| 关键字高亮     |                                                                                                                                                                                                                                            [react-highlight-words](https://github.com/bvaughn/react-highlight-words) |
| 右键菜单       |                                                                                                                                                                                                                                                        [react-contexify](https://github.com/fkhadra/react-contexify) |
| 文字轮播       |                                                                                                                                                                              [react-text-loop-next](https://github.com/samarmohan/react-text-loop-next) \| [react-fast-marquee](https://www.react-fast-marquee.com/) |
| 动画           |                                                                                                                                                       [react-move](https://github.com/sghall/react-move) \| [Ant Motion](https://motion.ant.design/components/tween-one) \| [react-spring](https://react-spring.io/) |
| 页脚           |                                                                                                                                                                                                                                                               [rc-footer](https://react-component.github.io/footer/) |
| 金额格式化     |                                                                                                                                                         [react-number-format](https://github.com/s-yadav/react-number-format) \| [react-currency-input-fiel](https://github.com/cchanxzy/react-currency-input-field) |

#### 前端/设计/产品必备工具

| 类型         |                                                                  推荐产品 |
| ------------ | ------------------------------------------------------------------------: |
| 文档管理     |                                   [语雀](https://www.yuque.com/dashboard) |
| 图标         |                                      [iconfont](https://www.iconfont.cn/) |
| Sketch 插件  |                                    [Kitchen](https://kitchen.alipay.com/) |
| 在线代码编辑 | [codesandbox](https://codesandbox.io/) \| [codepen](https://codepen.io//) |
| 图片压缩     |                                           [tinypng](https://tinypng.com/) |
| 图表分类查询 |                                           [图之典](http://tuzhidian.com/) |

#### 资料

[基于 Dumi 和 father-build 构建](https://www.npmjs.com/package/father-build)
[father-build 是如何工作的](https://yes-1-am.gitbook.io/blog/web-kai-fa-guo-wang-gong-zuo-chen-dian/fatherbuild-shi-ru-he-gong-zuo-de)
