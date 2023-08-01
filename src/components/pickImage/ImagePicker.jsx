import React, { useState } from "react";
import { ImagePickerStyles } from "./ImagePickerStyles";
import Button from "@mui/material/Button";
import { storage, db } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const ImagePicker = ({ userName }) => {
  const [kaption, setKaption] = useState("");
  const [stage, setStage] = useState(0);
  const [image, setImage] = useState(null);

  const fileUploadHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadBtnHandler = () => {
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const stage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setStage(stage);
      },
      (error) => {
        // error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          try {
            // post img inside the db
            await addDoc(collection(db, "userposts"), {
              timestamp: serverTimestamp(),
              kaption: kaption,
              imgSrc: url,
              userName: userName,
            });
          } catch (error) {
            console.error(error.message);
          }
          setKaption("");
          setStage(0);
          setImage(null);
        });
      }
    );
  };

  return (
    <ImagePickerStyles>
      <div className="file-picker-container">
        <progress className="stage-bar" value={stage} max="100" />
        <input
          type="text"
          placeholder="Enter a caption..."
          onChange={(e) => setKaption(e.target.value)}
          value={kaption}
          className="kaption-input"
        />
        <input type="file" onChange={fileUploadHandler} className="choose-file"/>
        <Button onClick={uploadBtnHandler} className="publish-btn">Publish</Button>
      </div>
    </ImagePickerStyles>
  );
};

export default ImagePicker;
