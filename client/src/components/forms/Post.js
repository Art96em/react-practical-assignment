import { useState, useRef, useCallback } from "react"
import { useSelectorAuth } from "../../redux/store";
import PostComment from "./PostComment";
import PostsApi from "../../api/postsApi";
import { DeleteIcon, DislikeIcon, EditIcon, LikeIcon, SendIcon } from "../icons/icons";
import { infoActions } from "../../redux/InfoSlice";
import { useDispatch } from "react-redux";
import { getDate } from "../../util/util";

const Post = ({ post, likeHandleClick, dislikeHandleClick, editPostHandleClick, deletePostHandleClick }) => {

    const dispatch = useDispatch()
    const postsApi = new PostsApi();
    const username = useSelectorAuth();
    const commentInputRef = useRef(null);

    const image = post.imageSrc
    const date = new Date(+post.date)
    const [likes, setLikes] = useState(post.likes)
    const [dislikes, setDislikes] = useState(post.dislikes)
    const [comments, setComments] = useState(post.comments)
    const [isExpanded, setIsExpanded] = useState(false);

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
            dispatch(infoActions.setInfo({ text: 'Comment added', type: 'success' }));
        } else {
            dispatch(infoActions.setInfo({ text: 'Erorr adding comment: ' + response.result, type: 'error' }));
        }
    }, [])

    const deleteCommentClick = useCallback(async (id) => {
        const response = await postsApi.deleteComment(id)
        if (response.success) {
            setComments(prevComments => {
                const newComments = prevComments.filter(comment => comment.id != id)
                return newComments;
            })
            dispatch(infoActions.setInfo({ text: 'Comment deleted', type: 'success' }));
        } else {
            dispatch(infoActions.setInfo({ text: 'Erorr deleting comment: ' + response.result, type: 'error' }));
        }
    }, [])

    return <div className="col-xxl-4 col-lg-6 col-sm-12 mb-1 px-1">
        <div className="post bg-white">
            <div className="postAuthor mx-2 text-info">
                <p className="h4 m-0">{post.username}</p>
            </div>
            <div className="mx-2 color text-secondary">
                <p className="h6">{getDate(date)}</p>
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
                        <div>
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
                        <div>
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
                {comments.map(comment => <PostComment comment={comment} deleteCommentClick={deleteCommentClick} key={comment.id} />)}
            </div>
            <div className="d-flex justify-content-between align-items-center">
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