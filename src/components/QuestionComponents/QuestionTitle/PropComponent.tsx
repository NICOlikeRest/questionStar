import { FC, useEffect } from 'react';
import { QuestionTitlePropsType } from './interface';
import { Checkbox, Form, Input, Select } from 'antd';

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
	const { text, level, isCenter, onChange } = props;

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			text,
			level,
			isCenter,
		});
	}, [text, level, isCenter, form]);

	function handleValueChange() {
		if (onChange) {
			console.log('onchange', form.getFieldsValue());

			onChange(form.getFieldsValue());
		}
	}

	return (
		<Form layout="vertical" initialValues={{ text, level, isCenter }} onValuesChange={handleValueChange} form={form}>
			<Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题内容' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="层级" name="level">
				<Select
					options={[
						{ value: 1, label: 1 },
						{ value: 2, label: 2 },
						{ value: 3, label: 3 },
					]}
				></Select>
			</Form.Item>
			<Form.Item name="isCenter" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</Form.Item>
		</Form>
	);
};

export default PropComponent;