import { useState } from "react"
import { useSelectorAuth } from "../redux/store"

const PostForm = ({ closeModalHandle, postConfirmHandle, post }) => {

    const [image, setImage] = useState(post.current?.image)
    const [title, setTitle] = useState(post.current?.title)

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        await postConfirmHandle(title, image);
    }

    return (
        <div className="postForm">
            <div className="postForm-modal">
                <div className="postForm-header text-uppercase mb-5">
                    {post.current ? <h3>Edit Post</h3> : <h3>New Post</h3>}
                </div>
                <div className="postForm-body">
                    <form>
                        <div class="input-group mb-2">
                            <span class="input-group-text" id="inputGroup-sizing-default">Title</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" defaultValue={""} value={title} onChange={handleTitleChange} />
                        </div>
                        <div class="mb-2">
                            <input class="form-control" type="file" id="formFile" onChange={handleImageChange} />
                        </div>
                        <div className="postForm-imagePreview mb-2">
                            <img src={image} />
                        </div>
                    </form>
                </div>
                <div class="postForm-footer">
                    <button type="submit" className={`btn btn-primary ${!title ? 'disabled' : ''}`} onClick={handleSubmitForm}>Save</button>
                    {image && <button type="button" className="btn btn-primary" onClick={() => setImage()}>Delete image</button>}
                </div>
                <button className="postForm-close" onClick={closeModalHandle}>X</button>
            </div>
        </div>
    );
}

export default PostForm;