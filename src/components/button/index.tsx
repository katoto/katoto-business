import React from "react";
import classnames from "classnames";
import "./index.less";

export enum EMButtonTextSize {
  Large = "large",
  Middle = "middle",
  Normal = "normal",
}

export enum EMButtonContentTypes {
  Adaptive = "adaptive",
  Full = "full",
}

export interface ButtonProps {
  contentType?: EMButtonContentTypes;
  size?: EMButtonTextSize;
  text: string | React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  loading?: boolean;
  disabledCallback?: any; // 按钮 disabled 下还能点击, 主要用于提示
  className?: any; // class 的透传
  style?: any;
}

const Button = ({
  contentType = EMButtonContentTypes.Adaptive,
  size = EMButtonTextSize.Normal,
  onClick = null as any,
  text,
  loading = false,
  disabled = false,
  disabledCallback = null,
  className,
  style = {},
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      disabledCallback?.();
      return;
    }
    onClick?.(e);
  };

  return (
    <div
      className={classnames(
        ["button", `button-${size}`, `button-${contentType}`],
        {
          "button-disable": disabled,
        },
        [className]
      )}
      onClick={handleClick}
      style={style}
    >
      {text}
    </div>
  );
};

export default Button;
