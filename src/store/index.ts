import { configureStore } from "@reduxjs/toolkit";
import UserReducer, { UserStateType } from "./UserReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import PageInfoReducer, { PageInfoType } from "./PageInfoReducer";
import undoable, { StateWithHistory, excludeAction } from "redux-undo";

export type StateType = {
    user: UserStateType,
    // components: ComponentsStateType
    components: StateWithHistory<ComponentsStateType>,
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: UserReducer,
        // 组件列表
        // components: componentsReducer,
        components: undoable(componentsReducer, {
            limit: 20,
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ])
        }),
        // 页面信息
        pageInfo: PageInfoReducer,
    }
})