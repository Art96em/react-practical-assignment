import { useState } from "react"
import { useSelectorAuth } from "../../redux/store"

const PostForm = ({ closeModalHandle, postConfirmHandle, post }) => {

    const [imageObj, setImageObj] = useState({ image: post.current?.imageSrc || '', displayImage: post.current?.imageSrc || '' })
    const [title, setTitle] = useState(post.current?.title || '')

    const handleImageChange = (e) => {
        setImageObj({ image: e.target.files[0], displayImage: URL.createObjectURL(e.target.files[0]) })
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        await postConfirmHandle(title, imageObj.image);
    }

    const deleteImage = () => {
        setImageObj({ image: '', displayImage: '' });
    }

    return (
        <div className="postForm">
            <div className="postForm-modal">
                <div className="postForm-header text-uppercase mb-5">
                    {post.current ? <h3>Edit Post</h3> : <h3>New Post</h3>}
                </div>
                <div className="postForm-body">
                    <form>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" defaultValue={""} value={title} onChange={handleTitleChange} />
                        </div>
                        <div className="mb-2">
                            <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
                        </div>
                        {imageObj.displayImage && <div className="postForm-imagePreview mb-2">
                            <img src={imageObj.displayImage} />
                        </div>}
                    </form>
                </div>
                <div className="postForm-footer">
                    <button type="submit" className={`btn btn-primary ${!title ? 'disabled' : ''}`} onClick={handleSubmitForm}>Save</button>
                    {imageObj.displayImage && <button type="button" className="btn btn-primary" onClick={deleteImage}>Delete image</button>}
                </div>
                <button className="postForm-close" onClick={closeModalHandle}>X</button>
            </div>
        </div>
    );
}

export default PostForm;