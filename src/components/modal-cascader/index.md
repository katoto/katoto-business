---
title: ModalCascader
sidebar: true
---

# 弹窗级联选择

#### 基本功能

1. 左边选择，右边再次编辑选择，确定返回选择的选项

## 案例

```tsx
/**
 * title: 展示两级选择
 * 展示两级选择
 */

import React, { useEffect, useState } from "react";
import ModalCascader from "./index";
import { Button } from "antd";

export default function () {
  const [visible, setVisible] = useState<boolean>(false);

  const list = [
    {
      code: "110000",
      level: 0,
      name: "北京市",
      areaList: [
        {
          code: "110099",
          level: 1,
          name: "北京市",
          areaList: [
            {
              code: "110101",
              level: 2,
              name: "东城区",
              areaList: null,
              hllId: "1017",
            },
            {
              code: "110108",
              level: 2,
              name: "海淀区",
              areaList: null,
              hllId: "1017",
            },
          ],
          hllId: "1017",
        },
      ],
    },
    {
      code: "120000",
      level: 0,
      name: "天津市",
      areaList: [
        {
          code: "120099",
          level: 1,
          name: "天津市",
          areaList: [
            {
              code: "120101",
              level: 2,
              name: "和平区",
              areaList: null,
              hllId: "1018",
            },
            {
              code: "120119",
              level: 2,
              name: "蓟州区",
              areaList: null,
              hllId: "1018",
            },
          ],
          hllId: "1018",
        },
      ],
    },
  ];

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        二级筛选
      </Button>

      <ModalCascader
        visible={visible}
        cascaderLevel={2}
        fieldNames={{ label: "name", value: "code", children: "areaList" }}
        list={list}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
```

```tsx
/**
 * title: 展示两级选择
 * 展示两级选择
 */

import React, { useEffect, useState } from "react";
import ModalCascader from "./index";
import { Button } from "antd";

export default function () {
  const [visible2, setVisible2] = useState<boolean>(false);

  const list = [
    {
      code: "110000",
      level: 0,
      name: "北京市",
      areaList: [
        {
          code: "110099",
          level: 1,
          name: "北京市",
          areaList: [
            {
              code: "110101",
              level: 2,
              name: "东城区",
              areaList: null,
              hllId: "1017",
            },
            {
              code: "110108",
              level: 2,
              name: "海淀区",
              areaList: null,
              hllId: "1017",
            },
          ],
          hllId: "1017",
        },
      ],
    },
    {
      code: "120000",
      level: 0,
      name: "天津市",
      areaList: [
        {
          code: "120099",
          level: 1,
          name: "天津市",
          areaList: [
            {
              code: "120101",
              level: 2,
              name: "和平区",
              areaList: null,
              hllId: "1018",
            },
            {
              code: "120119",
              level: 2,
              name: "蓟州区",
              areaList: null,
              hllId: "1018",
            },
          ],
          hllId: "1018",
        },
      ],
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible2(true);
        }}
      >
        一级筛选
      </Button>
      <ModalCascader
        visible={visible2}
        cascaderLevel={1}
        fieldNames={{ label: "name", value: "code", children: "areaList" }}
        list={list}
        onCancel={() => {
          setVisible2(false);
        }}
        onOk={(selList) => {
          console.log(selList);
        }}
      />
    </div>
  );
}
```

## API

| 参数          | 说明                                       | 类型              | 默认值                                                   |
| :------------ | :----------------------------------------- | :---------------- | :------------------------------------------------------- |
| visible       | 对话框是否可见                             | `boolean`         | -                                                        |
| cascaderLevel | 展示层级                                   | `number`          | list 树的最大深度值                                      |
| fieldNames    | 自定义 list 中 label value children 的字段 | `object`          | { label: `label`, value: `value`, children: `children` } |
| list          | cascader 展示数据                          | `list[]`          | []                                                       |
| onCancel      | 点击遮罩层或右上角叉或取消按钮的回调       | function          | -                                                        |
| onOk          | 点击确定回调                               | function(selList) | -                                                        |

### Option

```
interface List {
  value?: string | number;
  label?: string;
  children?: List[];
  [key: string]: any;
}
```