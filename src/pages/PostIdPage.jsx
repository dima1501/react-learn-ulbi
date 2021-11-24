import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import PostService from '../APi/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchCommentsById, isCommentsLoading, commentsError] = useFetching(async () => {
        const response = await PostService.getComments(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchCommentsById(params.id)
    }, [])

    return (
        <div>
            {isLoading 
                ? <Loader/>
                : <div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            }
            <h2>Comments</h2>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(c => 
                        <div key={c.email}>
                            <h3>{c.email}</h3>
                            <p>{c.body}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage