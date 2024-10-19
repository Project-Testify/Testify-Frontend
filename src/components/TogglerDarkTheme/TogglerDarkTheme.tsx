import React from 'react';
import { useContext } from "react";
import { Switch } from 'antd';
import { BulbOutlined  } from '@ant-design/icons';
import ThemeContext from "../../hooks/ThemeProvider";


export const TogglerDarkTheme: React.FC = () => {

  const { toggleTheme } = useContext(ThemeContext);

  
  return (
    <div>
      <label className={"switch"} htmlFor="switch">
        <Switch
          id="switch"
          onChange={toggleTheme}
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined  style={{color: "#434333"}}/>}
          className={"circle"}
        />
      </label>
    </div>
  );
}


