
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {  uploadPost } from '../slice/UploadSlice';
import { useNavigate } from 'react-router-dom';

function UploadPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [file, setFile] = useState();
    const [description, setDescription] = useState("")
    const [type, setType] = useState("Semi-Exclusive");
    const [price, setPrice] = useState(0);

    


    const handleSubmit = (event) => {
      event.preventDefault()
      if(file){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("price", price);

        dispatch(uploadPost(formData)).then((result) => {
          alert(result.payload.status);
          if(result.payload.status === "success")
            navigate('/view-posts')
        })
      }
    }

    
   return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='textarea' placeholder='description' onChange={(e) => setDescription(e.target.value)}></input>
        <input type='file' filename={file} onChange={(e) => setFile(e.target.files[0])} accept="image/*"></input>
        <select onChange={(e) => setType(e.target.value)} value={type}>
            <option value={"Semi-Exclusive"}>Semi Exclusive</option>
            <option value={"Fully-Exclusive"}>Fully Exclusive</option>
        </select>
        <input type='number' placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
        <button type='submit'> Submit</button>
      </form>

     
    </div>
  )
}

export default UploadPost
