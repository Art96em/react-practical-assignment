import { useCallback, useEffect, useRef, useState } from "react"
import PostsApi from "../../api/postsApi";
import { useSelectorAuth } from "../../redux/store";
import PropTypes from 'prop-types'
import { CheckIcon, DeleteIcon, EditIcon, MinusIcon, PlusIcon, XIcon } from "../icons/icons";

function PostComment({ comment, deleteCommentClick }) {

    const username = useSelectorAuth();
    const postsApi = new PostsApi();

    const options = { year: "numeric", month: "long", day: "numeric" }

    const [likes, setLikes] = useState(comment.likes)
    const [dislikes, setDislikes] = useState(comment.dislikes)
    const [date, setDate] = useState(new Date(+comment.date))
    const [commentText, setCommentText] = useState(comment.text)
    const [editMode, setEditMode] = useState(false)
    const [author, setAuthor] = useState(comment.username)

    const rating = likes.length - dislikes.length

    useEffect(() => {
        setDislikes(comment.dislikes)
        setLikes(comment.likes)
        setDate(new Date(+comment.date))
        setAuthor(comment.username)
        setCommentText(comment.text)
    }, [comment])

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
        const result = await postsApi.editComment(commentUpdated);
        setLikes(result.result.likes)
        setDislikes(result.result.dislikes)
        return result;
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
        const result = await postsApi.editComment(commentUpdated);
        setLikes(result.result.likes)
        setDislikes(result.result.dislikes)
        return result;
    }, [])

    const submitUpdateHandleClick = useCallback(async () => {
        const result = await postsApi.editComment({ ...comment, text: commentText });
        if (result.success) {

        } else {

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
        {editMode ?
            <div className="postCommentText fs-5 mb-1">
                <input onChange={(e) => setCommentText(e.target.value)} value={commentText}></input>
            </div>
            :
            <div className="postCommentText fs-5 mb-1">
                {commentText}
            </div>
        }
        <div className="postCommentFooter mb-2">
            <div className="postCommentTimestamp text-secondary">
                {date.toLocaleDateString(undefined, options) + " " + date.toLocaleTimeString(options)}
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

// PostComment.propTypes = {
//     comment: PropTypes.arrayOf(PropTypes.shape({
//         text: PropTypes.string,
//         postId: PropTypes.number,
//         username: PropTypes.string,
//         likes: PropTypes.array,
//         dislikes: PropTypes.array,
//         date: PropTypes.number,
//     })),
//     deleteCommentClick: PropTypes.func
// }

// PostComment.defaultProps = {
//     comment: {
//         text: "test",
//         postId: 777,
//         username: "username",
//         likes: [],
//         dislikes: [],
//         date: 1234567,
//     },
//     deleteCommentClick: () => {console.log('delete')}
// }

export default PostComment