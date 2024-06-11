import Component from "./Componenet";
import PropComponent from "./PropComponent";
import { QuestionCheckboxDefaultProps } from "./interface";

export * from './interface'

export default {
    title: '多选',
    type: 'questionCheckbox',
    Component,
    PropComponent,
    defaultProps: QuestionCheckboxDefaultProps
}