import { Input } from 'antd';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const { Search } = Input;

const ListSearch: FC = () => {
	const nav = useNavigate();
	const { pathname } = useLocation();
	const [value, setValue] = useState('');

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
		setValue(curVal);
	}, [searchParams]);

	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	}

	function searchHandler(value: string) {
		nav({
			pathname,
			search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
		});
	}

	return <Search placeholder="请输入关键词" value={value} onChange={changeHandler} onSearch={searchHandler} style={{ width: '200px' }} allowClear />;
};

export default ListSearch;
