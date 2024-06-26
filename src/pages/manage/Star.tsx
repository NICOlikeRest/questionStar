import { Empty, Pagination, Spin, Typography } from 'antd';
import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';

const { Title } = Typography;

const Star: FC = () => {
	// 标星页面，这个isstar肯定都是true啊
	const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
	const { list = {}, total = 0 } = data;

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>星标问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<div style={{ textAlign: 'center' }}>
						<Spin></Spin>
					</div>
				)}
				{/* 问卷列表 */}
				{!loading && list.length === 0 && <Empty description="暂无数据" />}
				{list.length > 0 &&
					list.map((q: any) => {
						const { _id } = q;

						return <QuestionCard key={_id} {...q}></QuestionCard>;
					})}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	);
};

export default Star;
