/**
 * 树转[[value],[value]]数组, 选中value 值的数组。用于全选功能
 * [
      {
        code: '110000',
        level: 0,
        name: '北京市',
        areaList: [
          {
            code: '110001',
            level: 0,
            name: '北京市',
          }
        ]
    ]
 * @returns ['110000', '110001']
 */
export function getTreeAllValue(
  list: any,
  fieldNames: { label: string; value: string; children: string }
) {
  return list
    .map((item: any) => {
      return traverse(item, undefined);
    })
    .flat(1);

  function traverse(node: any, p: any) {
    let nodes: any = [];
    if (node) {
      if (!node[fieldNames.children]) {
        if (p) {
          nodes.push([...p, node[fieldNames.value]]);
        } else {
          nodes.push([node[fieldNames.value]]);
        }
      }
      const children = node[fieldNames.children];
      if (children) {
        for (let i = 0; i < children.length; i++) {
          let ps: any = [];
          if (p) {
            ps = [...p];
          }
          nodes = nodes.concat(
            traverse(children[i], [...ps, node[fieldNames.value]])
          );
        }
      }
    }
    return nodes;
  }
}

/**
 * 根据cascader list 数据，计算级联层级 （用于生成Checkbox数量）
 * 计算树的深度
 * @return level number
 */
export function calListLevel(list: any, childrenName = "children") {
  let maxDeep = 1; // 寻找最大深度
  function eachData(arrList: any, deep: number = 1) {
    arrList.forEach((elem: any) => {
      if (deep > maxDeep) {
        maxDeep = deep;
      }
      if (elem[childrenName] && elem[childrenName].length > 0) {
        eachData(elem[childrenName], deep + 1);
      }
    });
  }
  eachData(list);
  return maxDeep;
}

/**
 * 递归遍历list 返回value 的path
 * @param list
 * @returns ${value}__RC_CASCADER_SPLIT__${nextValue}
 */
export function treeKeyPathMap(
  list: any,
  fieldNames: { label: string; value: string; children: string },
  mapKeyName: string = ""
) {
  const map: any = {};
  // for 循环和递归，for 循环只能退出第一层
  function eachData(arrList: any, pointStr: string = "") {
    for (let i = 0; i < arrList.length; i++) {
      let nPointStr = pointStr;
      if (nPointStr) {
        nPointStr += `__RC_CASCADER_SPLIT__${arrList[i][fieldNames.value]}`;
      } else {
        nPointStr = arrList[i][fieldNames.value];
      }
      if (arrList[i][fieldNames.label]) {
        if (!map[arrList[i][fieldNames.label]]) {
          // fix to 北京市 北京市/北京市
          map[arrList[i][fieldNames.label]] = nPointStr;
        }
      }
      // mapKeyName 特殊key 处理。eg: hllId
      if (mapKeyName && arrList[i][mapKeyName]) {
        map[arrList[i][mapKeyName]] = nPointStr;
      } else {
        // value 找 path 路径
        map[arrList[i][fieldNames.value]] = nPointStr;
      }
      if (
        arrList[i][fieldNames.children] &&
        arrList[i][fieldNames.children].length > 0
      ) {
        eachData(arrList[i][fieldNames.children], nPointStr);
      }
    }
  }
  eachData(list);
  return map;
}

// 通过 value 查找树节点
export function findNodeByValue(
  value: string,
  tree: any[],
  fieldNames: { label: string; value: string; children: string }
) {
  function findParent(nodes: any[]): any[] | undefined {
    if (!nodes) {
      return undefined;
    }
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (value === node[fieldNames.value]) {
        return node;
      }
      if (node[fieldNames.children]) {
        const foundInChildren = findParent(node[fieldNames.children]);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
  }
  return findParent(tree);
}

/**
 * optionList 变成 valueList
 * eg: 省市区 ，只需要省市
 * @param [[{options}, {options}]]
 * @return [['110000', '110099']]
 */
export function cascaderOption2Value(
  list: any,
  fieldNames: { label: string; value: string; children: string }
) {
  const oArr: any = [];
  list.forEach((items: any[]) => {
    const itemArr = items.map((item: any) => {
      return item[fieldNames.value];
    });
    oArr.push(itemArr);
  });
  return oArr;
}

/**
 * 根据cascader 原数据是三级级联，其实只要两级
 * eg: 省市区 ，只需要省市
 * @return 处理后的层级
 */
export function catListLevel(
  list: any[],
  childrenName = "children",
  level: number
) {
  const oList = [...list];
  function eachData(arrList: any, deep: number = 1) {
    arrList.forEach((elem: any) => {
      if (deep >= level) {
        if (elem[childrenName]) {
          elem[childrenName] = null; // 不要的层级直接置空
        }
      }
      if (elem[childrenName] && elem[childrenName].length > 0) {
        eachData(elem[childrenName], deep + 1);
      }
    });
  }
  eachData(oList);
  return oList;
}
