import { useState } from "react"
import { XIcon } from "../icons/icons"
import ReactDom from 'react-dom'

const PostForm = ({ closeModalHandle, postConfirmHandle, post }) => {

    const [imageObj, setImageObj] = useState({ image: post.current?.imageSrc || '', displayImage: post.current?.imageSrc || '' })
    const [title, setTitle] = useState(post.current?.title || '')

    const imageChangeHandle = (e) => {
        setImageObj({ image: e.target.files[0], displayImage: URL.createObjectURL(e.target.files[0]) })
    }

    const titleChangeHandle = (e) => {
        setTitle(e.target.value)
    }

    const submitFormHandle = async (e) => {
        e.preventDefault();
        await postConfirmHandle(title, imageObj.image);
    }

    const deleteImageHandle = () => {
        setImageObj({ image: '', displayImage: '' });
    }

    return ReactDom.createPortal(
        <div className="postForm" onClick={closeModalHandle}>
            <div className="postForm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="postForm-header text-uppercase mb-5">
                    {post.current ? <h3>Edit Post</h3> : <h3>New Post</h3>}
                </div>
                <div className="postForm-body">
                    <form>
                        <div className="input-group mb-2 align-items-start">
                            <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
                            <textarea className="form-control" onChange={titleChangeHandle} value={title}></textarea>
                        </div>
                        <div className="mb-2">
                            <input className="form-control" type="file" id="formFile" onChange={imageChangeHandle} />
                        </div>
                        {imageObj.displayImage && <div className="postForm-imagePreview mb-2">
                            <img src={imageObj.displayImage} />
                        </div>}
                    </form>
                </div>
                <div className="postForm-footer d-flex justify-content-between flex-row-reverse">
                    <button type="submit" className={`btn btn-primary ${!title ? 'disabled' : ''}`} onClick={submitFormHandle}>Save</button>
                    {!post.current && imageObj.displayImage && <button type="button" className="btn btn-primary" onClick={deleteImageHandle}>Delete image</button>}
                </div>
                <div className="postForm-close" onClick={closeModalHandle}>
                    <XIcon width={24} height={24} />
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}

export default PostForm;