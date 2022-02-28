---
title: 组件说明
---

## button demo

#### 文档 <Badge>Hello</Badge>

```tsx
import React, { useEffect } from 'react';
import Button from './index';

export default function() {
  return <Button size="large" text="sss"></Button>;
}
```

## API

| 参数 | 说明     | 类型                         | 默认值 |
| :--- | :------- | :--------------------------- | :----- |
| size | 按钮大小 | large \| middle \| normal \  |
| text | 按钮文案 | `string`                     | -      |
