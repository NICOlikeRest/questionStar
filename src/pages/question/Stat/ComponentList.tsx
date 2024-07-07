import { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import styles from './ComponentList.module.scss';
import { getComponetConfByType } from '../../../components/QuestionComponents';
import classNames from 'classnames';

type PropsType = {
  selectedComponetId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = props => {
  const {
    selectedComponetId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { componentList } = useGetComponentInfo();

  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, props, type } = c;

          const componentConf = getComponetConfByType(type);
          if (componentConf == null) return null;

          const { Component } = componentConf;

          // 拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponetId, // 是否选中
          });

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...props}></Component>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
