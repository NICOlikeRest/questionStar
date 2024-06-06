import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Space, Tabs } from 'antd';
import { FC } from 'react';
import ComponentProp from './ComponentProp';

const RightPanel: FC = () => {
	const tabsItems = [
		{
			key: 'prop',
			label: (
				<Space>
					<FileTextOutlined />
					属性
				</Space>
			),
			children: <ComponentProp />,
		},
		{
			key: 'setting',
			label: (
				<Space>
					<SettingOutlined />
					页面设置
				</Space>
			),
			children: <div>页面设置</div>,
		},
	];

	return <Tabs defaultActiveKey="prop" items={tabsItems}></Tabs>;
};

export default RightPanel;
