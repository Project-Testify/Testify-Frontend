import React from 'react';
import { useContext } from "react";
import { Switch } from 'antd';
import './togglerDarkTheme.module.css';
import { TagOutlined } from '@ant-design/icons';
import ThemeContext from "../../hooks/ThemeProvider";


export const TogglerDarkTheme: React.FC = () => {

  const { toggleTheme } = useContext(ThemeContext);

  
  return (
    <div>
      <label className={"switch"} htmlFor="switch">
        <Switch
          id="switch"
          // checked={isDark}
          onChange={toggleTheme}
          checkedChildren={<TagOutlined className={"moon"} />}
          unCheckedChildren={<div className={"sun"}><span className={"dot"}></span></div>}
          className={"circle"}
        />
      </label>
    </div>
  );
}


