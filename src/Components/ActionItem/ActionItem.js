//libs
import React from "react";
import { Icon } from "antd";

//css
import "./ActionItem.css";

const ActionItem = props => {
  const { type } = props;
  return <Icon type={`${type}`} />;
};

export default ActionItem;
