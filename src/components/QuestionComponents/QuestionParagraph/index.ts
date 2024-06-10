import Component from "./Component";
import { QuesitonParagraphDefaultProps, QuestionParagraphPropsType } from "./interface";
import PropComponent from "./PropComponent";

export * from './interface'

export default {
    title: '段落',
    type: 'questionParagraph',
    Component,
    PropComponent,
    defaultProps: QuesitonParagraphDefaultProps
}