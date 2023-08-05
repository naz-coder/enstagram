import React, { useEffect, useState } from "react";
import { HomeStyles } from "./HomeStyles";
import UserPost from "../../components/userPost/UserPosts";
import { auth, db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Box, Button, Modal, Input } from "@mui/material";
import enstagramlogo from "../../assets/enstagramlogo.png";
import ImagePicker from "../../components/pickImage/ImagePicker";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Footer from "../footer/Footer";
import { BiHomeAlt, BiSearch } from "react-icons/bi";
// import InstagramEmbed from "react-instagram-embed";

const Home = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [userposts, setUserPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // User authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user has logged in
        console.log(user);
        setUser(user);
      } else {
        // user has logged out
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, userName]);

  // Fetching data from the Firestore database
  useEffect(() => {
    const colRef = collection(db, "userposts");
    onSnapshot(colRef, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  // Signup handler  function
  const signUpHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((crtd) => {
        console.log("User created:", crtd.user);
        // After signing up, update the user's profile to set the "displayName"
        return updateProfile(crtd.user, {
          displayName: userName,
        });
      })
      .then(() => {
        // After updating the profile, set the "user" state
        setUser(auth.currentUser);
        setOpen(false);
      })
      .catch((error) => alert(error.message));
  };

  // Login handler  function
  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((crtd) => {
        return updateProfile(auth.currentUser, {
          displayName: userName,
        }).then(() => {
          console.log("User logged in:", crtd.user);
          setOpenLogin(false);
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Search function
  const searchHandler = (query) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredPosts(userposts);
    } else {
      const filtered = userposts.filter((post) => {
        const lowerCaseUserName = post.post.userName
          ? post.post.userName.toLowerCase()
          : "";
        const lowerCaseKaption = post.post.kaption
          ? post.post.kaption.toLowerCase()
          : "";
        return (
          lowerCaseUserName.includes(query.toLowerCase()) ||
          lowerCaseKaption.includes(query.toLowerCase())
        );
      });
      console.log("Filtered posts:", filtered);
      setFilteredPosts(filtered);
    }
  };

  return (
    <HomeStyles>
      <div className="App">
        {/* Signup modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <form className="sign-up-form">
              <center>
                <img src={enstagramlogo} className="app-logo" alt="app-logo" />
              </center>
              <Input
                placeholder="Username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                placeholder="example@gmail.com"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <br></br>
              <Button onClick={signUpHandler} className="sign-up-btn">
                Sign up
              </Button>
            </form>
          </Box>
        </Modal>

        {/* Login or Signup modal */}
        <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
          <Box sx={style}>
            <form className="login-form">
              <center>
                <img src={enstagramlogo} className="app-logo" alt="app-logo" />
              </center>
              <Input
                placeholder="example@gmail.com"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <br></br>
              <Button onClick={loginHandler} className="log-in-btn">
                Login
              </Button>
            </form>
          </Box>
        </Modal>

        {/* Header */}
        <div className="page-layout">
        <div className="header-container">
          <div>
            <img src={enstagramlogo} className="app-logo" alt="app-logo" />
          </div>

          <div className="sidebar-content">
            <div className="home-container">
              <BiHomeAlt />
              <p>Home</p>
            </div>
            <div className="search-container-main">
              <div className="search-icon"><BiSearch /></div>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => searchHandler(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {user ? (
              <Button onClick={() => auth.signOut()} className="log-in-btn">
                Logout
              </Button>
            ) : (
              <div className="login-container">
                <Button
                  onClick={() => setOpenLogin(true)}
                  className="log-in-btn"
                >
                  Login
                </Button>
                <Button onClick={() => setOpen(true)} className="sign-up-btn">
                  Sign up
                </Button>
              </div>
            )}
          </div>
          {/* Search form */}
        </div>
        <div>
        </div>

        <div className="center-layout">
        <h1 className="app-subtitle">
          Connect, Chat, and Explore - Your Ultimate Chat and Social Zone
        </h1>

        {/* Option chaining with ?. in place of Try Catch */}
        {user?.email ? (
          <ImagePicker userName={user.displayName} />
        ) : (
          <h3 className="error-msg">
            Please, you must login to upload a photo.
          </h3>
        )}

        {/* Search result */}
        <div className="user-postings">
          {filteredPosts.map(({ id, post }) => (
            <UserPost
              key={id}
              postId={id}
              user={user}
              userName={post.userName}
              kaption={post.kaption}
              imgSrc={post.imgSrc}
              timestamp={post.timestamp}
            />
          ))}
        </div>

        {/* Display all other posts that are not part of the search results */}
        <div className="user-postings">
          {userposts
            .filter(({ id }) => !filteredPosts.some((post) => post.id === id))
            .map(({ id, post }) => (
              <UserPost
                key={id}
                postId={id}
                user={user}
                userName={post.userName}
                kaption={post.kaption}
                imgSrc={post.imgSrc}
                timestamp={post.timestamp}
              />
            ))}
        </div>
        </div>
        </div>

        {/* <InstagramEmbed
        url='https://www.instagram.com/p/CNFSZp3p7rS/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=='
        clientAccessToken='123|456'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      /> */}
        <Footer />
      </div>
    </HomeStyles>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import {HomeStyles} from "./HomeStyles";
// import UserPost from "../../components/userPost/UserPosts";
// import { auth, db } from "../../firebase";
// import { addDoc, collection, onSnapshot } from "firebase/firestore";
// import { Box, Button, Modal, Input } from "@mui/material";
// import enstagramlogo from "../../assets/enstagramlogo.png";
// import ImagePicker from "../../components/pickImage/ImagePicker";
// import { formatDistanceToNow } from "date-fns";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import Footer from "../footer/Footer";
// // import InstagramEmbed from "react-instagram-embed";

// const Home = () =>{
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   const [userposts, setUserPosts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [openLogin, setOpenLogin] = useState(false);
//   const [emailValue, setEmailValue] = useState("");
//   const [passwordValue, setPasswordValue] = useState("");
//   const [userName, setUserName] = useState("");
//   const [user, setUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   // User authentication
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // user has logged in
//         console.log(user);
//         setUser(user);
//       } else {
//         // user has logged out
//         setUser(null);
//       }
//     });
//     return () => {
//       // perform some cleanup actions
//       unsubscribe();
//     };
//   }, [user, userName]);

//   // Fetching data from the Firestore database
//   useEffect(() => {
//     const colRef = collection(db, "userposts");
//     onSnapshot(colRef, (snapshot) => {
//       setUserPosts(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           post: {
//             ...doc.data(),
//             // Convert the Firestore timestamp to a JavaScript Date object
//             timestamp: doc.data().timestamp.toDate(),
//           },
//         }))
//       );
//     });
// }, []);

//   // Signup handler  function
//   const signUpHandler = (e) => {
//     e.preventDefault();
//     createUserWithEmailAndPassword(auth, emailValue, passwordValue)
//       .then((crtd) => {
//         console.log("User created:", crtd.user);
//         // After signing up, update the user's profile to set the "displayName"
//         return updateProfile(crtd.user, {
//           displayName: userName,
//         });
//       })
//       .then(() => {
//         // After updating the profile, set the "user" state
//         setUser(auth.currentUser);
//         setOpen(false);
//       })
//       .catch((error) => alert(error.message));
//   };

//   // Login handler  function
//   const loginHandler = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, emailValue, passwordValue)
//       .then((crtd) => {
//         return updateProfile(auth.currentUser, {
//           displayName: userName,
//         }).then(() => {
//           console.log("User logged in:", crtd.user);
//           setOpenLogin(false);
//         });
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };

//   // Search function
//   const searchHandler = (query) => {
//     console.log("Search query:", query);
//     setSearchQuery(query);
//     if (query.trim() === "") {
//       setFilteredPosts(userposts);
//     } else {
//       const filtered = userposts.filter((post) => {
//         const lowerCaseUserName = post.post.userName ? post.post.userName.toLowerCase() : "";
//         const lowerCaseKaption = post.post.kaption ? post.post.kaption.toLowerCase() : "";
//         return (
//           lowerCaseUserName.includes(query.toLowerCase()) ||
//           lowerCaseKaption.includes(query.toLowerCase())
//         );
//       });
//       console.log("Filtered posts:", filtered);
//       setFilteredPosts(filtered);
//     }
//   };

//   return (
//     <HomeStyles>
//     <div className="App">
//       {/* Signup modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={style}>
//           <form className="sign-up-form">
//             <center>
//               <img
//                 src={enstagramlogo}
//                 className="app-logo"
//                 alt="app-logo"
//               />
//             </center>
//             <Input
//               placeholder="Username"
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//             <Input
//               placeholder="example@gmail.com"
//               type="email"
//               value={emailValue}
//               onChange={(e) => setEmailValue(e.target.value)}
//             />
//             <Input
//               placeholder="password"
//               type="password"
//               value={passwordValue}
//               onChange={(e) => setPasswordValue(e.target.value)}
//             />
//             <br></br>
//             <Button onClick={signUpHandler} className="sign-up-btn">Sign up</Button>
//           </form>
//         </Box>
//       </Modal>

//       {/* Login or Signup modal */}
//       <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
//         <Box sx={style}>
//           <form className="login-form">
//             <center>
//               <img
//                 src={enstagramlogo}
//                 className="app-logo"
//                 alt="app-logo"
//               />
//             </center>
//             <Input
//               placeholder="example@gmail.com"
//               type="email"
//               value={emailValue}
//               onChange={(e) => setEmailValue(e.target.value)}
//             />
//             <Input
//               placeholder="password"
//               type="password"
//               value={passwordValue}
//               onChange={(e) => setPasswordValue(e.target.value)}
//             />
//             <br></br>
//             <Button onClick={loginHandler} className="log-in-btn">Login</Button>
//           </form>
//         </Box>
//       </Modal>

//       {/* Header */}
//          {/* Header and Sidebar */}
//          <div className="page-layout">
//         <div className="header-container">
//           <div>
//             <img src={enstagramlogo} className="app-logo" alt="app-logo" />
//           </div>

//           {/* Search form */}
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchQuery}
//               onChange={(e) => searchHandler(e.target.value)}
//               className="search-input"
//             />
//           </div>

//           {user ? (
//             <Button onClick={() => auth.signOut()} className="log-in-btn">
//               Logout
//             </Button>
//           ) : (
//             <div className="login-container">
//               <Button onClick={() => setOpenLogin(true)} className="log-in-btn">
//                 Login
//               </Button>
//               <Button onClick={() => setOpen(true)} className="sign-up-btn">
//                 Sign up
//               </Button>
//             </div>
//           )}
//         </div>
//         <div>
//         </div>
//         {/* Image picker */}
//         <div className="center-layout">
//             <div className="center-content">
//             <h1 className="app-subtitle">
//           Connect, Chat, and Explore - Your Ultimate Chat and Social Zone
//         </h1>

//         {/* Option chaining with ?. in place of Try Catch */}
//         {user?.email ? (
//           <ImagePicker userName={user.displayName} />
//         ) : (
//           <h3 className="error-msg">
//             Please, you must login to upload a photo.
//           </h3>
//         )}

//         {/* Search result */}
//         <div className="user-postings">
//           {filteredPosts.map(({ id, post }) => (
//             <UserPost
//               key={id}
//               postId={id}
//               user={user}
//               userName={post.userName}
//               kaption={post.kaption}
//               imgSrc={post.imgSrc}
//               timestamp={post.timestamp}
//             />
//           ))}
//         </div>

//         {/* Display all other posts that are not part of the search results */}
//         <div className="user-postings">
//           {userposts
//             .filter(({ id }) => !filteredPosts.some((post) => post.id === id))
//             .map(({ id, post }) => (
//               <UserPost
//                 key={id}
//                 postId={id}
//                 user={user}
//                 userName={post.userName}
//                 kaption={post.kaption}
//                 imgSrc={post.imgSrc}
//                 timestamp={post.timestamp}
//               />
//             ))}
//         </div>

//             </div>
//         </div>
//         </div>

//         {/* <InstagramEmbed
//         url='https://www.instagram.com/p/CNFSZp3p7rS/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=='
//         clientAccessToken='123|456'
//         maxWidth={320}
//         hideCaption={false}
//         containerTagName='div'
//         protocol=''
//         injectScript
//         onLoading={() => {}}
//         onSuccess={() => {}}
//         onAfterRender={() => {}}
//         onFailure={() => {}}
//       /> */}
//       <Footer/>
//     </div>
//     </HomeStyles>
//   );
// }

// export default Home;
