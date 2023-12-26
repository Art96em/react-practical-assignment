import { useDispatch } from "react-redux"
import { authActions } from "../../redux/AuthSlice";
import { useSelectorAuth } from "../../redux/store";
import { useEffect, useState, memo, useCallback, useRef } from "react";
import PostsApi from "../../api/postsApi";
import Post from "../forms/Post";
import Pagination from "../forms/Paginator";
import PostForm from "../forms/PostForm";
import DeletePostForm from "../forms/DeletePostForm";
import { PlusIcon } from "../icons/icons";

const Main = () => {

    const postsApi = new PostsApi();

    const selectedPost = useRef(null);

    const dispatch = useDispatch();
    const username = useSelectorAuth();
    let debounce;

    const [filterText, setFilterText] = useState('')
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editPostFormOpened, setEditPostFormOpened] = useState(false)
    const [deletePostFormOpened, setDeletePostFormOpened] = useState(false)

    useEffect(() => {
        let response;
        if (!!filterText) {
            response = postsApi.searchPosts(filterText)
        } else {
            response = postsApi.getPagePosts(currentPage);
        }
        response.then(data => {
            if (data.totalPages != totalPages) {
                setTotalPages(data.totalPages);
            }
            setPosts(data.result);
        })
        return () => setPosts([])
    }, [currentPage, filterText])

    const likeHandleClick = useCallback(async (post) => {
        const prevDislikes = post.dislikes;
        const prevLikes = post.likes;
        if (prevLikes.includes(username)) {
            prevLikes.splice(prevLikes.indexOf(username))
        } else {
            if (prevDislikes.includes(username)) {
                prevDislikes.splice(prevDislikes.indexOf(username))
            }
            prevLikes.push(username)
        }
        const postUpdated = { ...post, likes: prevLikes };
        const result = await postsApi.editPost(postUpdated);
        return result;
    }, [])

    const dislikeHandleClick = useCallback(async (post) => {
        const prevDislikes = post.dislikes;
        const prevLikes = post.likes;
        if (prevDislikes.includes(username)) {
            prevDislikes.splice(prevDislikes.indexOf(username))
        } else {
            if (prevLikes.includes(username)) {
                prevLikes.splice(prevLikes.indexOf(username))
            }
            prevDislikes.push(username)
        }
        const postUpdated = { ...post, dislikes: prevDislikes };
        const result = await postsApi.editPost(postUpdated);
        return result;
    }, [])

    const editPostHandleOpen = (post) => {
        selectedPost.current = post;
        setEditPostFormOpened(true)
    }

    const newPostHandleClick = () => {
        setEditPostFormOpened(true)
    }

    const postCloseHandleClick = () => {
        selectedPost.current = null;
        setEditPostFormOpened(false)
    }

    const deletePostHandleOpen = (post) => {
        selectedPost.current = post;
        setDeletePostFormOpened(true)
    }

    const deletePostHandleClose = () => {
        selectedPost.current = null;
        setDeletePostFormOpened(false)
    }

    const postConfirmHandle = async (title, imageSrc) => {
        let response = selectedPost.current != null ? await postsApi.editPost({ ...selectedPost.current, title }) : await postsApi.addPost({ title, username });
        if (response.success) {
            if (imageSrc && selectedPost.current.imageSrc != imageSrc) {
                const postId = response.result.id;
                response = await postsApi.addImage(postId, imageSrc);
            }
            setPosts(prevPosts => {
                let res;
                if (selectedPost.current != null) {
                    res = prevPosts.map(post => post.id == selectedPost.current.id ? { ...response.result, comments: post.comments } : post);
                } else {
                    prevPosts.push({ ...response.result, comments: [] })
                    res = prevPosts.slice();
                }
                return res;
            })

            setCurrentPage(prevCurrent => {
                return posts.length > 9 ? prevCurrent + 1 : prevCurrent;
            })

            postCloseHandleClick();
            // закинуть информацию popup об успехе
        } else {
            // закинуть информацию popup об неудаче с причиной
        }
    }

    const deletePostConfirmHandle = async () => {
        const response = await postsApi.deletePost(selectedPost.current.id)
        if (response.success) {
            deletePostHandleClose()
            let postsLength;
            setPosts(prevPosts => {
                const newPosts = prevPosts.filter(post => post.id != response.result.id)
                postsLength = newPosts.length;
                return newPosts
            })
            setCurrentPage(prevCurrent => {
                return !postsLength ? prevCurrent - 1 : prevCurrent;
            })
            // закинуть информацию popup об успехе
        } else {
            // закинуть информацию popup об неудаче с причиной
        }
    }

    const changePage = useCallback((pageNumber) => {
        if (pageNumber != currentPage) {
            setCurrentPage(pageNumber)
        }
    }, [setCurrentPage, currentPage])

    return <div>
        <header>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 header'>
                        <label>{username}</label>
                        <button className="logout-btn" onClick={() => dispatch(authActions.reset())}>Logout</button>
                    </div>
                </div>
            </div>
        </header>

        <section>
            <div className="container">
                <div className="row p-1 search">
                    <input className="rounded" placeholder="Search posts" onChange={(e) => {
                        if (debounce != null) {
                            clearTimeout(debounce)
                        }
                        debounce = setTimeout(() => setFilterText(e.target.value), 500)
                    }} />
                </div>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row">
                    {posts.map((post, idx) => <Post post={post} likeHandleClick={likeHandleClick} dislikeHandleClick={dislikeHandleClick} editPostHandleClick={editPostHandleOpen} deletePostHandleClick={deletePostHandleOpen} key={idx} />)}
                </div>
            </div>
        </section>

        <section>
            <div className="test">
                {totalPages && <Pagination props={{ currentPage, totalPages, changePage }} />}
            </div>
        </section>

        <section>
            {editPostFormOpened && <PostForm closeModalHandle={postCloseHandleClick} postConfirmHandle={postConfirmHandle} post={selectedPost} />}
            {deletePostFormOpened && <DeletePostForm closeModalHandle={deletePostHandleClose} deletePostConfirmHandle={deletePostConfirmHandle} />}
        </section>

        <footer>
            {!editPostFormOpened && <div className="addPost" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={newPostHandleClick}>
                <PlusIcon />
            </div>}
        </footer>
    </div >
}

export default Main