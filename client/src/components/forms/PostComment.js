import { useCallback, useEffect, useRef, useState } from "react"
import PostsApi from "../../api/postsApi";
import { useSelectorAuth } from "../../redux/store";
import PropTypes from 'prop-types'

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
    }, [commentText])

    return <div className="postComment mx-2">
        <div className="postCommentHeader d-flex justify-content-between">
            <div className="postCommentAuthor text-info fw-bold">
                {author}
            </div>
            {comment.username == username ?
                <div className="postCommentActions">
                    {editMode ?
                        commentText == comment.text ?
                            ''
                            :
                            <div className="postCommentAction mx-1" onClick={submitUpdateHandleClick}>
                                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        :
                        <div className="postCommentAction mx-1" onClick={() => setEditMode(prev => !prev)}>
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    }
                    {editMode ?
                        <div className="postCommentAction mx-1" onClick={() => {
                            setCommentText(comment.text)
                            setEditMode(prev => !prev)
                        }}>
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6L18 18M18 6L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        :
                        <div className="postCommentAction mx-1" onClick={() => deleteCommentClick(comment.id)}>
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    }
                </div>
                :
                ""
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
                <div className={`commentAction commentLike ${likes.includes(username) ? 'clicked' : ''}`} onClick={likeHandleClick}>
                    <div className="commentIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd">
                                <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="commentReactionsInfo">
                    {rating}
                </div>
                <div className={`commentAction commentDislike ${dislikes.includes(username) ? 'clicked' : ''}`} onClick={dislikeHandleClick}>
                    <div className="commentIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd">
                                <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </div>
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