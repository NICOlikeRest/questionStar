import { Typography, Radio, Space } from 'antd';
import { FC } from 'react';
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface';

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
	const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props };

	return (
		<>
			<Paragraph strong>{title}</Paragraph>
			<Radio.Group value={value}>
				<Space direction={isVertical ? 'vertical' : 'horizontal'}>
					{options.map((opt) => {
						const { value, text } = opt;
						return (
							<Radio key={value} value={value}>
								{text}
							</Radio>
						);
					})}
				</Space>
			</Radio.Group>
		</>
	);
};

export default Component;
