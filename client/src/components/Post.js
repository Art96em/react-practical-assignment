import { useState, memo } from "react"
import { useSelectorAuth } from "../redux/store";


const Post = memo(({ post, likeHandleClick, dislikeHandleClick, editPostHandleClick, deletePostHandleClick }) => {

    const username = useSelectorAuth();
    const [likes, setLikes] = useState(post.likes)
    const [dislikes, setDislikes] = useState(post.dislikes)

    return <div className="col-lg-12 col-md-6 col-sm-4 p-0">
        <div className="post">
            <div className="postAuthor text-bg-primary">
                <span>{post.username}</span>
            </div>
            <div className="postImage">
                <img src={post.image} alt="" />
            </div>
            <div className="postBody text-bg-info">
                <span>{post.title}</span>
            </div>
            <div className="postActions">
                <div className="postReactions text-center align-bottom p-2">
                    <div className={`postLike postReaction ${likes.includes(username) ? "clicked" : ""}`} onClick={() => {
                        likeHandleClick(post)
                            .then(res => {
                                setLikes(res.result.likes)
                                setDislikes(res.result.dislikes)
                            });
                    }}>
                        <div className="postReactionIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g fill="none" fill-rule="evenodd">
                                    <path d="M0 0h24v24H0z"></path>
                                    <path d="M8,10L8,20M8,10L4,9.99998L4,20L8,20M8,10L13.1956,3.93847C13.6886,3.3633 14.4642,3.11604 15.1992,3.29977L15.2467,3.31166C16.5885,3.64711 17.1929,5.21057 16.4258,6.36135L14,9.99998L18.5604,9.99998C19.8225,9.99998 20.7691,11.1546 20.5216,12.3922L19.3216,18.3922C19.1346,19.3271 18.3138,20 17.3604,20L8,20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="svg_1"></path>
                                </g>
                            </svg>
                        </div>
                        <div>
                            {likes.length}
                        </div>
                    </div>
                    <div className={`postLike postReaction ${dislikes.includes(username) ? "clicked" : ""}`} onClick={() => {
                        dislikeHandleClick(post)
                            .then(res => {
                                setLikes(res.result.likes)
                                setDislikes(res.result.dislikes)
                            });
                    }}>
                        <div className="postReactionIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g fill="none" fill-rule="evenodd">
                                    <path d="M0 0h24v24H0z"></path>
                                    <path d="M8,10L8,20M8,10L4,9.99998L4,20L8,20M8,10L13.1956,3.93847C13.6886,3.3633 14.4642,3.11604 15.1992,3.29977L15.2467,3.31166C16.5885,3.64711 17.1929,5.21057 16.4258,6.36135L14,9.99998L18.5604,9.99998C19.8225,9.99998 20.7691,11.1546 20.5216,12.3922L19.3216,18.3922C19.1346,19.3271 18.3138,20 17.3604,20L8,20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="svg_1" transform="rotate(-180 12.2806 11.62)"></path>
                                </g>
                            </svg>
                        </div>
                        <div>
                            {dislikes.length}
                        </div>
                    </div>
                </div>
                {username == post.username ? <div className="postActions align-bottom p-2">
                    <div className="postEditIcon postAction" onClick={() => editPostHandleClick(post)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M0 0h24v24H0z"></path>
                                <path d="M20.8477,1.87868C19.6761,0.70711 17.7766,0.7071 16.605,1.87868L2.44744,16.0363C2.02864,16.4551 1.74317,16.9885 1.62702,17.5692L1.03995,20.5046C0.76006,21.904 1.9939,23.1379 3.39334,22.858L6.32868,22.2709C6.90945,22.1548 7.44285,21.8693 7.86165,21.4505L22.0192,7.29289C23.1908,6.12132 23.1908,4.22183 22.0192,3.05025L20.8477,1.87868zM18.0192,3.29289C18.4098,2.90237 19.0429,2.90237 19.4335,3.29289L20.605,4.46447C20.9956,4.85499 20.9956,5.48815 20.605,5.87868L17.9334,8.55027L15.3477,5.96448L18.0192,3.29289zM13.9334,7.3787L3.86165,17.4505C3.72205,17.5901 3.6269,17.7679 3.58818,17.9615L3.00111,20.8968L5.93645,20.3097C6.13004,20.271 6.30784,20.1759 6.44744,20.0363L16.5192,9.96448L13.9334,7.3787z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" id="svg_2"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="postDeleteIcon postAction" onClick={() => deletePostHandleClick(post)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M10,11L10,17" stroke="#000000" stroke-width="2" stroke-linecap="round" id="svg_1"></path>
                                <path d="M14,11L14,17" stroke="#000000" stroke-width="2" stroke-linecap="round" id="svg_2"></path>
                                <path d="M4,7L20,7" stroke="#000000" stroke-width="2" stroke-linecap="round" id="svg_3"></path>
                                <path d="M6,7L12,7L18,7L18,18C18,19.6569 16.6569,21 15,21L9,21C7.34315,21 6,19.6569 6,18L6,7z" stroke="#000000" stroke-width="2" stroke-linecap="round" id="svg_4"></path>
                                <path d="M9,5C9,3.89543 9.89543,3 11,3L13,3C14.1046,3 15,3.89543 15,5L15,7L9,7L9,5z" stroke="#000000" stroke-width="2" stroke-linecap="round" id="svg_5"></path>
                            </g>
                        </svg>
                    </div>

                </div> : ''}
            </div>
            <div className="postComments">

            </div>
            <div className="postCommentInput">
                <div className="sendMessageInput mx-1 bot">
                    <input></input>
                </div>
                <div className="sendMessageIcon postAction clicked mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" fill-rule="evenodd">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.455,9.8834L7.063,4.1434C6.76535,3.96928 6.40109,3.95274 6.08888,4.09916C5.77667,4.24558 5.55647,4.53621 5.5,4.8764C5.5039,4.98942 5.53114,5.10041 5.58,5.2024L7.749,10.4424C7.85786,10.7903 7.91711,11.1519 7.925,11.5164C7.91714,11.8809 7.85789,12.2425 7.749,12.5904L5.58,17.8304C5.53114,17.9324 5.5039,18.0434 5.5,18.1564C5.55687,18.4961 5.77703,18.7862 6.0889,18.9323C6.40078,19.0785 6.76456,19.062 7.062,18.8884L18.455,13.1484C19.0903,12.8533 19.4967,12.2164 19.4967,11.5159C19.4967,10.8154 19.0903,10.1785 18.455,9.8834L18.455,9.8834z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="svg_1"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>


    </div >
})

export default Post