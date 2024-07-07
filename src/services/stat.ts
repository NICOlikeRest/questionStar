import axios, {ResDataType} from './ajax'

export async function getQuestionStatListService(
    questionId: string,
    opt: {page: number; pageSize: number}
): Promise<ResDataType> {
    const url = `/api/stat/${questionId}`;
    const data = (await axios.get(url, {params: opt})) as ResDataType;
    return data
}

// 获取组件统计数据总览
export async function getComponentStatService(questionId: string, componentId: string) {
    const url = `/api/stat/${questionId}/${componentId}`
    const data = (await axios.get(url)) as ResDataType;
    return data;
}