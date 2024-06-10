import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, {QuestionParagraphPropsType} from "./QuestionParagraph";
import QuestionInfoConf, {QuestionInfoPropsType} from "./QuestionInfo";
import QuestionTextareaConf, {QuestionTextareaPropsType} from "./QuestionTextarea";
import QuestionRadioConf, {QuestionRadioPropsType} from "./QuestionRadio";

// 各个组件的propstype
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType & QuestionParagraphPropsType & QuestionInfoPropsType & QuestionTextareaPropsType & QuestionRadioPropsType

// 各个组件的配置
export type ComponentConfType = {
    title: string,
    type: string,
    Component: FC<ComponentPropsType>,
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType,
}

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInfoConf,QuestionInputConf, QuestionTitleConf,QuestionParagraphConf,QuestionTextareaConf,QuestionRadioConf]

// 组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionInfoConf,QuestionTitleConf, QuestionParagraphConf],
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf,QuestionTextareaConf]
    },
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf]
    }
]

export function getComponetConfByType (type: string) {
    return componentConfList.find(c => c.type === type)
}