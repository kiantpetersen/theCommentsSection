import React, { useState } from 'react';
import userImg1 from '../images/image-amyrobson.png'
import userImg2 from '../images/image-juliusomo.png'

function CommentCard({ post, voteClick, reply, deletePost }) {
    const [plus, setPlus] = useState(false)
    const [minus, setMinus] = useState(false)
    function handleClick(e) {
        const opp = e.target.textContent;
        const id = e.target.closest('.comment-card').id
        if (opp === "+") {
            voteClick(opp, id);
            setPlus(true);
            setMinus(false);
        } else if (opp === "-") {
            voteClick(opp, id);
            setMinus(true);
            setPlus(false);
        } else if (opp === 'Reply') {
            reply(id)
        } else if (opp === 'Delete') {
            deletePost(id)
        }
    }

    return (
        <div id={post.id} className='comment-card'>
            {/* {console.log('POsted card: ', post)} */}
            <div className='vote-container'>
                <button className='vote-text vote-btn' disabled={plus} onClick={handleClick}>+</button>
                <p className='vote-text vote-number'>{post.votes}</p>
                <button className='vote-text vote-btn ' disabled={minus} onClick={handleClick}>-</button>
            </div>
            <div className='comment-textbox'>
                <div className='comment-header'>
                    <div className='user-img-container'>
                        <img src={post.image} alt='user-img' className='user-img' />
                    </div>
                    <p className='comment-text comment-user'>{post.userName}</p>
                    <p className='comment-text comment-time'>{post.date}</p>
                    <div className='card-btn-container'>
                        {post.userName === 'kiantp16' ? <button onClick={handleClick} className='comment-text btn-bin'><ion-icon name="trash"></ion-icon>Delete</button> : null}
                        <button onClick={handleClick} className='comment-text btn-reply'><ion-icon name="arrow-undo"></ion-icon>Reply</button>
                    </div>

                </div>
                <p className='comment-content'>{post.comment}</p>
            </div>
        </div>
    );
}

export default CommentCard;