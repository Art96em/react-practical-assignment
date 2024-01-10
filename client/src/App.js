import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/pages/Login';
import { useSelectorAuth } from './redux/store';
import Main from './components/pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Navigator from './components/pages/Navigator';
import { pages } from './util/util';

function App() {

    const userData = useSelectorAuth();

    useEffect(() => {
        // TEST API, it might be removed
        fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
            console.log('API CONNECTION IS OK');
        }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
    }, []);

    return (
        <div className="App bg-secondary bg-opacity-25">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigator />}>
                        {!userData && <Route path={pages.LOGIN} element={<Login />} />}
                        {userData && <Route path={pages.POSTS} element={<Main />} />}
                        <Route path="/*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
