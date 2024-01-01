import { useState, memo, useRef, useCallback, useEffect } from "react"
import { useSelectorAuth } from "../../redux/store";
import PostComment from "./PostComment";
import PostsApi from "../../api/postsApi";
import { DeleteIcon, DislikeIcon, EditIcon, LikeIcon, SendIcon } from "../icons/icons";

const Post = memo(({ post, likeHandleClick, dislikeHandleClick, editPostHandleClick, deletePostHandleClick }) => {

    console.log('post render', post.id);

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

    const toggleIsExpanded = useCallback(() => setIsExpanded((isExpanded) => !isExpanded), []);

    const addComment = useCallback(async () => {
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
    }, [])

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
                            <LikeIcon />
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
                        <EditIcon width={24} height={24} />
                    </div>
                    <div className="postDeleteIcon postAction" onClick={() => deletePostHandleClick(post)}>
                        <DeleteIcon width={24} height={24} />
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
            <div className="postComments" style={{ height: isExpanded ? comments.length > 3 ? "273px" : `${comments.length * 91}px` : "0px" }}>
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
})

export default Post