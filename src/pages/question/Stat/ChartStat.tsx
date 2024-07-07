import { useRequest } from 'ahooks'
import { Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import { getComponentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { getComponetConfByType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props

  const { id = '' } = useParams()

  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
        console.log(stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>

    const { StatComponent } = getComponetConfByType(selectedComponentType) || {}

    if (StatComponent == null) return <div>该组件无统计图标</div>

    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={3}>图标统计</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
