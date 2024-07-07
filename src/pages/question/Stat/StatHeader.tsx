import { FC, useMemo, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, InputRef, Popover, Space, Tooltip, Typography, message } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import QRCode from 'qrcode.react'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()

  const { title, isPulished } = useGetPageInfo()

  const { id } = useParams()

  const urlInputRef = useRef<InputRef>(null)
  // 拷贝链接
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy')
    message.success('拷贝成功')
  }

  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPulished) return null
    const url = `http://localhost:3000/question/stat/${id}`

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [id, isPulished])

  return (
    <>
      <div className={styles['header-wrapper']}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Space>
              <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                返回
              </Button>
              <Title>{title}</Title>
            </Space>
          </div>
          <div className={styles.main}>{LinkAndQRCodeElem}</div>
          <div className={styles.right}>
            <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
              编辑问卷
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatHeader
