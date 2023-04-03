import React, { useState, useEffect, useContext } from "react";
import "./Styles/survey-list.css"
import data from "../data.json"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import Header from "./Header";
import Sidebar from './Sidebar';
import Card from "./card";
// console.log(data)
const SurveyList = () => {

    const { themes, first, getData, data } = useContext(ThemeContext)
    const [searchField, setSearchField] = useState("");
    const [searchshow, setSearchShow] = useState(false)
    const navigate = useNavigate();
    const [search, setSearch] = useState([])
   
    useEffect(() => {
        const token = sessionStorage.getItem('token')

        if (!token) {
            navigate("/")
            alert("Please login ")
            return
        }
        getData()

    }, [])


    return (
        <div  >
            <Header />
            <Sidebar />
            <div className={`con ${themes ? `con-${themes}` : null}`} >
                <div className="survey-list-con" >
                    <div className="sur-con" >
                        <div className="flex" >
                            <h3 className={`sur ${themes ? `sur-${themes}` : null}`} >Survey List</h3>
                            <SearchIcon className="search" />
                            <input className={`search-input ${themes ? `search-input-${themes}` : null}`}
                                onChange={(e) => {
                                    setSearchField(e.target.value)
                                    if (e.target.value === "") {
                                        setSearch([])
                                        setSearchShow(false)
                                    }
                                    else {
                                        const regex = new RegExp(`^${e.target.value.toLowerCase()}`);
                                        let arr = data.filter((data) => {
                                            return regex.test(data.typeOfSurvey.toLowerCase());

                                        });
                                        setSearchShow(true)
                                       
                                        setSearch(arr)
                                    }
                                }} />
                        </div>
                        <button className={`theme-btn theme-btn-${themes} create-btn `}
                            onClick={() => { navigate("/surveyForm") }} >Create</button>
                    </div>
                    <div className={`header-con ${themes ? `header-con-${themes}` : null} `} >
                        <h4>Name</h4>
                        <h4>Description</h4>
                        <h4>Type</h4>
                        <h4>Start Date</h4>
                        <h4>End Date</h4>
                        <h4 className="action" >Actions</h4>
                    </div>

                    {
                        searchshow ? (
                            <div>
                                {
                                    search?.map((details, index) => {
                                        return (
                                            <Card details={details} key={index} />
                                        )

                                    }
                                    )
                                }

                            </div>
                        ) : (
                            data.map((details, index) => {
                                return (
                                    <Card key={index} details={details} />
                                )
                            })
                        )
                    }

                </div>
            </div>

        </div>
    )
}
export default SurveyList;