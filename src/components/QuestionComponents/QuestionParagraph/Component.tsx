import { FC } from 'react';
import { QuestionParagraphPropsType, QuesitonParagraphDefaultProps } from './interface';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
	const { text = '', isCenter = false } = { ...QuesitonParagraphDefaultProps, ...props };

	// const t = text.replace(/\n/g, '<br>');
	const textList = text.split('\n');

	return (
		<>
			<Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
				{textList.map((t, index) => (
					<span key={index}>
						{index > 0 && <br />}
						{t}
					</span>
				))}
			</Paragraph>
		</>
	);
};

export default Component;
