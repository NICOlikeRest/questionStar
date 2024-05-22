import { Input } from 'antd';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const { Search } = Input;

const ListSearch: FC = () => {
	const nav = useNavigate();
	// 获取当前访问路径
	const { pathname } = useLocation();
	// keyword值	
	const [value, setValue] = useState('');
	// 如果url上有keyword，获取
	const [searchParams] = useSearchParams();

	// 动态绑定到input输入框中
	useEffect(() => {
		const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
		setValue(curVal);
	}, [searchParams]);

	// input回调
	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	}

	// search回调
	function searchHandler(value: string) {
		nav({
			pathname,
			search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
		});
	}

	return <Search placeholder="请输入关键词" value={value} onChange={changeHandler} onSearch={searchHandler} style={{ width: '200px' }} allowClear />;
};

export default ListSearch;
