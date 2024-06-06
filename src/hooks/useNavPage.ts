import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import { useEffect } from "react";
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, isLoginOrRegister, isNoNeedUserInfo } from "../router";


function useNavPage(waitingUserData: boolean) {

    const {username} = useGetUserInfo();
    const {pathname} = useLocation();

    const nav = useNavigate();

    useEffect(()=>{
        if (waitingUserData) return;

        // 已登录
        if(username) {
            if(isLoginOrRegister(pathname)) {
                nav(MANAGE_INDEX_PATHNAME)
            }
        }

        // 未登录
        if (isNoNeedUserInfo(pathname)) {
            return
        } else {
            console.log(isNoNeedUserInfo(pathname));
            
            // nav(LOGIN_PATHNAME)
        }


    },[waitingUserData,username, pathname])


}
export default useNavPage;