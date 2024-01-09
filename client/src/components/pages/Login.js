import { useRef, useState } from "react"
import { useDispatch } from 'react-redux'
import { authActions } from "../../redux/AuthSlice";
import { useNavigate } from "react-router";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const usernameRef = useRef('')

    const [submitDisable, setSubmitDisable] = useState(true)

    const sumbitHandler = () => {
        dispatch(authActions.set(usernameRef.current.value))
        navigate('/posts')
    }

    return <div className="login">
        <div className="container h-100 d-flex flex-column justify-content-between">
            <div className="row">
                <div className="col-12 text-uppercase">
                    <h2 className="text-center">Login to Your Account</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="username">Username</label>
                    <input ref={usernameRef} type="text" autoComplete="off" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" onChange={() => setSubmitDisable(!!usernameRef.current.value ? false : true)} />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block mt-1" disabled={submitDisable} onClick={sumbitHandler}>Submit</button>
                </div>
            </div>
        </div>
    </div>
}

export default Login