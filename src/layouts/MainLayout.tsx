import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
	const { waitingUserData } = useLoadUserData();
	useNavPage(waitingUserData);

	return (
		<Layout>
			<Header className={styles.header}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.right}>
					<UserInfo />
				</div>
			</Header>
			<Layout className={styles.main}>
				<div>
					{waitingUserData ? (
						<div style={{ textAlign: 'center', marginTop: '200px' }}>
							<Spin />
						</div>
					) : (
						<Outlet />
					)}
				</div>
			</Layout>
			<Footer className={styles.footer}>天哥问卷 &copy; 2024 - present. Create by nico</Footer>
		</Layout>
	);
};

export default MainLayout;
