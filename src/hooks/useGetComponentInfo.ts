import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

// 自定义 hook
function useGetComponentInfo() {
    const components = useSelector((state: StateType) => state.components.present) as ComponentsStateType;

    // 非空判断
    const componentList = components?.componentList || [];
    const selectedId = components?.selectedId || "";

    const selectedComponent = componentList.find(c => c.fe_id === selectedId)
    const copiedComponent = components?.copiedComponent || null;

    return {
        componentList,
        selectedId,
        selectedComponent,
        copiedComponent
    }
}

export default useGetComponentInfo;