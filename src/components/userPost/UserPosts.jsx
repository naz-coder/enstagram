import React from 'react';
import {PostStyles} from "./UserPostStyles";
import { Avatar } from 'material-ui-core';

const UserPost = ({userName, kaption, imgSrc}) => {
  return (
    <PostStyles>
        <div className='post-container'>
          <div className="post-header">
          <Avatar src={imgSrc} alt='User avatar' className='post-avatar'/>
            <h3>{userName}</h3>
          </div>

            <img src={imgSrc} className='post-image'/>
            <p className='post-text'><strong>{userName}</strong> {kaption}</p>
        </div>
    </PostStyles>
  )
}

export default UserPost