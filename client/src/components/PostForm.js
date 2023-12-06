const PostForm = ({ children, onClose }) => {
    return (
        <div className="postForm">
            <div className="postForm-modal">
                <div className="postForm-header">
                    <div className="text-uppercase">
                        <h3>New Post</h3>
                    </div>
                </div>
                <div className="postForm-body">

                </div>
                <button className="postForm-close" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default PostForm;