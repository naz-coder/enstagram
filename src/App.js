import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import UserPost from "./components/userPost/UserPosts";
import { auth, db } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import enstagramlogo from "./assets/enstagramlogo.png";

function App() {
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

  const [userposts, setUserPosts] = useState([
    // {userName: "SomKeke", imgSrc: "./userPhotos/user1photo.png", kaption: "Visit to the Park"},
    // {userName: "Luchi", imgSrc: "./userPhotos/user4photo.png", kaption: "Fitness fam"},
    // {userName: "champ101", imgSrc: "./userPhotos/user3photo.jpg", kaption: "Family time out..."},
    // {userName: "Nutella", imgSrc: "./userPhotos/user5photo.jpg", kaption: "Life is all about the choices we make!"},
    // {userName: "Fejie", imgSrc: "./userPhotos/user2photo.png", kaption: "Journey of a Data Analyst"},
  ]);
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [user, setUser] = useState(null);

  // User authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user has logged in
        console.log(userAuth);
        setUser(userAuth);
      }else{
        // user has logged out
        setUser(null);
      }
    })
    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, usernameValue])

  // Fetching data from the Firestore database
  useEffect(() => {
    db.collection("userposts").onSnapshot((snapshot) => {
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
    auth
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((userAuth) => {
        userAuth.user.updateProfile({
          displayName: usernameValue
        })
      })
      .catch((error) => alert(error.message));
      setOpen(false);
  };

  // Login handler  function
  const loginHandler = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(emailValue, passwordValue)
    .catch((error) => alert(error.message))
    setOpenLogin(false);
  }

  return (
    <div className="App">
      {/* Signup modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form className="sign-up-form">
            <center>
              <img src={enstagramlogo} className="app-logo" alt="app-logo" />
            </center>
            <Input
              placeholder="Username"
              type="text"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
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
            <Button onClick={signUpHandler}>Sign up</Button>
          </form>
        </Box>
      </Modal>

{/* Login or Signup modal */}
      <Modal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      >
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
            <Button onClick={loginHandler}>Login</Button>
          </form>
        </Box>
      </Modal>

      <Header />
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ):(
        <div className="login-container">
          <Button onClick={() => setOpenLogin(true)}>Login</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}
      <h1>ENSTAGRAM - a replica of the Instagram app</h1>
      {userposts.map(({ id, post }) => (
        <UserPost
          key={id}
          userName={post.userName}
          kaption={post.kaption}
          imgSrc={post.imgSrc}
        />
      ))}
    </div>
  );
}

export default App;
