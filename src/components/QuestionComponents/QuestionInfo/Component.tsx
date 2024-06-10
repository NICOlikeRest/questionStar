import { FC } from 'react';
import { QuestionInfoPropsType, QuestionDefaultProps } from './interface';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
	const { title, desc } = { ...QuestionDefaultProps, ...props };

	const descList = desc?.split('\n');

	return (
		<div style={{ textAlign: 'center' }}>
			<Title style={{ fontSize: '24px' }}>{title}</Title>
			<Paragraph>
				{descList?.map((t, index) => (
					<span key={index}>
						{index > 0 && <br />}
						{t}
					</span>
				))}
			</Paragraph>
		</div>
	);
};

export default Component;
