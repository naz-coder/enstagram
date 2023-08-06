import React, { useEffect, useState, useRef } from "react";
import { PostStyles } from "./UserPostStyles";
import { Avatar } from "material-ui-core";
import { db } from "../../firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc, getDocs, query, where } from "firebase/firestore";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaShareSquare, FaRegBookmark, FaBookmark } from "react-icons/fa";
import {GoDotFill} from "react-icons/go";
import {formatDistanceToNow} from "date-fns"

const UserPost = ({ postId, user, userName, kaption, imgSrc, timestamp }) => {
  const [userComments, setUserComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [islike, setIsliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [hidden, setHidden] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      const userPostRef = doc(db, "userposts", postId);
      const userPostLikesRef = collection(userPostRef, "postLikes");

      // Fetch the hidden status of the post and update the local state
      unsubscribe = onSnapshot(userPostRef, (snapshot) => {
        const postData = snapshot.data();
        setHidden(postData?.hidden || false);
      });

      // Check if the current user has liked the post
      if (user) {
        const querySnapshot = getDocs(query(userPostLikesRef, where("userId", "==", user.uid)));
        querySnapshot.then((snapshot) => {
          const likedByUser = !snapshot.empty;
          setIsliked(likedByUser);
          setLikeCount(snapshot.docs.length);
        });
      } else {
        setIsliked(false);
        setLikeCount(0);
      }
    }

    // Fetch comments only when the post is not hidden
    if (!hidden) {
      const userCommentRef = collection(doc(db, "userposts", postId), "userComments");

      unsubscribe = onSnapshot(userCommentRef, (snapshot) => {
        const komments = snapshot.docs.map((doc) => doc.data());
        setUserComments(komments);
      });
    }

    return () => {
      unsubscribe();
    };
  }, [postId, user, hidden]);
  
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

  const deletePostHandler = async () => {
    if (user.displayName === userName) {
      try {
        const postRef = doc(db, "userposts", postId);
        await updateDoc(postRef, { hidden: true }); // Update the 'hidden' flag to true
        setHidden(true); // Update the local state to hide the post
        console.log("Post hidden successfully.");
      } catch (error) {
        console.error("Error hiding the post:", error);
      }
    } else {
      console.log("You are not allowed to hide this post.");
    }
  };


  // Like toggle function and like counter update
  const likeHandler = async () => {
    if (user) {
      const userPostRef = doc(collection(db, "userposts"), postId);
      const userPostLikesRef = collection(userPostRef, "postLikes");
  
      try {
        // Check if the post is already liked by the user
        const querySnapshot = await getDocs(query(userPostLikesRef, where("userId", "==", user.uid)));
        const likedByUser = !querySnapshot.empty;
  
        if (!likedByUser) {
          // If the post is not liked, add the user's like
          await addDoc(userPostLikesRef, { userId: user.uid });
          setLikeCount((prevCount) => prevCount + 1); // Update the like count using the previous count
        } else {
          // If the post is already liked, remove the user's like
          await querySnapshot.docs[0].ref.delete();
          setLikeCount((prevCount) => prevCount - 1); // Update the like count using the previous count
        }
        setIsliked(!likedByUser); // Toggle the like state based on whether the user has liked or unliked the post
      } catch (error) {
        console.error("Like Error:", error);
      }
    }
  };

  // Comment activation function
  const commentHandler = () => {
    inputRef.current.focus();
  };

  // Bookmark a post
  const postSaveHandler = () => {
    setIsSaved(!isSaved);
  }

  // Timing function for when the post was made
  const postTimeAgeHandler = (timestamp) => {
    if (!timestamp) {
      return "";
    }

  // Convert Firebase Timestamp to JavaScript Date object
    const postTime = timestamp.toDate(); 
    const timeAgo = formatDistanceToNow(postTime, { addSuffix: true });
    return timeAgo;
  };

  return (
    <PostStyles>
      {!hidden &&
      <div className="card-outter">
        <div className="post-container">
          <div className="post-header">
            <Avatar src={imgSrc} alt={userName} className="post-avatar" />
            <h3>{userName}</h3>
            <GoDotFill className="dot-icon"/>
            <p className="date-value">{postTimeAgeHandler(timestamp)}</p>
          </div>

          <img src={imgSrc} className="post-image" />
          <p className="post-text">
            <strong>{userName}</strong> {kaption}
          </p>

          {/* Post Engagements */}
          <div className="post-engagement-container">
            <div className="post-engagment-content">
            <div className="post-like" onClick={likeHandler}>
              {islike ? <FcLike className="like-icon" /> : <AiOutlineHeart className="like-icon" />}
            </div>

          <div className="post-comment" onClick={commentHandler}>
            <FaRegComment className="comment-icon"/>
          </div>
          <div className="post-share">
            <FaShareSquare className="share-icon"/>
          </div>
            </div>

            <div className="post-engagment-bookmark" onClick={postSaveHandler}>
               {isSaved ? <FaBookmark className="bookmark-icon"/> : <FaRegBookmark className="bookmark-icon"/> }
             </div>
          </div>

          {/* Post Engagments Results */}
           <div className="engagement-result">
           <p className="post-likes-count">{likeCount} {likeCount === 1 ? "like" : "likes"}</p>
           <p className="post-save">{isSaved && <p>Saved</p>}</p>
           </div>

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
                  ref={inputRef}
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
}
    </PostStyles>
  );
};

export default UserPost;


// import React, { useEffect, useState, useRef } from "react";
// import { PostStyles } from "./UserPostStyles";
// import { Avatar } from "material-ui-core";
// import { db } from "../../firebase";
// import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc, getDocs, query, where } from "firebase/firestore";
// import { FcLike } from "react-icons/fc";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaRegComment, FaShareSquare, FaRegBookmark, FaBookmark } from "react-icons/fa";
// import {GoDotFill} from "react-icons/go";
// import {formatDistanceToNow} from "date-fns"

// const UserPost = ({ postId, user, userName, kaption, imgSrc, timestamp }) => {
//   const [userComments, setUserComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [islike, setIsliked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [isSaved, setIsSaved] = useState(false);
//   const [hidden, setHidden] = useState(false);
//   const inputRef = useRef(null);
  
//   useEffect(() => {
//     let unsubscribe;
//     if (postId) {
//       const userPostRef = doc(db, "userposts", postId);
//       const userPostLikesRef = collection(userPostRef, "postLikes");

//       // Fetch the hidden status of the post and update the local state
//       unsubscribe = onSnapshot(userPostRef, (snapshot) => {
//         const postData = snapshot.data();
//         setHidden(postData?.hidden || false);
//       });

//       // Check if the current user has liked the post
//       if (user) {
//         const querySnapshot = getDocs(query(userPostLikesRef, where("userId", "==", user.uid)));
//         querySnapshot.then((snapshot) => {
//           const likedByUser = !snapshot.empty;
//           setIsliked(likedByUser);
//           setLikeCount(snapshot.docs.length);
//         });
//       } else {
//         setIsliked(false);
//         setLikeCount(0);
//       }
//     }

//     // Fetch comments only when the post is not hidden
//     if (!hidden) {
//       const userCommentRef = collection(doc(db, "userposts", postId), "userComments");

//       unsubscribe = onSnapshot(userCommentRef, (snapshot) => {
//         const komments = snapshot.docs.map((doc) => doc.data());
//         setUserComments(komments);
//       });
//     }

//     return () => {
//       unsubscribe();
//     };
//   }, [postId, user, hidden]);
  
//   const postCommentHandler = async (e) => {
//     e.preventDefault();
//     const userCommentRef = collection(doc(db, "userposts", postId), "userComments");
//     try {
//       await addDoc(userCommentRef, {
//         text: newComment,
//         userName: user.displayName,
//         timestamp: serverTimestamp(),
//       });
//       setNewComment("");
//     } catch (error) {
//       console.error("Comment Error:", error);
//     }
//   };

//   const deletePostHandler = async () => {
//     if (user.displayName === userName) {
//       try {
//         const postRef = doc(db, "userposts", postId);
//         await updateDoc(postRef, { hidden: true }); // Update the 'hidden' flag to true
//         setHidden(true); // Update the local state to hide the post
//         console.log("Post hidden successfully.");
//       } catch (error) {
//         console.error("Error hiding the post:", error);
//       }
//     } else {
//       console.log("You are not allowed to hide this post.");
//     }
//   };


//   // Like toggle function and like counter update
//   const likeHandler = async () => {
//     if (user) {
//       const userPostRef = doc(collection(db, "userposts"), postId);
//       const userPostLikesRef = collection(userPostRef, "postLikes");
  
//       try {
//         // Check if the post is already liked by the user
//         const querySnapshot = await getDocs(query(userPostLikesRef, where("userId", "==", user.uid)));
//         const likedByUser = !querySnapshot.empty;
  
//         if (!likedByUser) {
//           // If the post is not liked, add the user's like
//           await addDoc(userPostLikesRef, { userId: user.uid });
//           setLikeCount((prevCount) => prevCount + 1); // Update the like count using the previous count
//         } else {
//           // If the post is already liked, remove the user's like
//           await querySnapshot.docs[0].ref.delete();
//           setLikeCount((prevCount) => prevCount - 1); // Update the like count using the previous count
//         }
//         setIsliked(!likedByUser); // Toggle the like state based on whether the user has liked or unliked the post
//       } catch (error) {
//         console.error("Like Error:", error);
//       }
//     }
//   };

//   // Comment activation function
//   const commentHandler = () => {
//     inputRef.current.focus();
//   };

//   // Bookmark a post
//   const postSaveHandler = () => {
//     setIsSaved(!isSaved);
//   }

//   // Timing function for when the post was made
//   const postTimeAgeHandler = (timestamp) => {
//     if (!timestamp) {
//       return "";
//     }

//   // Convert Firebase Timestamp to JavaScript Date object
//     const postTime = timestamp.toDate(); 
//     const timeAgo = formatDistanceToNow(postTime, { addSuffix: true });
//     return timeAgo;
//   };

//   return (
//     <PostStyles>
//       {!hidden &&
//       <div className="card-outter">
//         <div className="post-container">
//           <div className="post-header">
//             <Avatar src={imgSrc} alt={userName} className="post-avatar" />
//             <h3>{userName}</h3>
//             <GoDotFill className="dot-icon"/>
//             <p className="date-value">{postTimeAgeHandler(timestamp)}</p>
//           </div>

//           <img src={imgSrc} className="post-image" />
//           <p className="post-text">
//             <strong>{userName}</strong> {kaption}
//           </p>

//           {/* Post Engagements */}
//           <div className="post-engagement-container">
//             <div className="post-engagment-content">
//             <div className="post-like" onClick={likeHandler}>
//               {islike ? <FcLike className="like-icon" /> : <AiOutlineHeart className="like-icon" />}
//             </div>

//           <div className="post-comment" onClick={commentHandler}>
//             <FaRegComment className="comment-icon"/>
//           </div>
//           <div className="post-share">
//             <FaShareSquare className="share-icon"/>
//           </div>
//             </div>

//             <div className="post-engagment-bookmark" onClick={postSaveHandler}>
//                {isSaved ? <FaBookmark className="bookmark-icon"/> : <FaRegBookmark className="bookmark-icon"/> }
//              </div>
//           </div>

//           {/* Post Engagments Results */}
//            <div className="engagement-result">
//            <p className="post-likes-count">{likeCount} {likeCount === 1 ? "like" : "likes"}</p>
//            <p className="post-save">{isSaved && <p>Saved</p>}</p>
//            </div>

//           <div className="post-comments">
//             {userComments.map((komment) => (
//               <p key={komment.timestamp}>
//                 <strong>{komment.userName}</strong> {komment.text}
//               </p>
//             ))}
//           </div>

//           {user && (
//             <form>
//               <div className="post-comment-container">
//                 <input
//                   className="post-input"
//                   type="text"
//                   placeholder="Add your comment..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   ref={inputRef}
//                 />
//                 <button
//                   className="post-btn"
//                   disabled={!newComment}
//                   type="submit"
//                   onClick={postCommentHandler}
//                 >
//                   Post comment
//                 </button>
//               </div>
//               {user.displayName === userName && (
//                 <div className="del-btn-container">
//                   <button className="del-btn" onClick={deletePostHandler}>
//                     Delete post
//                   </button>
//                 </div>
//               )}
//             </form>
//           )}
//         </div>
//       </div>
// }
//     </PostStyles>
//   );
// };

// export default UserPost;
