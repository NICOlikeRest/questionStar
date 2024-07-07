import { PayloadAction,  createSlice, nanoid } from "@reduxjs/toolkit"
import { ComponentPropsType } from "../../components/QuestionComponents"
import {produce} from 'immer'
import { getNextSelectedId, insertNewComponent } from "./utils"
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from "@dnd-kit/sortable"


export type ComponentInfoType = {
    fe_id : string,
    type : string,
    title : string,
    isHidden?: boolean,
    isLocked?: boolean,
    props:ComponentPropsType
}

export type ComponentsStateType = {
    selectedId: string,
    componentList: Array<ComponentInfoType>
    copiedComponent: ComponentInfoType | null
} 

const INIT_STATE : ComponentsStateType = {
    selectedId: '',
    componentList: [],
    copiedComponent: null
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType> ) => {
            return action.payload
        },
        // 修改selectedId
        changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectedId = action.payload;
        }),
        // 添加新组件
        addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload;

            insertNewComponent(draft, newComponent)
        }),
        // 修改组件属性
        changeComponentProps: produce((draft: ComponentsStateType, action: PayloadAction<{fe_id: string, newProps: ComponentPropsType}>) => {
            const {fe_id, newProps} = action.payload;

            const curComp = draft.componentList.find(c => c.fe_id == fe_id)
            if (curComp) {
                curComp.props = {
                    ...curComp,
                    ...newProps
                }
            }
        }),
        // 删除选中的组件 
        removeSelectedComponent: produce((draft: ComponentsStateType) => {
            const {componentList=[], selectedId: removeId} = draft;

            const newSelectedId = getNextSelectedId(removeId, componentList);
            draft.selectedId = newSelectedId;

            const index = componentList.findIndex(c => c.fe_id === removeId)
            componentList.splice(index, 1)
        }),
        // 隐藏和显示组件
        changeComponentHidden: produce((draft: ComponentsStateType, action: PayloadAction<{fe_id: string, isHidden: boolean}>) => {
            const {componentList = []} = draft;
            const {fe_id, isHidden} = action.payload

            let newSelectedId = ''

            if (isHidden) {
                newSelectedId = getNextSelectedId(fe_id, componentList);
            } else {
                newSelectedId = fe_id
            }


            draft.selectedId = newSelectedId;

            const curComp = componentList.find(c => c.fe_id === fe_id)
            if (curComp) {
                curComp.isHidden = isHidden
            }
        }),
        toggleComponentLocked: produce(
            (draft: ComponentsStateType, aciton: PayloadAction<{fe_id: string}>) => {
                const {fe_id} = aciton.payload

                const curComp = draft.componentList.find(c => c.fe_id === fe_id)
                if (curComp) {
                    curComp.isLocked = !curComp.isLocked
                }
            }
        ),
        // 拷贝当前选中的组件
        copySelectedComponent: produce((draft: ComponentsStateType) => {
            const {selectedId, componentList = []} = draft;
            const selectedComponent = componentList.find(c => c.fe_id == selectedId)
            if (selectedComponent == null) return;
            draft.copiedComponent = cloneDeep(selectedComponent)
        }),
        // 粘贴组件
        pasteCopiedComponent: produce((draft: ComponentsStateType) => {
            const {copiedComponent} = draft;
            if (copiedComponent == null) return
            copiedComponent.fe_id = nanoid()

            insertNewComponent(draft, copiedComponent)
        }),
        // 选中上一个
        selectPrevComponent: produce(
            (draft: ComponentsStateType) => {
                const {selectedId, componentList} = draft;
                const selectedIndex = componentList.findIndex(c => c.fe_id == selectedId)

                if (selectedIndex < 0) return 
                if (selectedIndex <= 0) return
                
                draft.selectedId = componentList[selectedIndex - 1].fe_id
            }
        ),
        // 选中下一个
        selectNextComponent: produce(
            (draft: ComponentsStateType) => {
                const {selectedId, componentList} = draft;
                const selectedIndex = componentList.findIndex(c => c.fe_id == selectedId)

                if (selectedIndex < 0) return;
                if (selectedIndex + 1 === componentList.length) return;

                draft.selectedId = componentList[selectedIndex + 1].fe_id;
            }
        ),
        // 修改组件标题
        changeComponentTitle: produce(
            (draft: ComponentsStateType, action: PayloadAction<{fe_id:string; title: string}>) => {
                const {title, fe_id} = action.payload;
                const curComp = draft.componentList.find(c => c.fe_id === fe_id)
                if (curComp) curComp.title = title
            }
        ),
        // 移动组件位置
        moveComponent: produce(
            (draft: ComponentsStateType, action: PayloadAction<{oldIndex: number; newIndex: number}>) => {
                const {componentList: curComponentList} = draft;
                const {oldIndex, newIndex} = action.payload;
                draft.componentList  =arrayMove(curComponentList, oldIndex, newIndex);
            }
        )
    }
})

export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
    changeComponentHidden,
    toggleComponentLocked,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent,
    changeComponentTitle,
    moveComponent
} = componentsSlice.actions;

export default componentsSlice.reducer;