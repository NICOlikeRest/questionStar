/**
 * @description 加载问卷数据
 */
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from '../constant';
import { getQuestionListService } from '../services/question';

type OptionType = {
	isStar: boolean;
	isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
	const { isStar = false, isDeleted = false } = opt;

	const [searchParams] = useSearchParams();

	const { data, loading, error, refresh } = useRequest(
		async () => {
			// 获取路由信息信息中的参数设置
			const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
			const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
			const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

			const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize });

			return data;
		},
		{
			refreshDeps: [searchParams],
		}
	);
	return { data, loading, error, refresh };
}

export default useLoadQuestionListData;
