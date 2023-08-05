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
  const inputRef = useRef(null);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      const userPostRef = doc(collection(db, "userposts"), postId);
      const userCommentRef = collection(userPostRef, "userComments");
      const userPostLikesRef = collection(userPostRef, "postLikes");
  
      unsubscribe = onSnapshot(userCommentRef, (snapshot) => {
        const komments = snapshot.docs.map((doc) => doc.data());
        setUserComments(komments);
      });
  
      if (user) {
        // Check if the current user has liked the post
        const querySnapshot = getDocs(query(userPostLikesRef, where("userId", "==", user.uid)));
        querySnapshot.then((snapshot) => {
          const likedByUser = !snapshot.empty;
          setIsliked(likedByUser);
          setLikeCount(snapshot.docs.length); // Set the like count based on the number of like documents
        });
      } else {
        setIsliked(false);
        setLikeCount(0);
      }
    }
    return () => {
      unsubscribe();
    };
  }, [postId, user]);
  
  
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
    return formatDistanceToNow(timestamp?.seconds * 1000, {
      addSuffix: true,
    });
  };

  return (
    <PostStyles>
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
    </PostStyles>
  );
};

export default UserPost;


// import React, { useEffect, useState, useRef } from "react";
// import { PostStyles } from "./UserPostStyles";
// import { Avatar } from "material-ui-core";
// import { db } from "../../firebase";
// import { addDoc, collection, doc, onSnapshot, arrayUnion, arrayRemove, serverTimestamp, updateDoc, getDocs, query, where } from "firebase/firestore";
// // import { arrayUnion, arrayRemove } from "../../firebase";
// import { FcLike } from "react-icons/fc";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaRegComment, FaShareSquare, FaRegBookmark, FaBookmark } from "react-icons/fa";

// const UserPost = ({ postId, user, userName, kaption, imgSrc, postLikes }) => {
//   const [userComments, setUserComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [islike, setIsliked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [isSaved, setIsSaved] = useState(false);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (user) {
//       const userPostRef = doc(collection(db, "userposts"), postId);
//       const userPostLikesRef = collection(userPostRef, "postLikes");

//       const checkLikedByUser = async () => {
//         const querySnapshot = await getDocs(query(userPostLikesRef, where("userId", "==", user.uid)));
//         setIsliked(!querySnapshot.empty);
//       };

//       checkLikedByUser();
//     }
//   }, [postId, user]);  
  

//   //  Save post

//   useEffect(() => {
//     if (user) {
//       // Check if the post is saved by the user
//       const savePostRef = doc(collection(db, "savePost"), user.uid);
//       onSnapshot(savePostRef, (snapshot) => {
//         if (snapshot.exists()) {
//           const savedPostIds = snapshot.data().postIds;
//           setIsSaved(savedPostIds.includes(postId));
//         } else {
//           setIsSaved(false);
//         }
//       });
//     }
//   }, [postId, user]);

//   // ...

//   // Bookmark a post
//   const postSaveHandler = async () => {
//     if (user) {
//       const savePostRef = doc(collection(db, "savePost"), user.uid);
  
//       try {
//         if (!isSaved) {
//           // If the post is not saved, add it to the user's savePost
//           await updateDoc(savePostRef, {
//             postIds: arrayUnion(postId),
//           });
//         } else {
//           // If the post is saved, remove it from the user's savePost
//           await updateDoc(savePostRef, {
//             postIds: arrayRemove(postId),
//           });
//         }
//         setIsSaved(!isSaved); // Toggle the save state directly here
//       } catch (error) {
//         console.error("Save Error:", error);
//       }
//     }
//   };
  

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

//   const deletePostHandler = () => {
//     if (user.displayName === userName) {
//       // Delete the post here
//       console.log("Deleting post...");
//     } else {
//       console.log("You are not allowed to delete this post.");
//     }
//   };

//   // Like toggle function and like counter update
//   const likeHandler = async () => {
//     if (user) {
//       const userPostRef = doc(collection(db, "userposts"), postId);
//       const userPostLikesRef = collection(userPostRef, "postLikes");

//       try {
//         if (!islike) {
//           // If the post is not liked, add the user's like
//           await addDoc(userPostLikesRef, { userId: user.uid });
//           setLikeCount((prevCount) => prevCount + 1);
//         } else {
//           // If the post is liked, remove the user's like
//           const querySnapshot = await getDocs(query(userPostLikesRef, where("userId", "==", user.uid)));
//           querySnapshot.forEach((doc) => {
//             doc.ref.delete();
//           });
//           setLikeCount((prevCount) => prevCount - 1);
//         }
//         setIsliked((prevIsLiked) => !prevIsLiked); // Toggle the like state
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
//   // const postSaveHandler = () => {
//   //   setIsSaved(!isSaved);
//   // }

//   return (
//     <PostStyles>
//       <div className="card-outter">
//         <div className="post-container">
//           <div className="post-header">
//             <Avatar src={imgSrc} alt={userName} className="post-avatar" />
//             <h3>{userName}</h3>
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
//               {isSaved ? <FaBookmark className="bookmark-icon"/> : <FaRegBookmark className="bookmark-icon"/> }
//             </div>
//           </div>

//           {/* Post Engagments Results */}
//           <div className="engagement-result">
//           <p className="post-likes-count">{likeCount} {likeCount === 1 ? "like" : "likes"}</p>
//           <p className="post-save">{isSaved && <p>Saved</p>}</p>
//           </div>


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
//     </PostStyles>
//   );
// };

// export default UserPost;
