export const PlusIcon = (props) => {
    return <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
        <path d="M6 12H18M12 6V18" stroke={`${props.color ? props.color : "black"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}

export const MinusIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
            <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
}

export const DislikeIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
            <path d="M0 0h24v24H0z"></path>
            <path d="M8,10L8,20M8,10L4,9.99998L4,20L8,20M8,10L13.1956,3.93847C13.6886,3.3633 14.4642,3.11604 15.1992,3.29977L15.2467,3.31166C16.5885,3.64711 17.1929,5.21057 16.4258,6.36135L14,9.99998L18.5604,9.99998C19.8225,9.99998 20.7691,11.1546 20.5216,12.3922L19.3216,18.3922C19.1346,19.3271 18.3138,20 17.3604,20L8,20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" id="svg_1" transform="rotate(-180 12.2806 11.62)"></path>
        </g>
    </svg>
}

export const LikeIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
            <path d="M0 0h24v24H0z"></path>
            <path d="M8,10L8,20M8,10L4,9.99998L4,20L8,20M8,10L13.1956,3.93847C13.6886,3.3633 14.4642,3.11604 15.1992,3.29977L15.2467,3.31166C16.5885,3.64711 17.1929,5.21057 16.4258,6.36135L14,9.99998L18.5604,9.99998C19.8225,9.99998 20.7691,11.1546 20.5216,12.3922L19.3216,18.3922C19.1346,19.3271 18.3138,20 17.3604,20L8,20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" id="svg_1"></path>
        </g>
    </svg>
}

// export const EditIcon = () => {
//     return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//         <g fill="none" fillRule="evenodd">
//             <path d="M0 0h24v24H0z"></path>
//             <path d="M20.8477,1.87868C19.6761,0.70711 17.7766,0.7071 16.605,1.87868L2.44744,16.0363C2.02864,16.4551 1.74317,16.9885 1.62702,17.5692L1.03995,20.5046C0.76006,21.904 1.9939,23.1379 3.39334,22.858L6.32868,22.2709C6.90945,22.1548 7.44285,21.8693 7.86165,21.4505L22.0192,7.29289C23.1908,6.12132 23.1908,4.22183 22.0192,3.05025L20.8477,1.87868zM18.0192,3.29289C18.4098,2.90237 19.0429,2.90237 19.4335,3.29289L20.605,4.46447C20.9956,4.85499 20.9956,5.48815 20.605,5.87868L17.9334,8.55027L15.3477,5.96448L18.0192,3.29289zM13.9334,7.3787L3.86165,17.4505C3.72205,17.5901 3.6269,17.7679 3.58818,17.9615L3.00111,20.8968L5.93645,20.3097C6.13004,20.271 6.30784,20.1759 6.44744,20.0363L16.5192,9.96448L13.9334,7.3787z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" id="svg_2"></path>
//         </g>
//     </svg>
// }

export const DeleteIcon = (props) => {
    // return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    //     <g fill="none" fillRule="evenodd">
    //         <path d="M10,11L10,17" stroke="#000000" strokeWidth="2" strokeLinecap="round" id="svg_1"></path>
    //         <path d="M14,11L14,17" stroke="#000000" strokeWidth="2" strokeLinecap="round" id="svg_2"></path>
    //         <path d="M4,7L20,7" stroke="#000000" strokeWidth="2" strokeLinecap="round" id="svg_3"></path>
    //         <path d="M6,7L12,7L18,7L18,18C18,19.6569 16.6569,21 15,21L9,21C7.34315,21 6,19.6569 6,18L6,7z" stroke="#000000" strokeWidth="2" strokeLinecap="round" id="svg_4"></path>
    //         <path d="M9,5C9,3.89543 9.89543,3 11,3L13,3C14.1046,3 15,3.89543 15,5L15,7L9,7L9,5z" stroke="#000000" strokeWidth="2" strokeLinecap="round" id="svg_5"></path>
    //     </g>
    // </svg>
    return <svg width={`${props.width}px`} height={`${props.height}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}

export const SendIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
            <path fillRule="evenodd" d="M18.455,9.8834L7.063,4.1434C6.76535,3.96928 6.40109,3.95274 6.08888,4.09916C5.77667,4.24558 5.55647,4.53621 5.5,4.8764C5.5039,4.98942 5.53114,5.10041 5.58,5.2024L7.749,10.4424C7.85786,10.7903 7.91711,11.1519 7.925,11.5164C7.91714,11.8809 7.85789,12.2425 7.749,12.5904L5.58,17.8304C5.53114,17.9324 5.5039,18.0434 5.5,18.1564C5.55687,18.4961 5.77703,18.7862 6.0889,18.9323C6.40078,19.0785 6.76456,19.062 7.062,18.8884L18.455,13.1484C19.0903,12.8533 19.4967,12.2164 19.4967,11.5159C19.4967,10.8154 19.0903,10.1785 18.455,9.8834L18.455,9.8834z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" id="svg_1"></path>
        </g>
    </svg>
}

export const CheckIcon = () => {
    return <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}

export const EditIcon = (props) => {
    return <svg width={`${props.width}px`} height={`${props.height}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}

export const XIcon = (props) => {
    return <svg width={`${props.width}px`} height={`${props.height}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6L18 18M18 6L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}

export const LogoutIcon = () => {
    return <svg fill="#000000" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"></path>
    </svg>
}