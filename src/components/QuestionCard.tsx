import React, { FC, useState } from 'react';
import styles from './QuestionCard.module.scss';
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { duplicateQuestionService, updateQuestionService } from '../services/question';

// { _id: 'q4', title: '问卷4', isPublised: true, isStar: true, answerCount: 35, createAt: '3月13日 13:23' },
type PropsType = {
	_id: string;
	title: string;
	isPublised: boolean;
	isStar: boolean;
	answerCount: number;
	createAt: string;
};

// 删除问卷需要用到模态框
const { confirm } = Modal;

const QuestionCard: FC<PropsType> = (props) => {
	const { _id, title, createAt, answerCount, isPublised, isStar } = props;
	const nav = useNavigate();

	// 修改标星
	const [isStarState, setIsStarState] = useState(isStar);
	// 删除的状态
	const [deleteState, setDeleteState] = useState(false);

	// 修改标星函数
	const { loading: changeStarLoading, run: changeStar } = useRequest(
		async () => {
			await updateQuestionService(_id, { isStar: !isStarState });
		},
		{
			manual: true,
			onSuccess() {
				setIsStarState(!isStarState);
				message.success('已更新');
			},
		}
	);

	// 复制问卷函数
	const { run: dupilicate, loading: dupilicateLoading } = useRequest(
		async () => {
			return await duplicateQuestionService(_id);
		},
		{
			manual: true,
			onSuccess(result: any) {
				message.success('复制成功');
				nav(`/question/edit/${result.id}`);
			},
		}
	);

	// 删除问卷函数
	const { run: deleteHandle, loading: deleteLoading } = useRequest(async () => updateQuestionService(_id, { isDeleted: true }), {
		manual: true,
		onSuccess() {
			setDeleteState(true);
		},
	});

	// 删除问卷弹框
	function delHandler() {
		confirm({
			title: '确定要删除这个问卷吗？',
			icon: <ExclamationCircleOutlined />,
			onOk: () => {
				deleteHandle();
				message.success('问卷删除成功');
			},
			okText: '确认',
			cancelText: '取消',
		});
	}
	// 卡片是否已经删除了，如果删除了的话，就不要让他再渲染了
	if (deleteState) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.left}>
					<Space>
						{isStarState && <StarOutlined style={{ color: 'red' }} />}
						<Link to={isPublised ? `/question/stat/${_id}` : `/question/edit/${_id}`}>{title}</Link>
					</Space>
				</div>
				<div className={styles.right}>
					<Space>
						{isPublised ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
						&nbsp; &nbsp;
						<span>答卷：{answerCount}</span>
						<span>{createAt}</span>
					</Space>
				</div>
			</div>
			<Divider style={{ margin: '12px' }}></Divider>
			<div className={styles['button-container']}>
				<div className={styles.left}>
					<Space>
						<Button icon={<EditOutlined />} type="text" size="small" onClick={() => nav(`/question/edit/${_id}`)}>
							编辑问卷
						</Button>
						<Button icon={<LineChartOutlined />} type="text" size="small" onClick={() => nav(`/question/stat/${_id}`)} disabled={!isPublised}>
							数据统计
						</Button>
					</Space>
				</div>
				<div className={styles.right}>
					<Space>
						<Button type="text" size="small" icon={<StarOutlined />} onClick={changeStar} disabled={changeStarLoading}>
							{isStarState ? '取消标星' : '标星'}
						</Button>
						<Popconfirm title="确定要复制该问卷吗？" okText="确认" cancelText="取消" onConfirm={dupilicate} disabled={dupilicateLoading}>
							<Button type="text" size="small" icon={<CopyOutlined />}>
								复制
							</Button>
						</Popconfirm>
						<Button type="text" size="small" icon={<DeleteOutlined />} onClick={delHandler} disabled={deleteLoading}>
							删除
						</Button>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
