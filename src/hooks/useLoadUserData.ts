import { useRequest, useSafeState } from "ahooks";
import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/UserReducer";


function useLoadUserData() {
    const [waitingUserData, setWaitingUserData] = useState(true);

    const dispatch = useDispatch();


    const {run} = useRequest(getUserInfoService,{
        manual: true,
        onSuccess(result) {
            const {username, nickname} = result;
            dispatch(loginReducer({username, nickname}))
        },
        onFinally() {
            setWaitingUserData(false)
        }
    });


    const {username} = useGetUserInfo();

    useEffect(()=>{
        if (username) {
            setWaitingUserData(false);
            return;
        }
        run();
    },[username])


    return {waitingUserData};

}
export default useLoadUserData;