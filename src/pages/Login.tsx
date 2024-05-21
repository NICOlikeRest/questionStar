import React, { FC, useEffect } from 'react';
import styles from './Login.module.scss';
import { Space, Typography, Form, Input, Button, Checkbox } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../router';
import { useForm } from 'antd/es/form/Form';
import { useRequest } from 'ahooks';


const { Title } = Typography;

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

function remeberUser(username: string, password: string) {
	localStorage.setItem(USERNAME_KEY, username);
	localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFormStorage() {
	localStorage.removeItem(USERNAME_KEY);
	localStorage.removeItem(PASSWORD_KEY);
}

function getUserForm() {
	return {
		username: localStorage.getItem(USERNAME_KEY),
		password: localStorage.getItem(PASSWORD_KEY),
	};
}

const Login: FC = () => {
	const [form] = Form.useForm();

	// const {run} = useRequest(
	// 	async 
	// )


	const onFinish = (value: any) => {
		const { username, password, remeber } = value || {};

		if (remeber) {
			remeberUser(username, password);
		} else {
			deleteUserFormStorage();
		}
	};
	useEffect(() => {
		const { username, password } = getUserForm();
		form.setFieldsValue({ username, password });
	}, []);

	return (
		<div className={styles.container}>
			<div>
				<Space>
					<Title level={2}>
						<UserAddOutlined />
					</Title>
					<Title level={2}>注册新用户</Title>
				</Space>
			</div>
			<div>
				<Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{ remeber: true }} form={form}>
					<Form.Item
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: '请输入用户名' },
							{ type: 'string', min: 5, max: 20, message: '用户名长度只能在5-20之间' },
							{ pattern: /^\w+$/, message: '只能是字母数字下划线' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 2, span: 20 }} name="remeber" valuePropName="checked">
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 2, span: 20 }}>
						<Space>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
							<Link to={REGISTER_PATHNAME}>没有账号？立刻注册</Link>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
