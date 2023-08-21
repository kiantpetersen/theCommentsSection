
import { useState } from 'react'
import './App.css'
import './queries.css'
import CommentCard from './Components/CommentCard'
import CommentForm from './Components/CommentForm'
import data from './Components/data'
import { v4 as uuidv4 } from 'uuid'



function App() {
  const [posts, setPosts] = useState(data)
  const [repName, setRepName] = useState({
    repName: '',
    originalPost: null
  })

  function voteClick(opp, postId) {
    if (opp === '+') {
      setPosts(posts.map((item) =>
        item.id === String(postId)
          ? { ...item, votes: item.votes + 1 }
          : item)
      )
    } else {
      setPosts(posts.map((item) =>
        item.id === String(postId)
          ? { ...item, votes: item.votes === 0 ? 0 : item.votes - 1 }
          : item)
      )
    }
  }
  function addReply(id) {
    // console.log('Hello there' + id)
    posts.forEach(item => {
      if (String(item.id) === String(id)) {
        setRepName({
          repName: item.userName,
          originalPost: item.id
        })
        // console.log('Reply: ', item.userName)
      }
    })
  }
  function deletePost(id) {
    // console.log('Delete', id)

    setPosts(posts.filter(post => post.id !== String(id)))
    posts.map(item => {
      if (item.isPrimary === false && item.id === String(id)) {
        deleteReply(item.originalPost, String(id))
      }
      return null
    })

  }
  function deleteReply(originalId, postId) {
    // console.log('OP: ', originalId, 'Reply: ', postId)
    // let len
    let res = posts.map(item => {
      if (String(item.id) === String(originalId)) {
        // len = item.replies.length - 1
        console.log(item.replies[0], postId)
        let arr = item.replies.filter(rep => rep !== postId)

        return { ...item, replies: arr }
      } else {
        return item
      }
    })
    console.log('Res: ', res)
    setPosts(res)
  }
  function getReplies(arr) {
    let replies = []
    if (arr.length) {
      arr.forEach(id => {
        posts.map(item => {
          return String(item.id) === String(id) ? replies.push(item) : null
        })
      })
      return replies.map(item => {
        return <CommentCard deletePost={deletePost} reply={addReply} voteClick={voteClick} key={item.id} post={item} />
      })
    }

  }


  function getThread(post) {
    let len = post.replies.length
    // console.log(post, '  Length: ', len)
    let windowWidth = window.innerWidth

    if (!len || len === 0) return null
    // console.log('Thread: ', len)

    let height = 200 * len
    if (windowWidth <= 600 && windowWidth > 490) {
      height = 125 * len
    } else if (windowWidth <= 490 && windowWidth > 380) {
      height = 115 * len

    }
    else if (windowWidth <= 380) {
      height = 80 * len

    }
    return <div style={{ height: `${height}px` }} id='thread' className='thread'></div>
  }
  function getPosts() {

    return posts.map((post) => {
      let res
      if (post) {
        if (post.replies.length > 0) {
          res = <div key={post.id} className='replies-holder'>
            <CommentCard deletePost={deletePost} reply={addReply} voteClick={voteClick} key={post.id} post={post} />
            <div className='replies-box'>
              {/* {getThread(post)} */}
              <div className='replies-container'>
                {getReplies(post.replies)}
              </div>
            </div>
          </div>
        } else if (post.isPrimary) {
          res = <CommentCard deletePost={deletePost} reply={addReply} voteClick={voteClick} key={post.id} post={post} />
        }
      }
      return res

    })
  }
  function submitPost(postData) {
    const newPost = createPost(postData)
    setPosts(prev => [...prev, newPost])
  }
  function updateOP(originalId, repId) {
    // console.log('OP: ', originalId, 'Rep: ', repId)
    posts.map(item => {
      let res
      if (item.id === originalId) {
        res = item.replies.push(repId)
        // console.log('Res:', res)
        // setPosts(prev => ({ ...prev, replies: prev.replies.push(repId) }))
      }
      return res
    })
  }

  function createPost(post) {
    let res
    // const len = posts.length + 1
    let id = uuidv4()
    let userName = post.userName;
    let comment = post.comment;
    let date = getDate()
    if (post.isPrimary === true) {
      // id = Number('11111' + String(len))
      res = {
        id: id,
        userName: userName,
        votes: 0,
        comment: comment,
        isPrimary: true,
        originalPost: null,
        replies: [],
        date: date,
        image: post.image

      }
      console.log('Res: ', res)
    } else if (post.isPrimary === false) {
      id = uuidv4()
      res = {
        id: id,
        userName: post.userName,
        votes: 0,
        comment: comment,
        isPrimary: false,
        originalPost: post.originalPost,
        replies: [],
        date: date,
        image: post.image

      }
      updateOP(post.originalPost, id)

    }


    return res
  }
  function getDate() {
    const date = new Date()

    let month = String(date.getMonth() + 1).padStart(2, '0')
    let year = String(date.getFullYear()).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
    let hours = String(date.getHours()).padStart(2, '0')
    let minutes = String(date.getMinutes()).padStart(2, '0')
    let res = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;

    return res
  }
  // date: "11/06/2023 08:52"
  return (
    <>
      <div className='comment-section'>
        <h1 className='primary-heading'>The comments section</h1>
        <div className='comments-container'>
          {getPosts()}
        </div>
        {/* {console.log('Posts hii: ', posts)} */}
        <CommentForm repName={repName} submit={submitPost} />

      </div>
    </>
  )
}

export default App
