import { useState } from "react"
import { useSelectorAuth } from "../redux/store";


const Post = ({ post, likeHandleClick, dislikeHandleClick }) => {

    const userData = useSelectorAuth();
    const [likes, setLikes] = useState(post.likes)
    const [dislikes, setDislikes] = useState(post.dislikes)

    return <div className="col-lg-12 col-md-6 col-sm-4 p-0">
        <div className="post">
            <div className="postAuthor text-bg-primary">
                <span>{post.username}</span>
            </div>
            <div className="postImage">
                <img src="" alt="" />
            </div>
            <div className="postBody text-bg-info">
                <span>{post.title}</span>
            </div>
            <div className="postReractions text-center align-bottom p-2">
                <div className={`postLike postReraction ${likes.includes(userData) ? "clicked" : ""}`} onClick={() => {
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
                <div className={`postLike postReraction ${dislikes.includes(userData) ? "clicked" : ""}`} onClick={() => {
                    dislikeHandleClick(post)
                        .then(res => {
                            console.log(res);
                            setLikes(res.result.likes)
                            setDislikes(res.result.dislikes)
                        });
                }}>
                    <div className="postReactionIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" id="svgcontent" x="298" y="699">
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
        </div>


    </div>
}

export default Post