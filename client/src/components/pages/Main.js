import { useDispatch } from "react-redux"
import { authActions } from "../../redux/AuthSlice";
import { paginationActions } from "../../redux/PaginationSlice";
import { useSelectorAuth, useSelectorPaginatorCurrent, useSelectorPaginatorTotal } from "../../redux/store";
import { useEffect, useState, useCallback, useRef } from "react";
import PostsApi from "../../api/postsApi";
import Post from "../forms/Post";
import Pagination from "../forms/Paginator";
import PostForm from "../forms/PostForm";
import DeletePostForm from "../forms/DeletePostForm";
import { LogoutIcon, PlusIcon } from "../icons/icons";
import InfoForm from "../forms/InfoForm";
import { infoActions } from "../../redux/InfoSlice";
import { useNavigate } from "react-router";

const Main = () => {

    const postsApi = new PostsApi();

    const selectedPost = useRef(null);

    const dispatch = useDispatch();
    const username = useSelectorAuth();
    const currentPage = useSelectorPaginatorCurrent();
    const totalPages = useSelectorPaginatorTotal();
    const navigate = useNavigate()

    let debounce;

    const [filterText, setFilterText] = useState('')
    const [posts, setPosts] = useState([]);
    const [editPostFormOpened, setEditPostFormOpened] = useState(false)
    const [deletePostFormOpened, setDeletePostFormOpened] = useState(false)

    useEffect(() => {
        let response = !!filterText ? postsApi.searchPosts(filterText) : postsApi.getPagePosts(currentPage);
        response.then(data => {
            if (data.totalPages != totalPages) {
                dispatch(paginationActions.setTotalPages(!!data.totalPages ? +data.totalPages : 1))
            }
            setPosts(data.result);
        })
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

    const editPostHandleOpen = useCallback((post) => {
        selectedPost.current = post;
        setEditPostFormOpened(true)
    }, [])

    const newPostHandleClick = useCallback(() => {
        setEditPostFormOpened(true)
    }, [])

    const postCloseHandleClick = useCallback(() => {
        selectedPost.current = null;
        setEditPostFormOpened(false)
    }, [])

    const deletePostHandleOpen = useCallback((post) => {
        selectedPost.current = post;
        setDeletePostFormOpened(true)
    }, [])

    const deletePostHandleClose = useCallback(() => {
        selectedPost.current = null;
        setDeletePostFormOpened(false)
    }, [])

    const handleLogout = () => {
        dispatch(authActions.reset())
        navigate('/')
    }

    const postConfirmHandle = useCallback(async (title, imageSrc) => {
        let response = selectedPost.current != null ? await postsApi.editPost({ ...selectedPost.current, title }) : await postsApi.addPost({ title, username });
        if (response.success) {
            if (imageSrc && selectedPost.current?.imageSrc != imageSrc) {
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
            if (posts.length > 9) {
                dispatch(paginationActions.setCurrentPage(currentPage + 1))
            }
            postCloseHandleClick();
            dispatch(infoActions.setInfo({ text: 'Post added', type: 'success' }));
        } else {
            dispatch(infoActions.setInfo({ text: 'Erorr adding post: ' + response.result, type: 'error' }));
        }
    }, [])

    const deletePostConfirmHandle = useCallback(async () => {
        const response = await postsApi.deletePost(selectedPost.current.id)
        if (response.success) {
            deletePostHandleClose()
            let postsLength;
            setPosts(prevPosts => {
                const newPosts = prevPosts.filter(post => post.id != response.result.id)
                postsLength = newPosts.length;
                return newPosts
            })
            if (!postsLength) {
                dispatch(paginationActions.setCurrentPage(currentPage - 1))
            }
            dispatch(infoActions.setInfo({ text: 'Post deleted', type: 'success' }));
        } else {
            dispatch(infoActions.setInfo({ text: 'Erorr deleting post: ' + response.result, type: 'error' }));
        }
    }, [])

    return <div>
        <header>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 header'>
                        <label>{username}</label>
                        <button className="logout-btn" onClick={handleLogout}>Logout <LogoutIcon /></button>
                    </div>
                </div>
            </div>
        </header>

        <section>
            <div className="container">
                <div className="row p-1">
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
                <div className="row posts">
                    {posts.map((post, idx) => <Post post={post} likeHandleClick={likeHandleClick} dislikeHandleClick={dislikeHandleClick} editPostHandleClick={editPostHandleOpen} deletePostHandleClick={deletePostHandleOpen} key={post.id} />)}
                </div>
                <div className="row mainPaginator">
                    {totalPages && <Pagination />}
                </div>
            </div>
        </section>

        <section>
            {editPostFormOpened && <PostForm closeModalHandle={postCloseHandleClick} postConfirmHandle={postConfirmHandle} post={selectedPost} />}
            {deletePostFormOpened && <DeletePostForm closeModalHandle={deletePostHandleClose} deletePostConfirmHandle={deletePostConfirmHandle} />}
        </section>

        <footer>
            {!editPostFormOpened && <div className="addPost" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={newPostHandleClick}>
                <PlusIcon color="white" />
            </div>}
            <InfoForm />
        </footer>

    </div >
}

export default Main