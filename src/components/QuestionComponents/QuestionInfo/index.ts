import Component from "./Component";
import PropComponent from "./PropComponent";
import {QuestionDefaultProps, QuestionInfoPropsType} from './interface'

export * from './interface'

export default {
    title: '问卷信息',
    type: 'questionInfo',
    Component,
    PropComponent,
    defaultProps: QuestionDefaultProps
}