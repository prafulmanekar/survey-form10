import './surveylist.css';
import React, { useEffect, useState,useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { ThemeContext } from '../../App';
import Header from '../Header';
import Sidebar from '../Sidebar';


const List = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [TypeofSurvey, setTypeOfSurvey] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [otherCriteria, setOtherCriteria] = useState('');
    const [url, setUrl] = useState('');
    const navigate = useNavigate();
   
    const {formdata } = useContext(ThemeContext)
    const handleNext = () => {
        if(!name || !description || !TypeofSurvey || !startDate 
            || !endDate || !url){
                alert("Please enter all fields")
            }
            else{
              const token = sessionStorage.getItem("token")
                formdata.append("name" , name)
                formdata.append("description", description)
                formdata.append("typeOfSurvey", TypeofSurvey)
                formdata.append("startDate",startDate)
                formdata.append("endDate",endDate)
                formdata.append("image",url)
                formdata.append("otherCriteria", otherCriteria)

                fetch("https://surveyform-backend-8leh.onrender.com/createForm/list" , {
                    method:"POST",
                    body:formdata,
                    headers:{Authorization:token}
                }).then((res) => res.json())
                .then(response=> 
                    navigate("/form" , {state:{id:response.listId}})
                )
                
            }
    }

    const uploadImage = (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "instapost");
   
        fetch("https://api.cloudinary.com/v1_1/asrazareen/image/upload", {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url);
            })

    }
    return (
        <>
        <Header/>
        <Sidebar/>
        <div className='createsurvey' >
            <div className='header'>
                <h1>Create Survey</h1>
                <button id='btnfirst'>Cancel</button>
                <button id='lastbtn' onClick={handleNext}  >Next</button>
            </div>
            <div className='inputcontainer'>
               <div className='name'>
               <label>Name</label><br/>
                <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Name here' />
               </div>
                <div className='description'>
                <label>Description</label><br/>
                <input onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                </div>
                <div className='type'>
                <h3>Type of Survey</h3>
                <select onChange={(e) => setTypeOfSurvey(e.target.value)} className='select'>
                    <option>Select</option>
                    <option>Video</option>
                    <option>Feedback</option>
                    <option>Questions</option>
                </select>
                </div>
                <div  className='date'>
                    <div>
                    <label className='start'>Start Date</label><br/>
                    <input onChange={(e) => setStartDate(e.target.value)} type='date' />
                    </div>
                    <div>
                    <label className='end'>End Date</label><br/>
                    <input onChange={(e) => setEndDate(e.target.value)} type='date'date/>
                    </div>
                </div>
                <div className='criteria'>
                <label>Other Criteria</label><br/>
                <input onChange={(e) => setOtherCriteria(e.target.value)} placeholder='Enter Here' />
                </div>
                <div className='image'>
                    <label>Upload Image</label><br/>
                    <input onChange={(e) => uploadImage(e.target.files[0])} type='file' />
                </div>
            </div>
        </div>
        </>
        
    )
}

export default List;