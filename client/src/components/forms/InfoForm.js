import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useSelectorInfo } from "../../redux/store";
import { infoActions } from "../../redux/InfoSlice";

const colors = {
    info: 'bg-info',
    error: 'bg-danger',
    success: 'bg-success'
}

const InfoForm = () => {

    const dispatch = useDispatch();
    const info = useSelectorInfo();

    const [show, setShow] = useState(false)

    const closeInfo = () => {
        setShow(false)
    }

    useEffect(() => {
        setShow(!!info.text)
        if (!!info.text) {
            setTimeout(() => {
                dispatch(infoActions.dropInfo());
                closeInfo()
            }, 5000)
        }
    }, [info])

    return <div className={`toast ${show && "show"} info ${colors[info.type]}`}>
        <div className="d-flex">
            <div className="toast-body text-light">
                {info.text}
            </div>
            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={closeInfo}></button>
        </div>
    </div>
}

export default InfoForm