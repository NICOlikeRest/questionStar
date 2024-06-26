import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons';
import { Space, Tabs } from 'antd';
import { FC } from 'react';
import ComponentLib from './ComponentLib';
import Layers from './Layers';

const LeftPannel: FC = () => {
	const tabsItems = [
		{
			key: 'componentLib',
			label: (
				<Space>
					<AppstoreAddOutlined />
					组件库
				</Space>
			),
			children: <ComponentLib />,
		},
		{
			key: 'layers',
			label: (
				<Space>
					<BarsOutlined />
					图层
				</Space>
			),
			children: <Layers />,
		},
	];
	return <Tabs defaultActiveKey="componetLib" items={tabsItems} />;
};

export default LeftPannel;
