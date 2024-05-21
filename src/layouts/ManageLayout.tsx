import React, { FC, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space, message } from 'antd';
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { createQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

const ManageLayout: FC = () => {
	const nav = useNavigate();

	const { pathname } = useLocation();
	// const [loading, setLoading] = useState(false);

	// async function handlerCreateClick() {
	// 	setLoading(true);
	// 	const data = await createQuestionService();

	// 	const id = data.id || {};

	// 	if (id) {
	// 		nav(`/question/edit/${id}`);
	// 		message.success('创建新问卷成功');
	// 	}
	// 	setLoading(false);
	// }

	const {
		run: handlerCreateClick,
		loading,
		error,
	} = useRequest(createQuestionService, {
		manual: true,
		onSuccess(result) {
			nav(`/question/edit/${result}`);
			message.success('创建新问卷成功');
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Space direction="vertical">
					<Button type="primary" size="large" icon={<PlusOutlined />} onClick={handlerCreateClick} disabled={loading}>
						新建问卷
					</Button>
					<Divider style={{ borderTop: 'transparent' }}></Divider>
					<Button
						type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
						size="large"
						icon={<BarsOutlined />}
						onClick={() => nav('/manage/list')}
					>
						我的问卷
					</Button>
					<Button
						type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
						size="large"
						icon={<StarOutlined />}
						onClick={() => nav('/manage/star')}
					>
						星标问卷
					</Button>
					<Button
						type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
						size="large"
						icon={<DeleteOutlined />}
						onClick={() => nav('/manage/trash')}
					>
						回收站
					</Button>
				</Space>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	);
};

export default ManageLayout;
