import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Test from './components/Test';
import Login from './pages/Login';
import { useSelectorAuth } from './redux/store';
import Main from './pages/Main';

function App() {

    const userData = useSelectorAuth();

    useEffect(() => {
        // TEST API, it might be removed
        fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
            console.log('API CONNECTION IS OK');
        }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
    }, []);

    return (
        <div className="App">
            {/* <Test /> */}
            {!userData ? <Login /> : <Main />}
        </div>
    );
}

export default App;
