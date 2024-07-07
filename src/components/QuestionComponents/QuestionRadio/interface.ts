export type OptionType = {
    value: string,
    text: string
}

export type QuestionRadioPropsType = {
    title?: string,
    isVertival?: boolean,
    options?: OptionType[],
    value?: string

    onChange?: (newProps: QuestionRadioPropsType) => void
    disabled?: boolean
} 

export const QuestionRadioDefaultProps = {
    title: '单选标题',
    isVertical: false,
    options: [
        {value: 'item1', text: '选项1'},
        {value: 'item2', text: '选项2'},
        {value: 'item3', text: '选项3'},
    ]
}

// 统计组件
export type QuestionRadioStatPropsType = {
    stat: Array<{name: string; count: number}>
}