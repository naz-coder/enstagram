import React, { useEffect, useState } from "react";
import { PostStyles } from "./UserPostStyles";
import { Avatar } from "material-ui-core";
import { db } from "../../firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";

const UserPost = ({ postId, user, userName, kaption, imgSrc }) => {
  const [userComments, setUserComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      const userPostRef = doc(collection(db, "userposts"), postId);
      const userCommentRef = collection(userPostRef, "userComments");

      unsubscribe = onSnapshot(userCommentRef, (snapshot) => {
        const komments = snapshot.docs.map((doc) => doc.data());
        setUserComments(komments);
      });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postCommentHandler = async (e) => {
    e.preventDefault();
    const userCommentRef = collection(doc(db, "userposts", postId), "userComments");
    try {
      await addDoc(userCommentRef, {
        text: newComment,
        userName: user.displayName,
        timestamp: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Comment Error:", error);
    }
  };

  const deletePostHandler = () => {
    if (user.displayName === userName) {
      // Delete the post here
      console.log("Deleting post...");
    } else {
      console.log("You are not allowed to delete this post.");
    }
  };

  return (
    <PostStyles>
      <div className="card-outter">
        <div className="post-container">
          <div className="post-header">
            <Avatar src={imgSrc} alt={userName} className="post-avatar" />
            <h3>{userName}</h3>
          </div>

          <img src={imgSrc} className="post-image" />
          <p className="post-text">
            <strong>{userName}</strong> {kaption}
          </p>

          <div className="post-comments">
            {userComments.map((komment) => (
              <p key={komment.timestamp}>
                <strong>{komment.userName}</strong> {komment.text}
              </p>
            ))}
          </div>

          {user && (
            <form>
              <div className="post-comment-container">
                <input
                  className="post-input"
                  type="text"
                  placeholder="Add your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="post-btn"
                  disabled={!newComment}
                  type="submit"
                  onClick={postCommentHandler}
                >
                  Post comment
                </button>
              </div>
              {user.displayName === userName && (
                <div className="del-btn-container">
                  <button className="del-btn" onClick={deletePostHandler}>
                    Delete post
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </PostStyles>
  );
};

export default UserPost;
