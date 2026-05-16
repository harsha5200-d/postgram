import React  from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../config'

const CreatePost = () => {
    const navigate = useNavigate();
    const [uploading, setUploading] = React.useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setUploading(true);

        const formdata = new FormData(e.target);
        const token = localStorage.getItem('token');

        axios.post(`${API_BASE_URL}/create-posts`, formdata, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            setUploading(false);
            navigate('/feed'); 
        })
        .catch((error) => {
            console.error("Error creating post:", error);
            setUploading(false);
            
            // Show the actual error message from the backend if it exists
            const errorMsg = error.response?.data?.message || error.message || "Unknown error";
            alert("Upload failed: " + errorMsg);
        });
    }

    return (
        <section className='create-post-section'> 
            <h1>Share a New Post</h1>    

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Upload Image</label>
                        <input type="file" name="image" accept="image/*" required />
                    </div>
                    <div className="form-group">
                        <label>Caption</label>
                        <input type="text" name="caption" placeholder="What's on your mind?" required/>
                    </div>
                    <button type="submit" disabled={uploading}> 
                        {uploading ? "Uploading..." : "Share Post"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default CreatePost