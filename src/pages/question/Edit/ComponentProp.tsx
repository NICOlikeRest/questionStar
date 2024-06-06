import { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentPropsType, getComponetConfByType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../../store/componentsReducer';

const NoProp: FC = () => {
	return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
	const { selectedComponent } = useGetComponentInfo();
	if (selectedComponent == null) return <NoProp />;

	const dispatch = useDispatch();

	const { type, props } = selectedComponent;
	const componentConf = getComponetConfByType(type);
	if (componentConf == null) return <NoProp />;

	function changeProps(newProps: ComponentPropsType) {
		console.log('newProps', newProps);
		if (selectedComponent == null) return;

		const { fe_id } = selectedComponent;
		dispatch(changeComponentProps({ fe_id, newProps }));
	}

	const { PropComponent } = componentConf;

	return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;
