import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Space, Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);

  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY);
    else setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <Space>
          <FileTextOutlined />
          属性
        </Space>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <Space>
          <SettingOutlined />
          页面设置
        </Space>
      ),
      children: <PageSetting />,
    },
  ];

  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
};

export default RightPanel;
