import { useState, useEffect } from "react";
import { getQuestionService } from "../services/question";
import { useParams } from 'react-router-dom';
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";
import { resetPageInfo } from "../store/PageInfoReducer";


function useLoadQuestionData () {

    const { id = '' } = useParams();
	const dispatch = useDispatch();

	const {data, loading, error, run} = useRequest(
		async (id: string) => {
			if (!id) throw new Error('没有问卷 id')
			const data = await getQuestionService(id);
			return data
		},
		{
			manual: true
		}
	)

	useEffect(() => {
		if (!data) return;

		const {title = '', componentList = [], desc = "", js = "", css = "", isPulished = false} = data

		let selectedId = ''
		if (componentList.length > 0) {
			selectedId = componentList[0].fe_id
		}

		dispatch(resetComponents({componentList, selectedId, copiedComponent:null}))

		dispatch(resetPageInfo({title, desc, js, css, isPulished}))

	}, [data])

	useEffect(() => {
		run(id)
	}, [id])

	return {loading, error}
}

export default useLoadQuestionData;