import { Input, Typography } from 'antd';
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './interface';
import { FC } from 'react';

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTexarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
	const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<TextArea placeholder={placeholder}></TextArea>
			</div>
		</div>
	);
};

export default QuestionTexarea;
