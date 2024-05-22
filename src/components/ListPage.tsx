import { Pagination } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
	total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
	// 获取props传过来的total
	const { total } = props;
	// 当前页为1
	const [current, setCurrent] = useState(1);
	const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
	const [searchParmas, setSearchParams] = useSearchParams();
	const nav = useNavigate();
	const { pathname } = useLocation();

	// 从路由参数这里获取对应的page和pageSize
	useEffect(() => {
		const page = parseInt(searchParmas.get(LIST_PAGE_PARAM_KEY) || '') || 1;
		setCurrent(page);
		const pageSize = parseInt(searchParmas.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
		setPageSize(pageSize);
	}, [searchParmas]);


	// 当page pageSize 变化 跳转页面
	function handlePageChange(page: number, pageSize: number) {
		searchParmas.set(LIST_PAGE_PARAM_KEY, page.toString());
		searchParmas.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
		nav({
			pathname,
			search: searchParmas.toString(),
		});
	}

	return <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />;
};

export default ListPage;
