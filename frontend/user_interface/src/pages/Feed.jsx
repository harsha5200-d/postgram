import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/posts`)
        .then(response => {
            setPosts(response.data.posts);
            setLoading(false);
        })
        .catch(err => {
            console.error("Fetch error:", err);
            setError("Failed to load posts. Is the backend running?");
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="loading">Loading posts...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <section className='feed-section'>
            <h1>Community Feed</h1>
            {
                posts.length > 0 ? (
                    <div className="posts-container">
                        {posts.map(post => (
                            <div key={post._id} className='post-card'>
                                <div className="post-image-wrapper">
                                    <img src={post.image} alt={post.caption} />
                                </div>
                                <div className="post-content">
                                    <p className="caption">{post.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-posts">
                        <p>No posts available yet. Be the first to create one!</p>
                    </div>
                )
            }
        </section>
    );
};

export default Feed;