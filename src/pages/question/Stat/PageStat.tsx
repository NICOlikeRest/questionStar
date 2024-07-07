import { useRequest } from 'ahooks';
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionStatListService } from '../../../services/stat';
import { Pagination, Spin, Table, Typography } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { STAT_PAGE_SIZE } from '../../../constant';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const { Title } = Typography;

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, {
        page: page,
        pageSize: pageSize,
      });
      return res;
    },
    {
      refreshDeps: [page, pageSize, id],
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
    },
  );

  const { componentList } = useGetComponentInfo();

  const dataSource = list.map((item: any) => ({ ...item, key: item._id }));

  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c;
    const colTitle = props.title || title;

    return {
      title: (
        <div style={{ cursor: 'pointer' }} onClick={() => {
          setSelectedComponentId(fe_id)
          setSelectedComponentType(type)
        }}>
          {fe_id === selectedComponentId && (
            <span style={{ color: '#1890ff' }}>{colTitle}</span>
          )}
          {fe_id !== selectedComponentId && (
            <span style={{ color: 'inherit' }}>{colTitle}</span>
          )}
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  const TableElem = (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      ></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={() => {
            setPage(page);
            setPageSize(pageSize);
          }}
        ></Pagination>
      </div>
    </>
  );

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
};

export default PageStat;
