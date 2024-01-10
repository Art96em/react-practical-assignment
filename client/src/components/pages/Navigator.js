import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router"
import { useSelectorAuth } from "../../redux/store";
import { pages } from "../../util/util";

const Navigator = () => {

    const navigate = useNavigate();
    const userData = useSelectorAuth();

    useEffect(() => {
        navigate(!userData ? pages.LOGIN : pages.POSTS)
    }, [])

    return <>
        <Outlet></Outlet>
    </>
}

export default Navigator