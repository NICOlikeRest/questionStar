import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { useRequest, useTitle } from 'ahooks';
import { Empty, Table, Typography, Tag, Space, Button, Modal, message, Spin } from 'antd';
import { DatabaseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';
import { deleteQuestionService, updateQuestionService } from '../../services/question';

const { Title } = Typography;

const { confirm } = Modal;

const Trash: FC = () => {
	// 获取垃圾箱里的数据，其中数据肯定isDeeleted为true
	const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });
	const { list = {}, total = 0 } = data;

	// 记录选中的ids
	const [selectedList, setSelectedList] = useState<string[]>([]);

	// 恢复
	const { run: recover } = useRequest(
		async () => {
			for await (const id of selectedList) {
				// 对每条选中的id，都进去相应的更新请求
				await updateQuestionService(id, { isDeleted: false });
			}
		},
		{
			manual: true,
			debounceWait: 500,
			onSuccess() {
				message.success('恢复成功 ');
				refresh(); // 手动刷新列表
				setSelectedList([]); // 恢复后对列表滞空
			},
		}
	);

	// 彻底删除
	const { run: deleteQueston } = useRequest(async () => await deleteQuestionService(selectedList), {
		manual: true,
		onSuccess() {
			message.success('删除成功');
			refresh();
			setSelectedList([]);
		},
	});

	// 删除文件模态框
	function delHandler() {
		confirm({
			title: '确定彻底删除该问卷吗？',
			icon: <ExclamationCircleOutlined />,
			okText: '确认',
			cancelText: '取消',
			onOk: deleteQueston,
		});
	}

	const tabelColum = [
		{
			title: '标题',
			dataIndex: 'title',
		},
		{
			title: '是否发布',
			dataIndex: 'isPublised',
			render: (isPublised: boolean) => {
				return isPublised ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>;
			},
		},
		{
			title: '答卷数量',
			dataIndex: 'answerCount',
		},
		{
			title: '创建日期',
			dataIndex: 'createdAt',
		},
	];

	const tableElm = (
		<>
			<div style={{ marginBottom: '16px' }}>
				<Space>
					<Button type="primary" disabled={selectedList.length === 0} onClick={recover}>
						恢复
					</Button>
					<Button danger disabled={selectedList.length === 0} onClick={delHandler}>
						删除
					</Button>
				</Space>
			</div>
			<Table
				dataSource={list}
				columns={tabelColum}
				pagination={false}
				rowKey={(q) => q._id}
				rowSelection={{
					type: 'checkbox',
					onChange: (selectedRowKey) => {
						setSelectedList(selectedRowKey as string[]);
					},
				}}
			/>
		</>
	);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
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
				{list.length > 0 && tableElm}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	);
};

export default Trash;
