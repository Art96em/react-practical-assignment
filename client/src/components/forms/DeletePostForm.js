
import ReactDom from 'react-dom'

const DeletePostForm = ({ deletePostConfirmHandle, closeModalHandle }) => {

    return ReactDom.createPortal(
        <div className="postForm">
            <div className="postForm-modal">
                <div className="postForm-header text-uppercase mb-5">
                    <h3>Delete post</h3>
                </div>
                <div class="postForm-footer">
                    <button type="submit" className={`btn btn-primary`} onClick={deletePostConfirmHandle}>Confirm</button>
                </div>
                <button className="postForm-close" onClick={closeModalHandle}>X</button>
            </div>
        </div>,
        document.getElementById('portal'))
}

export default DeletePostForm