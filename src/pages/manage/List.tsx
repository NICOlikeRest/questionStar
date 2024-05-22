import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useDebounce, useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../../services/question';
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant';

const { Title } = Typography;

const List: FC = () => {
	useTitle('天哥问卷 - 我的问卷');

	const [page, setPage] = useState(0);
	const [list, setList] = useState([]);
	const [total, setTotal] = useState(0);
	// total是否超过了当前list，如有是，说明还有很多数据
	const haveMoreData = total > list.length;
	// 用于在加载时判断状态
	const [started, setStarted] = useState(false);
	// 储存当前路由参数
	const [searchParams] = useSearchParams();
	// 对应keyword的值
	const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

	// 真正加载
	const { run: load, loading } = useRequest(
		async () => {
			const data = await getQuestionListService({
				page,
				pageSize: LIST_PAGE_SIZE,
				keyword,
			});
			return data;
		},
		{
			manual: true,
			onSuccess(result) {
				const { list: l = [], total = 0 } = result;
				setList(list.concat(l));
				setPage(page + 1);
				setTotal(total);
			},
		}
	);

	// keyword变化时，重置信息
	useEffect(() => {
		setPage(1);
		setList([]);
		setTotal(0);
		setStarted(false);
	}, [keyword]);

	// 触发加载
	const containerRef = useRef<HTMLDivElement>(null);
	// 判断页面是否到底，到底加载更多
	const { run: tryLoadmore } = useDebounceFn(
		() => {
			const elem = containerRef.current;
			if (elem == null) return;
			const domRect = elem.getBoundingClientRect();
			if (domRect == null) return;
			const { bottom } = domRect;
			if (bottom <= document.body.clientHeight) {
				load();
				setStarted(true);
			}
		},
		{
			wait: 1000,
		}
	);

	// 当页面url或者是页面加载，触发加载
	useEffect(() => {
		tryLoadmore();
	}, [searchParams]);

	// 设置页面监听器，到底了调用`加载更多`
	useEffect(() => {
		if (haveMoreData) {
			window.addEventListener('scroll', tryLoadmore);
		}

		return () => {
			window.removeEventListener('scroll', tryLoadmore);
		};
	}, [searchParams, haveMoreData]);

	// loadmore elem： 用于判断LoadMore组件需要返回的组件
	const LoadMoreContentElem = () => {
		// 如果是加载中，显示spin
		if (loading) return <Spin></Spin>;
		// 没有数据，显示空数据
		if (started && total === 0) return <Empty />;
		// 页面滚动到最底下了，显示没有更多
		if (!haveMoreData) return <span>没有更多了。。。。</span>;
		// 显示加载更多时，的状态
		return <span>开始加载下一页</span>;
	};

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{/* 问卷列表 */}
				{list.length > 0 &&
					list.map((q: any) => {
						const { _id } = q;

						return <QuestionCard key={_id} {...q}></QuestionCard>;
					})}
			</div>
			<div className={styles.footer}>
				<div ref={containerRef}>{LoadMoreContentElem()}</div>
			</div>
		</>
	);
};

export default List;
