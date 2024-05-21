import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React, { FC } from 'react';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Logo: FC = () => {
	return (
		<div className={styles.container}>
			<Link to="/">
				<Space>
					<Title>
						<FormOutlined />
					</Title>
					<Title>天哥问卷</Title>
				</Space>
			</Link>
		</div>
	);
};

export default Logo;
