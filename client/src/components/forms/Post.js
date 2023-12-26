import { useState, memo, useRef, useCallback, useEffect } from "react"
import { useSelectorAuth } from "../../redux/store";
import PostComment from "./PostComment";
import PostsApi from "../../api/postsApi";
import { DeleteIcon, DislikeIcon, EditIcon, LikeIcon, SendIcon } from "../icons/icons";

const Post = ({ post, likeHandleClick, dislikeHandleClick, editPostHandleClick, deletePostHandleClick }) => {

    console.log(post);

    const postsApi = new PostsApi();
    const username = useSelectorAuth();
    const commentInputRef = useRef(null);
    const options = { year: "numeric", month: "long", day: "numeric" }

    const [image, setImage] = useState(post.imageSrc)
    const [likes, setLikes] = useState(post.likes)
    const [dislikes, setDislikes] = useState(post.dislikes)
    const [comments, setComments] = useState(post.comments)
    const [isExpanded, setIsExpanded] = useState(false);
    const [date, setDate] = useState(new Date(+post.date))

    useEffect(() => {
        setImage(post.imageSrc)
        setDislikes(post.dislikes)
        setLikes(post.likes)
        setComments(post.comments)
        setDate(new Date(+post.date))
    }, [post])

    const toggleIsExpanded = useCallback(() => setIsExpanded((isExpanded) => !isExpanded), []);

    const addComment = async () => {
        const response = await postsApi.addComment({ text: commentInputRef.current.value, postId: post.id, username })
        if (response.success) {
            setComments(prevComments => {
                const newComments = prevComments.slice();
                newComments.push(response.result)
                return newComments
            })
            commentInputRef.current.value = ''
        } else {

        }
    }

    const deleteCommentClick = useCallback(async (id) => {
        const result = await postsApi.deleteComment(id)
        if (result.success) {
            setComments(prevComments => {
                const newComments = prevComments.filter(comment => comment.id != id)
                return newComments;
            })
        } else {

        }
    }, [])

    return <div className="col-xxl-4 col-lg-6 col-sm-12 mb-1 px-1">
        <div className="post bg-white">
            <div className="postAuthor mx-2 text-info">
                <p className="h4 m-0">{post.username}</p>
            </div>
            <div className="mx-2 color text-secondary">
                <p className="h6">{date.toLocaleDateString(undefined, options) + " " + date.toLocaleTimeString(options)}</p>
            </div>
            <div className="postBody m-2">
                <span>{post.title}</span>
            </div>
            {image && <div className="postImage px-2 ">
                <img className="w-100 rounded" src={image} />
            </div>}
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
                                <g fill="none" fillRule="evenodd">
                                    <path d="M0 0h24v24H0z"></path>
                                    <path d="M8,10L8,20M8,10L4,9.99998L4,20L8,20M8,10L13.1956,3.93847C13.6886,3.3633 14.4642,3.11604 15.1992,3.29977L15.2467,3.31166C16.5885,3.64711 17.1929,5.21057 16.4258,6.36135L14,9.99998L18.5604,9.99998C19.8225,9.99998 20.7691,11.1546 20.5216,12.3922L19.3216,18.3922C19.1346,19.3271 18.3138,20 17.3604,20L8,20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" id="svg_1"></path>
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
                            <DislikeIcon />
                        </div>
                        <div>
                            {dislikes.length}
                        </div>
                    </div>
                </div>
                {username == post.username ? <div className="d-flex align-bottom p-2">
                    <div className="postEditIcon postAction" onClick={() => editPostHandleClick(post)}>
                        <EditIcon />
                    </div>
                    <div className="postDeleteIcon postAction" onClick={() => deletePostHandleClick(post)}>
                        <DeleteIcon />
                    </div>

                </div> : ''}
            </div>
            <div className="border-top border-bottom bg-light py-1" key={`${post.username}-${post.date}`}>
                {comments.length > 0 ?
                    <button className="w-100 border-0 bg-light p-0" onClick={toggleIsExpanded}>{isExpanded ? "Hide comments" : `Show comments (${comments.length})`}</button>
                    :
                    <div className="w-100 text-center">No comments yet</div>
                }
            </div>
            <div className="col postComments" style={{ height: isExpanded ? comments.length > 3 ? "273px" : `${comments.length * 91}px` : "0px" }}>
                {comments.map(comment => <PostComment comment={comment} deleteCommentClick={deleteCommentClick} />)}
            </div>
            <div className="postCommentInput justify-content-between align-items-center">
                <div className="sendMessageInput mx-1">
                    <input ref={commentInputRef} type="text" />
                </div>
                <div className="sendMessageIcon postAction clicked" onClick={addComment}>
                    <SendIcon />
                </div>
            </div>
        </div>

    </div>
}

export default Post