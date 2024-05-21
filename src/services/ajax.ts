import { message } from "antd";
import axios from "axios";
import { getToKen } from "../utils/user-token";

const instance = axios.create({
    timeout: 10 * 1000
})

// requetion 拦截： 每次请求都带上 token
instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${getToKen()}`
        return config;
    },
    error => Promise.reject(error)
)


// 添加拦截器
instance.interceptors.response.use (res => {
    const resData = (res.data || {}) as ResType
    const {errno, data, msg} = resData
    

    if (errno !== 0) {
        if (msg) {
            message.error(msg)
        }

        throw new Error(msg)
    }

    return data as any;
})


export default instance;


export type ResType = {
    errno: number,
    data?: ResDataType,
    msg?: string
}

export type ResDataType = {
    [key: string]: any
}