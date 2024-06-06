import { configureStore } from "@reduxjs/toolkit";
import UserReducer, { UserStateType } from "./UserReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";

export type StateType = {
    user: UserStateType,
    components: ComponentsStateType
}

export default configureStore({
    reducer: {
        user: UserReducer,
        // 组件列表
        components: componentsReducer,
    }
})