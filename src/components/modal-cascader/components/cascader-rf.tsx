import { Input, InputRef, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { findNodeByValue, cascaderOption2Value } from "../utils";
import "./cascader-rf.less";
interface CascaderValsItemKeys {
  code: string;
  level: number;
  name: string;
  areaList?: any;
  hllId: string;
}
interface CascaderRfProps {
  cascaderVals: CascaderValsItemKeys[][];
  updateCascader: (
    list?: string[][],
    listOption?: CascaderValsItemKeys[][]
  ) => void;
  list: any[];
  fieldNames: {
    label: string;
    value: string;
    children: string;
  };
  listValMap: any;
}

const CascaderRf: React.FC<CascaderRfProps> = ({
  cascaderVals,
  updateCascader,
  list,
  fieldNames,
  listValMap,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [subInputValue, setSubInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selOptionVals, setSelOptionVals] = useState<CascaderValsItemKeys[][]>(
    []
  );
  const subRef = useRef<InputRef>(null);
  const selVals: string[][] = useMemo(() => {
    return cascaderOption2Value(cascaderVals, fieldNames);
  }, [cascaderVals, fieldNames]);

  useEffect(() => {
    setSelOptionVals(cascaderVals);
  }, [cascaderVals]);

  // 处理inp 数据过滤
  function handleFilterInp(val: string) {
    const currVal = val.trim();
    if (currVal) {
      // 搜索过滤
      const filterArr = cascaderVals.filter((items) => {
        const joinVal = items.reduce((all, item) => {
          return all + item.name;
        }, "");
        return joinVal.includes(currVal);
      });
      setSelOptionVals([...filterArr]);
    } else {
      setSelOptionVals([...cascaderVals]);
    }
  }

  function doEnterHandle(e: any) {
    const inpVal = e.target.value;
    let flag = false;
    if (inpVal) {
      let inpArr = inpVal.replace(/，/g, ",").replace(/\n/g, ",").split(",");
      inpArr = [...new Set(inpArr)]; // 输入去重
      const selCascaderArr: any = selVals;
      const selCascaderNodeArr: any = selOptionVals;
      const selValsPathArr = selVals.map((items) => {
        return items.join("__RC_CASCADER_SPLIT__");
      });
      inpArr.forEach((inpItem: string) => {
        // push 前去重
        if (
          inpItem &&
          listValMap[inpItem] &&
          !selValsPathArr.includes(listValMap[inpItem])
        ) {
          const splitValueArr = listValMap[inpItem].split(
            "__RC_CASCADER_SPLIT__"
          );
          const splitNodeArr = splitValueArr.map((code: string) => {
            return findNodeByValue(code, list, fieldNames);
          });
          flag = true;
          selCascaderArr.push(splitValueArr);
          selCascaderNodeArr.push(splitNodeArr);
        }
      });
      updateCascader([...selCascaderArr], [...selCascaderNodeArr]);
      return flag;
    }
  }

  return (
    <div className="screen-rf">
      <Input
        className="screen-rf-input"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleFilterInp(e.target.value);
        }}
        onPressEnter={(e: any) => {
          handleFilterInp(e.target.value);
        }}
        placeholder="请输入搜索内容"
        allowClear
        suffix={<SearchOutlined />}
      />
      <div className="screen-rf-txt">
        <span>已选：{cascaderVals.length || 0}</span>
        <span
          onClick={() => {
            setSearchValue("");
            if (cascaderVals.length !== 0) {
              updateCascader();
            }
          }}
        >
          清空
        </span>
      </div>

      {selOptionVals.length === 0 && (
        <Input.TextArea
          style={{ marginTop: 10, height: 364, padding: "0 2px" }}
          placeholder={
            searchValue && selOptionVals.length === 0
              ? "暂无数据"
              : "输入「城市id」或「城市名称」按「回车键」确认，支持逗号及分行格式批量导入"
          }
          value={inputValue}
          bordered={false}
          onPressEnter={(e: any) => {
            doEnterHandle(e);
            setSearchValue("");
            setInputValue("");
            setTimeout(() => {
              if (subRef.current) {
                subRef.current.focus();
              }
            }, 0);
          }}
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val.replace(/[\r]/g, "")); // 去除回车符展示
          }}
        />
      )}

      {selOptionVals.length > 0 && (
        <div className="cascader-tag-box">
          {selOptionVals.map((items) => {
            const joinName = items.reduce((all, item) => {
              if (all.includes(item.name)) {
                return all;
              }
              return all + item.name;
            }, "");
            const joinVal = items.reduce((all, item) => {
              return all + item.code + "/";
            }, "");
            return (
              <Tag
                key={joinVal}
                className="cascader-rf-tag"
                closable
                title={joinName}
                onClose={() => {
                  setSearchValue("");
                  const selCascaderArr = [...selVals];
                  const selCascaderNodeArr = [...cascaderVals];
                  // 查找并删除
                  const currInd = selCascaderArr.findIndex((findItems: any) => {
                    return findItems.join("/") + "/" === joinVal;
                  });
                  selCascaderArr.splice(currInd, 1);
                  selCascaderNodeArr.splice(currInd, 1);
                  updateCascader(selCascaderArr, selCascaderNodeArr);
                }}
              >
                {joinName}
              </Tag>
            );
          })}
          {/* 标签解析后还可再输入 */}
          <Input
            ref={subRef}
            className="cascader-label-inp"
            value={subInputValue}
            onPressEnter={(e: any) => {
              const isSucc = doEnterHandle(e);
              if (isSucc) {
                setSubInputValue("");
              }
            }}
            onChange={(e) => {
              const val = e.target.value;
              setSubInputValue(val.replace(/[\r]/g, "")); // 去除回车符展示
            }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(CascaderRf);
