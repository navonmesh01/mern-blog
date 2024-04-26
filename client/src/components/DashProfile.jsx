import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function DashProfile() {
  const { currentUser } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress,setimageFileUploadProgress] = useState(null);
  const [imageFileUploadError,setimageFileUploadError] = useState(null);
  const [updateUserSuccess,setUpdateUserSuccess] = useState(false);
  const [updateUserError,setUpdateUserError] = useState(false);
  const [imageFileUploading,setImageFileUploading] = useState(null);
  const [formData,setformData] = useState({});

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      // used to create url of an image 
    }
  }
  // console.log(imageFile,imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // // Craft rules based on data in your Firestore database
    // // allow write: if firestore.get(
    // //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    //   service firebase.storage {
    //   match / b / { bucket } / o {
    //     match / { allPaths=**} {
    //   allow read;
    //   allow write: if
    //   request.resource.size < 2 * 1024 * 1024 &&
    //         request.resource.contentType.matches('image/.*')
    // }
    //   }
    // }

    // console.log('uploading img...');
    setImageFileUploading(true);
    setimageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime()+imageFile.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

        setimageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setimageFileUploadError('could not upload image (File must be less than 2MB)');
        setimageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null); // Reset imageFileUrl on error
        setImageFileUploading(false);
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
          setformData({...formData, profilePicture: downloadURL});
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setformData({...formData, [e.target.id]:e.target.value });
  };
// console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length === 0){
      setUpdateUserError('No changes made');
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        // console.log("isme");
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
    }
  };




  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>PROFILE</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} styles={{
              root:{
                width:'100%',
                height:'100%',
                position: 'absolute',
                top:0,
                left:0,
              },
              path:{
                stroke: `rgba(62,152,199,${imageFileUploadProgress/100})`,
              },
            }}/>
          )}
          <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'}`} />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='Email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          UPDATE
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>

      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
      )}

      {updateUserError && (
        <Alert color='failure' className='mt-5'>{updateUserError}</Alert>
      )}
    </div>
  )
}
