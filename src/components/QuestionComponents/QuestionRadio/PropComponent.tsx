import { FC, useEffect } from 'react';
import { OptionType, QuestionRadioPropsType } from './interface';
import { Checkbox, Form, Input, Select, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
	const { title, isVertival, value, options, onChange, disabled } = props;
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({ title, isVertival, value, options });
	}, [title, isVertival, value, options]);

	function handleValuesChange() {
		if (onChange == null) return;
		const newValues = form.getFieldsValue() as QuestionRadioPropsType;

		const { options = [] } = newValues;
		console.log('new', newValues);

		options.forEach((opt) => {
			if (opt.value) return;
			opt.value = nanoid(5);
		});
		onChange(newValues);
	}
	return (
		<Form layout="vertical" initialValues={{ title, isVertival, value, options }} onValuesChange={handleValuesChange} disabled={disabled} form={form}>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name }, index) => (
								<Space key={key} align="baseline">
									<Form.Item
										name={[name, 'text']}
										rules={[
											{ required: true, message: '请输入选项文字' },
											{
												validator: (_, text) => {
													const { options = [] } = form.getFieldsValue();

													let num = 0;
													options.forEach((opt: OptionType) => {
														if (opt.text === text) num++;
													});
													if (num === 1) return Promise.resolve();
													return Promise.reject(new Error('和其他选项重复了'));
												},
											},
										]}
									>
										<Input placeholder="请输入选项文字" />
									</Form.Item>
									{index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
								</Space>
							))}
							<Form.Item>
								<Button type="link" icon={<PlusOutlined />} onClick={() => add({ text: '', value: '' })} block>
									添加选项
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form.Item>
			<Form.Item label="默认选中" name="value">
				<Select value={value} options={options?.map(({ text, value }) => ({ value, label: text || '' }))}></Select>
			</Form.Item>
			<Form.Item name="isVertival" valuePropName="checked">
				<Checkbox>垂直显示</Checkbox>
			</Form.Item>
		</Form>
	);
};

export default PropComponent;
