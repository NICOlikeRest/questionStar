/**
 * id对应的问卷具体信息
 */
import React, { FC, useEffect, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/componentsReducer';
import LeftPannel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress';

const Edit: FC = () => {
	const { loading } = useLoadQuestionData();

	const dispatch = useDispatch();

	function clearSelectedId() {
		dispatch(changeSelectedId(''));
	}
	useBindCanvasKeyPress();

	return (
		<>
			<div className={styles.container}>
				<EditHeader />
				<div className={styles['container-wrapper']}>
					<div className={styles.content}>
						<div className={styles.left}>
							<LeftPannel />
						</div>
						<div className={styles.main} onClick={clearSelectedId}>
							<div className={styles['canvas-wrapper']}>
								<EditCanvas loading={loading} />
							</div>
						</div>
						<div className={styles.right}>
							<RightPanel />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
