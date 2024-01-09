import { useCallback, useState } from "react"
import PostsApi from "../../api/postsApi";
import { useSelectorAuth } from "../../redux/store";
import { CheckIcon, DeleteIcon, EditIcon, MinusIcon, PlusIcon, XIcon } from "../icons/icons";
import { infoActions } from "../../redux/InfoSlice";
import { useDispatch } from "react-redux";
import { getDate } from "../../util/util";

const PostComment = ({ comment, deleteCommentClick }) => {

    const username = useSelectorAuth();
    const postsApi = new PostsApi();
    const dispatch = useDispatch();

    const [likes, setLikes] = useState(comment.likes)
    const [dislikes, setDislikes] = useState(comment.dislikes)
    const [commentText, setCommentText] = useState(comment.text)
    const [editMode, setEditMode] = useState(false)

    const date = new Date(+comment.date)
    const author = comment.username
    const rating = likes.length - dislikes.length

    const likeHandleClick = useCallback(async () => {
        const prevDislikes = comment.dislikes;
        const prevLikes = comment.likes;
        if (prevLikes.includes(username)) {
            prevLikes.splice(prevLikes.indexOf(username))
        } else {
            if (prevDislikes.includes(username)) {
                prevDislikes.splice(prevDislikes.indexOf(username))
            }
            prevLikes.push(username)
        }
        const commentUpdated = { ...comment, likes: prevLikes };
        const response = await postsApi.editComment(commentUpdated);
        setLikes(response.result.likes)
        setDislikes(response.result.dislikes)
        return response;
    }, [])

    const dislikeHandleClick = useCallback(async () => {
        const prevDislikes = comment.dislikes;
        const prevLikes = comment.likes;
        if (prevDislikes.includes(username)) {
            prevDislikes.splice(prevDislikes.indexOf(username))
        } else {
            if (prevLikes.includes(username)) {
                prevLikes.splice(prevLikes.indexOf(username))
            }
            prevDislikes.push(username)
        }
        const commentUpdated = { ...comment, dislikes: prevDislikes };
        const response = await postsApi.editComment(commentUpdated);
        setLikes(response.result.likes)
        setDislikes(response.result.dislikes)
        return response;
    }, [])

    const submitUpdateHandleClick = useCallback(async () => {
        const response = await postsApi.editComment({ ...comment, text: commentText });
        if (response.success) {
            dispatch(infoActions.setInfo({ text: 'Comment edited', type: 'success' }));
        } else {
            dispatch(infoActions.setInfo({ text: 'Erorr editing comment: ' + response.result, type: 'error' }));
        }
        setEditMode(prev => !prev)
    }, [])

    return <div className="postComment mx-2">
        <div className="postCommentHeader d-flex justify-content-between">
            <div className="postCommentAuthor text-info fw-bold">
                {author}
            </div>
            {comment.username == username &&
                <div className="postCommentActions">
                    {editMode ?
                        commentText != comment.text && <div className="postCommentAction mx-1" onClick={submitUpdateHandleClick}>
                            <CheckIcon />
                        </div>
                        :
                        <div className="postCommentAction mx-1" onClick={() => setEditMode(prev => !prev)}>
                            <EditIcon width={16} height={16} />
                        </div>
                    }
                    {editMode ?
                        <div className="postCommentAction mx-1" onClick={() => {
                            setCommentText(comment.text)
                            setEditMode(prev => !prev)
                        }}>
                            <XIcon width={16} height={16} />
                        </div>
                        :
                        <div className="postCommentAction mx-1" onClick={() => deleteCommentClick(comment.id)}>
                            <DeleteIcon width={16} height={16} />
                        </div>
                    }
                </div>
            }
        </div>

        <div className="postCommentText fs-5 mb-1">
            {editMode ? <input onChange={(e) => setCommentText(e.target.value)} value={commentText} /> : commentText}
        </div>

        <div className="postCommentFooter d-flex justify-content-between mb-2">
            <div className="postCommentTimestamp text-secondary">
                {getDate(date)}
            </div>
            <div className="commentActions text-center align-bottom">
                <div className={`commentAction commentLike h-100 ${likes.includes(username) ? 'clicked' : ''}`} onClick={likeHandleClick}>
                    <PlusIcon />
                </div>
                <div className="commentReactionsInfo">
                    {rating}
                </div>
                <div className={`commentAction commentDislike h-100 ${dislikes.includes(username) ? 'clicked' : ''}`} onClick={dislikeHandleClick}>
                    <MinusIcon />
                </div>
            </div>
        </div>

    </div>
}

export default PostComment