import { useState, useEffect } from "react";
import { getQuestionService } from "../services/question";
import { useParams } from 'react-router-dom';
import { useRequest } from "ahooks";


function useLoadQuestionData () {

    const { id = '' } = useParams();

	async function load () {
		const data = await getQuestionService(id);
		return data;
	}

	const {data, loading, error} = useRequest(load);

    return {data, loading, error};
}

export default useLoadQuestionData;