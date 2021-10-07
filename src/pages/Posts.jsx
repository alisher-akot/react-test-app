import React, {useState, useRef, useEffect} from 'react';
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../Components/UI/Button/MyButton";
import MyModal from "../Components/UI/MyModal/MyModal";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import PostList from "../Components/PostList";
import Pagination from "../Components/UI/Pagination/Pagination";
import Loader from "../Loader/Loader";

function Posts() {

  const [posts, setPosts] = useState([
    // {id: 1, title: 'Javascript', body: 'Description'},
    // {id: 2, title: 'Javascript', body: 'Description'},
    // {id: 3, title: 'Javascript', body: 'Description'},
  ])
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
//
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);//
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {//
    fetchPosts(limit, page)
  }, [])

  const createPost = (newpost) => {
    setPosts([...posts, newpost])
    setModal(false)
  }

  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {//
    setPage(page);
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {postError &&
      <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты с сервера'}/>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  );
}

export default Posts;