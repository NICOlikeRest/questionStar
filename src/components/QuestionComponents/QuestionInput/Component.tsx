import { Input, Typography } from 'antd';
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface';
import { FC } from 'react';

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
	const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<Input placeholder={placeholder} />
			</div>
		</div>
	);
};

export default QuestionInput;
