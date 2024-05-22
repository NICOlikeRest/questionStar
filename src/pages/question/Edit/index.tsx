/**
 * id对应的问卷具体信息
 */
import React, { FC, useEffect, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Edit: FC = () => {
	const { loading, data } = useLoadQuestionData();

	return (
		<>
			<p>Edit page</p>
			{loading ? <p>Loading</p> : <p>{JSON.stringify(data)}</p>}
		</>
	);
};

export default Edit;
