import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h1>Вы открыли страницу поста c ID = {params.id}</h1>
      {isLoading
        ? <Loader/>
        : <div>{post.id}. {post.title}</div>
      }
      <h1>Комментарии</h1>
      {isComLoading
        ? <Loader/>
        : <div>
          {comments.map(comm =>
            <div style={{marginTop: 15}} key={comm.id}>
              <h3>{comm.email}</h3>
              <div>{comm.body}</div>
            </div>
          )}</div>
      }
    </div>
  );
};

export default PostIdPage;