import { Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { memo, useEffect, useMemo, useState } from "react";
import {
  treeKeyPathMap,
  findNodeByValue,
  cascaderOption2Value,
} from "../utils";
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
}

const CascaderRf: React.FC<CascaderRfProps> = ({
  cascaderVals,
  updateCascader,
  list,
  fieldNames,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selOptionVals, setSelOptionVals] = useState<CascaderValsItemKeys[][]>(
    []
  );
  const selVals: string[][] = useMemo(() => {
    return cascaderOption2Value(cascaderVals, fieldNames);
  }, [cascaderVals, fieldNames]);
  const listValMap = useMemo(() => {
    return treeKeyPathMap(list, fieldNames, "hllId");
  }, [fieldNames, list]);

  useEffect(() => {
    setSelOptionVals(cascaderVals);
  }, [cascaderVals]);

  useEffect(() => {
    console.log("==childuseEffect==");
  });

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
    let inpVal = e.target.value;
    if (inpVal) {
      inpVal = inpVal.replace(/，/g, ",");
      let inpArr = inpVal.split(",");
      inpArr = [...new Set(inpArr)]; // 输入去重
      const selCascaderArr: any = selVals;
      const selCascaderNodeArr: any = selOptionVals;
      const selValsPathArr = selVals.map((items) => {
        return items.join("__RC_CASCADER_SPLIT__");
      });
      console.log(selValsPathArr);
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
          selCascaderArr.push(splitValueArr);
          selCascaderNodeArr.push(splitNodeArr);
        }
      });
      updateCascader([...selCascaderArr], [...selCascaderNodeArr]);
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
          style={{ marginTop: 10, height: 460, padding: "0 2px" }}
          placeholder={
            searchValue && selOptionVals.length === 0
              ? "暂无数据"
              : "请输入城市id，用英文逗号隔开"
          }
          value={inputValue}
          bordered={false}
          onPressEnter={(e: any) => {
            doEnterHandle(e);
            setSearchValue("");
          }}
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val.replace(/[\r\n]/g, "")); // 去除回车符展示
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
                style={{ marginTop: "8px" }}
                closable
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
            className="cascader-label-inp"
            onPressEnter={(e: any) => {
              doEnterHandle(e);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(CascaderRf);
