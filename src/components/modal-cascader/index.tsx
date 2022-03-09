import { Modal, Checkbox, message } from "antd";
import CascaderRf from "./components/cascader-rf";
import { Cascader } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getTreeAllValue, calListLevel, catListLevel } from "./utils";
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import "./index.less";

interface List {
  value?: string | number;
  label?: string;
  children?: List[];
  [key: string]: any;
}

interface CascaderProps {
  visible: boolean;
  cascaderLevel?: number;
  fieldNames?: {
    label: string;
    value: string;
    children: string;
  };
  list: List[];
  onCancel?: () => void;
  onOk?: (selOptions: any[]) => void;
}

// 自定义 options 中的字段
const DefaultFieldNames = {
  label: "label",
  value: "value",
  children: "children",
};
const AddCityBlock: React.FC<CascaderProps> = ({
  visible,
  onCancel,
  onOk,
  cascaderLevel,
  fieldNames = DefaultFieldNames,
  list,
}) => {
  const [cascaderVals, setCascaderVals] = useState<any>([]);
  const [cascaderSelOptions, setCascaderSelOptions] = useState<any>([]);
  let newList = list;
  if (cascaderLevel) {
    newList = catListLevel(newList, fieldNames.children, cascaderLevel);
  }
  // 计算层级
  const level = useMemo(() => {
    return calListLevel(newList, fieldNames.children);
  }, [newList, fieldNames.children]);
  const levelMap = useMemo(() => {
    return new Array(level).fill(undefined).map(() => {
      return { checked: false };
    });
  }, [level]);
  const [levelArr, setLevelArr] =
    useState<{ checked: boolean | undefined }[]>(levelMap); // 直接fill 对象是同一个

  function checkAllCheckBox() {
    // hack 处理，避免检查异步
    setTimeout(() => {
      const menuDoms = document.querySelectorAll(
        ".ant-select-dropdown .ant-cascader-menu"
      );
      const nlevelArr = [...levelArr];
      menuDoms.forEach((menuDom, index) => {
        const lis = menuDom.querySelectorAll("li");
        const lisChecked = menuDom.querySelectorAll("li[aria-checked=true]");
        if (lis.length > 0 && lis.length === lisChecked.length) {
          nlevelArr[index].checked = true;
        } else {
          nlevelArr[index].checked = false;
        }
      });
      setLevelArr([...nlevelArr]);
    }, 0);
  }

  function cascaderChange(value: any, selectedOptions: any) {
    setTimeout(() => {
      // set 同步执行 v17 v18 用flushSync
      setCascaderVals(value);
      setCascaderSelOptions(selectedOptions);
    }, 0);
    checkAllCheckBox();
  }

  function updateCascader(value: any, valueOptions: any) {
    // 更新选择
    const oVal = value || [];
    const oValueOptions = valueOptions || [];
    if (!oVal || oVal.length === 0) {
      // 值空
      const nlevelArr = [...levelArr];
      nlevelArr.map((item) => {
        item.checked = false;
      });
      setLevelArr(nlevelArr);
    } else {
      checkAllCheckBox();
    }
    setCascaderVals(oVal);
    setCascaderSelOptions(oValueOptions);
  }

  useEffect(() => {
    if (visible && level > 1) {
      setTimeout(() => {
        // active next dom lis
        const liDom = document.querySelector(
          ".ant-select-dropdown .ant-cascader-menus li"
        ) as HTMLElement;
        const hasActive = document.querySelector(
          ".ant-select-dropdown .ant-cascader-menus .ant-cascader-menu-item-active"
        ) as HTMLElement;
        if (liDom && !hasActive) {
          liDom.click();
        }
        document
          .querySelector(".ant-cascader-menus")
          ?.addEventListener("click", checkAllCheckBox);
      }, 0);
    }
    return () => {
      // 销毁
      if (level > 1) {
        document
          .querySelector(".ant-cascader-menus")
          ?.removeEventListener("click", checkAllCheckBox);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, visible]);

  function dropdownRender(menus: any) {
    return (
      <div>
        <div className="cascader-head">
          {levelArr.map((levelItem, index) => {
            // 直接切换子级的情况 todo
            return (
              <>
                <Checkbox
                  checked={levelItem.checked}
                  className="cascader-all"
                  onChange={(e: CheckboxChangeEvent) => {
                    if (0 === index) {
                      // 1级全选
                      if (e.target.checked) {
                        setCascaderVals([
                          ...getTreeAllValue(newList, fieldNames),
                        ]);
                        setCascaderSelOptions(
                          newList.map((item) => {
                            return [item];
                          })
                        );
                      } else {
                        setCascaderVals([]);
                        setCascaderSelOptions([]);
                      }
                      checkAllCheckBox();
                    } else {
                      // 子级全选 ｜ 取消 （获取上一层active，并点击） 点击会触发cascaderChange
                      const menuActDoms = document.querySelectorAll(
                        ".ant-cascader-menus .ant-cascader-menu .ant-cascader-menu-item-active"
                      );
                      let menuActDom = menuActDoms[index - 1];
                      if (!menuActDom) {
                        menuActDom = document.querySelectorAll(
                          ".ant-cascader-menus .ant-cascader-menu .ant-cascader-menu-item"
                        )[0];
                      }
                      (
                        menuActDom.querySelectorAll(
                          ".ant-cascader-checkbox"
                        )[0] as HTMLElement
                      ).click();
                    }
                  }}
                >
                  全选
                </Checkbox>
                {index + 1 !== levelArr.length && (
                  <div
                    style={{
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#EBEFF5",
                    }}
                    className="line"
                  />
                )}
              </>
            );
          })}
          {/* <Checkbox className='cascader-all' onChange={onAllSelNext}>全选</Checkbox> */}
        </div>
        {menus}
      </div>
    );
  }

  return (
    <Modal
      style={{ borderRadius: "8px", overflow: "hidden" }}
      width={738}
      bodyStyle={{ height: 614 }}
      title="添加筛选条件"
      visible={visible}
      onOk={() => {
        // 传出到业务
        if (onOk) {
          onOk(cascaderSelOptions);
        } else {
          console.log(cascaderSelOptions);
          message.success(JSON.stringify(cascaderSelOptions));
        }
      }}
      onCancel={() => {
        if (onCancel) {
          onCancel();
        }
      }}
      destroyOnClose
    >
      <div className="screen-box">
        {/* 预留div */}
        {false && (
          <div
            style={{ width: "10px", height: "100%", backgroundColor: "red" }}
          >
            todo
          </div>
        )}

        <div>
          <Cascader
            className="city-sel"
            dropdownClassName="city-sel-dropdown"
            dropdownMenuColumnStyle={{
              width: "212px",
              height: "32px",
              paddingLeft: 16,
            }}
            changeOnSelect
            fieldNames={fieldNames}
            options={newList}
            onChange={cascaderChange}
            multiple
            bordered={false}
            value={cascaderVals}
            open
            placeholder="请输入搜索内容"
            notFoundContent="暂无数据"
            showSearch
            displayRender={(labels: any) => {
              return labels.map((label: any, index: number) => {
                // eslint-disable-next-line react/no-array-index-key
                return <span key={index}>{label} </span>;
              });
            }}
            style={{
              width: `${level * 213}px`,
            }}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            dropdownRender={dropdownRender}
            placement="bottomLeft"
          />
        </div>

        <CascaderRf
          cascaderVals={cascaderSelOptions}
          updateCascader={updateCascader}
          list={newList}
          fieldNames={fieldNames}
        />
      </div>
    </Modal>
  );
};

export default AddCityBlock;
