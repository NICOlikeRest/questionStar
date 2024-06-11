import { Checkbox, Space, Typography } from 'antd';
import { FC } from 'react';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';

const { Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
	const { title, isVertival, list = [] } = { ...QuestionCheckboxDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Space direction={isVertival ? 'vertical' : 'horizontal'}>
				{list.map((opt) => {
					const { value, text, checked } = opt;
					return (
						<Checkbox key={value} value={value} checked={checked}>
							{text}
						</Checkbox>
					);
				})}
			</Space>
		</div>
	);
};

export default Component;
