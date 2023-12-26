import { useState } from "react"
import { useDispatch } from 'react-redux'
import { authActions } from "../../redux/AuthSlice";

const Login = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');

    const sumbitHandler = (event) => {
        event.preventDefault();
        dispatch(authActions.set(username))
    }

    return <div className="container">
        <div className="row">
            <div className="col-12 text-uppercase">
                <h2 className="text-center">login page</h2>
            </div>
        </div>
        <form onSubmit={sumbitHandler}>
            <div className="form-group">
                <label for="username">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" value={username} onChange={(t) => setUsername(t.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-1" disabled={!username}>Submit</button>
        </form>
    </div>
}

export default Login