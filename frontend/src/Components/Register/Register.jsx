import './Register.css';
import { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [check, setCheck] = useState(false);
    const [message,setMessage] = useState("")
    const [status,setStatus] = useState("")
    const handleCheck = () => {
        setCheck(!check);
    }

    async function registerUser(event) {
        event.preventDefault();

        const formData = new FormData()
        formData.append("name",name)
        formData.append("email",email)
        formData.append("phone",phone)
        formData.append("profession",profession)
        formData.append("confirmpassword",confirmpassword)
        formData.append("password",password)
         formData.forEach((val, key) => {
        console.log(val,key)
    })
        const response = await fetch('https://surveyform-backend-8leh.onrender.com/user/register', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        setStatus(data.status)
        setMessage(data.message)
    }

    useEffect(() => {
        if (status === 'Success') {
            alert(message)
            navigate('/register')
            setMessage('')
            setStatus("")
            return
        }else {
            alert(message)
            setMessage("")
            setName("")
            setPassword("")
            setPhone("")
            setEmail("")
            setConfirmpassword("")
            setProfession("")
            return 
        }
    },[message])

    return (
        <div className="registercontainer">
            <div className='registersignin'>
                <h1>Welcome Page<br />
                    <span className='second'>One line text</span><br />
                    <span className='third'> Will Be Here</span></h1>
                <p className='signin'>Sign in to continue access pages</p>
                <p className='smallpara'>Already Have An Account</p>
                <Link to={'/'}><button className='signinbtn'>Sign In</button></Link>
            </div>
            <div className='register'>
                <h1>Register</h1>
                <p>Register to continue access pages</p>
                <form onSubmit={registerUser}>
                <div className='inputs'>
                    <input type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input  placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <div className='rline'>
                        <div className='inline'></div>
                        <div className='rinline'></div>
                    </div>
                    <input type='number' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type='text' placeholder='Profession' value={profession} onChange={(e) => setProfession(e.target.value)} />
                    <br />
                    <div className='rline'>
                        <div className='inline'></div>
                        <div className='rinline'></div>
                    </div>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                    <br />
                    <div className='rline'>
                        <div className='inline'></div>
                        <div className='rinline'></div>
                    </div>
                    </div>
                    <div>
                        <input onChange={handleCheck} type="checkbox" id="chckbox" />
                        <span className='chcktxt'>I agree to Terms & Condition receiving marketing and promotional materials</span>
                    </div>
                    {!check ? <h3>Agree Terms and Conditions</h3> : <input disabled={!check} id='btnregister' type='submit' value='Register' />}
                </form>
            </div>
        </div>
    );
}

export default Register;