import "./Styles/preview.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Preview = () => {

    const navigate = useNavigate();
    const { themes, questionData } = useContext(ThemeContext)
  
    const location = useLocation()

    console.log(questionData.get("option"))



 
    const saveData = () => {
        const token = sessionStorage.getItem("token")
       
        questionData.append("surveyId", location.state.data.id)
        questionData.append("questions", JSON.stringify(location.state.data.questions))
        questionData.append("option", JSON.stringify(location.state.data.arr))
     
        fetch("https://surveyform-backend-8leh.onrender.com/createForm", {
            method: "POST",
            headers:{Authorization:token},
            body: questionData
        }).then(res => res.json())
            .then(data => {if(data.status === "successful"){
                navigate("/main")
            }})
    }
 
    return (
        <div >
            <Header />
            <Sidebar />
            <div className={`main-con-${themes}`} >
                <div className={`preview-container preview-container-${themes}`} >
                    <div className="preview-con" >
                        <div className={`preview-div preview-div-${themes}`}>
                            <ArrowBackIcon onClick={() => { navigate("/") }} />
                            <h3 >Preview</h3>
                        </div>
                        <div>
                            <button className={`prev-btn ${themes ? `close-${themes}` : null}`} onClick={() => { navigate("/form") }} >Close Preview</button>
                            <button className={`prev-btn ${themes ? `save-${themes}` : null}`} onClick={saveData}  >Save</button>
                        </div>
                    </div>
              
                    <div className="question-con" >
                    
                       
                        <div className="question" >
                            {location.state.data.questions.map((ques, i) => {
                                return (
                                    <div key={i} >
                                        <div className="que" >
                                            <h4 className={`questionname-${themes}`} >Question{i + 1}</h4>
                                            <div className="h-line" ></div>
                                        </div>
                                        <p className={`question-${themes}`} >{ques.question}</p>

                        

                                        {location.state.data.arr[i].map((op, j) => {
                                       
                                            return (
                                                <div  className={`answers answers-${themes}`}  key={j} >
                                             
                                                    <input type={ques.questionType} className="ans"  name={ques.question} value={op.optionText}
                                                     checked={ques.answer !== op.optionText ? false : true} readOnly />
                                                    <label >{op.optionText}</label><br />
                                                </div>
                                            )
                                        })}
                                    </div>

                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default Preview