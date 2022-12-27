import React, {useState, useEffect, useCallback} from "react";
import './App.css';
import axios from "axios";
import {useDropzone} from 'react-dropzone'

const UserProfile = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const fetchUserProfile = () => {
        axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
            console.log(res);
            setUserProfiles(res.data);
        });
    }
    useEffect(() => {
        fetchUserProfile();
    }, []);
    return ( userProfiles.map((userProfiles,index)=>{
     return(
             <div key={index}>
                 <br/>
                 <br/>
                 <h1>{userProfiles.userName}</h1>
                 <p>{userProfiles.userProfileId}</p>
                 <Dropzone {...userProfiles}/>
                 <br/>
             </div>
         )
        })
    )
}


function Dropzone({userProfileId}) {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const id=userProfileId;
        console.log(userProfileId);

        axios.post("http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload",
            formData,
            {
                headers: {
                    "Context-Type": "multipart/form-data"
                }
            }
        ).then(()=> {
            console.log("Upload with success")
        }).catch(err=> {
                console.log(err);
            });
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop Profile image , or click to select Profile image</p>
            }
        </div>
    )
}

function App() {
    return <div className="App">
        <UserProfile/>
    </div>
}

export default App;
