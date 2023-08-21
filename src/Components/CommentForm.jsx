import React, { useEffect, useState } from 'react';
import userImg2 from '../images/image-maxblagun.png'
function CommentForm({ submit, repName }) {
    const [post, setPost] = useState(
        {
            userName: 'kiantp16',
            comment: `${repName.repName ? repName.repName : ''}`,
            isPrimary: true,
            image: userImg2

        }
    )
    useEffect(() => {
        getReply()
    }, [repName])




    function handleSubmit(e) {
        e.preventDefault()

        submit(post)
        setPost({
            userName: 'kiantp16',
            comment: ``,
            isPrimary: true,
            image: post.image
        })
    }

    function handleChange(e) {
        e.preventDefault()
        setPost(prev => ({ ...prev, comment: e.target.value }))
    }
    function getReply() {
        // console.log('repName:', repName)
        repName.repName !== '' ? setPost(prev => ({ ...prev, comment: `@${repName.repName} `, isPrimary: false, originalPost: repName.originalPost, })) : setPost(prev => ({ ...prev, comment: ``, isPrimary: true, originalPost: null, }))
    }
    return (
        <form onSubmit={handleSubmit} className='comment-form'>

            <div className='user-img-container'>
                <img src={userImg2} alt='user-img' className='user-img' />
            </div>
            <textarea
                value={post.comment}
                onChange={handleChange}
                placeholder='Add a comment...'
                type='textarea'
                rows="4" cols="50"
                className='comment-input'
                maxlength="100"
            />

            <button type='submit' className='btn-submit'>Send</button>
        </form>
    );
}

export default CommentForm;