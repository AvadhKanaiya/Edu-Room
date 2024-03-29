import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import db, { storage } from "../../lib/firebase";
import "./style.css";
import firebase from "firebase";
import { useLocalContext } from "../context/context";
import { Announcment } from "..";
const Main = ({ classData }) => {
    const { loggedInMail, loggedInAvatar } = useLocalContext();

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        // Assuming you have already initialized Firebase with your configuration

        const storageRef = storage.ref(`images/${image.name}`);
        const uploadTask = storageRef.put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle upload progress here if needed
            },
            (error) => {
                // Handle upload error
                console.error("Error uploading image: ", error);
            },
            () => {
                // Upload completed successfully, now fetch the download URL
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("announcments")
                            .doc("classes")
                            .collection(classData.id)
                            .add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imageUrl: url,
                                text: inputValue,
                                sender: loggedInMail,
                                avatar: loggedInAvatar,
                            })
                            .then(() => {
                                console.log("Document successfully written!");
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error getting download URL: ", error);
                    });
            }
        );
    };

    return (
        <div className="main">
            <div className="main__wrapper">
                <div className="main__content">
                    <div className="main__wrapper1">
                        <div className="main__bgImage">
                            <div className="main__emptyStyles" />
                        </div>
                        <div className="main__text">
                            <h1 className="main__heading main__overflow">
                                {classData.className}
                            </h1>
                            <div className="main__section main__overflow">
                                {classData.section}
                            </div>
                            <div className="main__wrapper2">
                                <em className="main__code">Class Code :</em>
                                <div className="main__id">{classData.id}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__announce">
                    {/* <div className="main__status">
                        <p>Upcoming</p>
                        <p className="main__subText">No work due</p>
                    </div> */}
                    <div className="main__announcements">
                        <div className="main__announcementsWrapper">
                            <div className="main__ancContent">
                                {showInput ? (
                                    <div className="main__form">
                                        <TextField
                                            id="filled-multiline-flexible"
                                            multiline
                                            label="Announce Something to class"
                                            variant="filled"
                                            value={inputValue}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <div className="main__buttons">
                                            <input
                                                onChange={handleChange}
                                                variant="outlined"
                                                color="primary"
                                                type="file"
                                            />

                                            <div>
                                                <Button onClick={() => setShowInput(false)}>
                                                    Cancel
                                                </Button>

                                                <Button
                                                    onClick={handleUpload}
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Post
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="main__wrapper100"
                                        onClick={() => setShowInput(true)}
                                    >
                                        <Avatar />
                                        <div>Announce Something to class</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Announcment classData={classData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;