import React, {useState, useEffect, useMemo, useRef} from 'react'

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';

import {usePosts} from '../hooks/usePosts';
import {useFetching} from '../hooks/useFetching';

import MyModal from '../components/UI/modal/MyModal';
import MySelect from '../components/UI/select/MySelect';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';

import PostService from '../APi/PostService';

import {getPagesCount} from '../utils/pages';

import '../styles/App.css';
import { useObserver } from '../hooks/useObserver';

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const lastElement = useRef()

  const getPagesArray = useMemo(() => {
    let result = []
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result
  }, [totalPages])

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts()
  }, [page, limit])

  const removePost = (id) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      
      <hr style={{margin: '20px 0'}} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      <MySelect 
        value={limit} 
        onChange={value => setLimit(value)} 
        defaultValue="Кол-во элементов"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'},
        ]}  
      />

      {postError && <h1>Error has been successfully got {postError}</h1>}

      <PostList posts={sortedAndSearchedPosts} title={'dima'} remove={removePost}/>

      <div ref={lastElement}></div>

      {isPostsLoading
       && <Loader/> }
      <Pagination changePage={changePage} pagesArray={getPagesArray} page={page}/>
      
    </div>
  );
}

export default Posts;
