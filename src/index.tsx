import React from 'react';
// 对于 js/ts 文件中引入的资源，文件体积要控制在 14 kb 以内
// 超过 14 kb 的资源：
// 1. 修改 @rollup/plugin-url 插件中 limit
// 2. 把资源传到 cdn，直接引入链接
import logo from './assets/Typescript.png';

import './index.css';

interface MyButtonProps {
  title: string;
}

export function MyButton({ title }: MyButtonProps) {
  return (
    <div className="my-button">
      <div>
        <span>测试资源加载：</span>
        <img src={logo} style={{ width: 20, height: 20 }} />
        <div className="noop"></div>
      </div>
      <p className="title">{title}</p>
    </div>
  );
}
