import React, { FC, lazy, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import { Button, Result, Spin } from 'antd';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { MANAGE_INDEX_PATHNAME } from '../../../router';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import styles from './index.module.scss';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import PageStat from './PageStat';
import ChartStat from './ChartStat';

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();

  const { title, isPulished } = useGetPageInfo();

  const nav = useNavigate();

  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  console.log('selectedComponentId', selectedComponentId);

  useTitle(`问卷统计 - ${title}`);

  const LoadingElem = (
    <>
      <div style={{ textAlign: 'center', marginTop: '300px' }}>
        <Spin />
      </div>
    </>
  );

  function genContentElem() {
    if (typeof isPulished === 'boolean' && !isPulished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            subTitle="抱歉，您访问的页面不存在"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回上一页
              </Button>
            }
          ></Result>
        </div>
      );
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponetId={selectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
            setSelectedComponentId={setSelectedComponentId}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
            setSelectedComponentId={setSelectedComponentId}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <StatHeader />
        <div className={styles['content-wrapper']}>
          {loading && LoadingElem}
          {!loading && <div className={styles.content}>{genContentElem()}</div>}
        </div>
      </div>
    </>
  );
};

export default Stat;
