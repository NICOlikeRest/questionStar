import { FC } from 'react';
import styles from './EditCanvas.module.scss';
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer';
import { getComponetConfByType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress';

type PropsType = {
	loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
	const { type, props } = componentInfo;
	const componetConf = getComponetConfByType(type);
	if (componetConf == null) return null;
	const { Component } = componetConf;
	return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: '24px' }}>
				<Spin />
			</div>
		);
	}
	// useBindCanvasKeyPress();

	const { componentList, selectedId } = useGetComponentInfo();

	const dispatch = useDispatch();

	function handleClick(event: React.MouseEvent<HTMLDivElement>, id: string) {
		event.stopPropagation();
		dispatch(changeSelectedId(id));
	}

	return (
		<div className={styles.canvas}>
			{componentList
				.filter((c) => !c.isHidden)
				.map((c) => {
					const { fe_id, isLocked } = c;

					const wrapperDefaultName = styles['component-wrapper'];
					const selectedClassName = styles.selected;
					const lockedClassName = styles.locked;
					const wrapperClassName = classNames({
						[wrapperDefaultName]: true,
						[selectedClassName]: fe_id === selectedId,
						[lockedClassName]: isLocked,
					});
					return (
						<div key={fe_id} className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
							<div className={styles.component}>{genComponent(c)}</div>
						</div>
					);
				})}
		</div>
	);
};

export default EditCanvas;
