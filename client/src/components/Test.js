import { useDispatch } from 'react-redux'
import { useSelectorAuth } from '../redux/store';

import { useEffect, useState } from 'react';
import { authActions } from '../redux/AuthSlice';
import Name from './Name';

const Test = () => {

    const [clicked, setClicked] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        console.log(data.length);
        const clickedCopy = new Array(data.length).fill(false);
        // const clickedCopy = Array.from({ length: data.length }, (val, idx) => false)
        setClicked(clickedCopy);
        console.log(clicked);
    }, []);



    return (
        <div>
            {users.map((user, idx) => {
                return <div className='name' key={idx} onClick={() => {
                    console.log('click ' + idx);
                    const clickedCopy = clicked;
                    clickedCopy[idx] = !clicked[idx]
                    setClicked(clickedCopy)
                    console.log(clicked);
                }}>
                    <Name name={user.name} clicked={clicked[idx]} key={idx} />
                </div>
            })}
        </div>
    );
}

export default Test