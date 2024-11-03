import React, { useState } from 'react'
import {useGoogleLogin} from '@react-oauth/google';
import {googleAuth} from './api';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function GoogleLogin(){
    const [selects, setSelects] = useState();
    const navigate = useNavigate();
    const [subject, setSubject] = useState('subject');
    const [text, setText] = useState('xyz');
    const [message, setMessage] = useState('');

    const responseGoogle = async (authResult)=>{
        try{
            if(authResult['code']){
                const result = await googleAuth(authResult['code']);
                const {email, name, image} = result.user.data;
                const token = result.data.token;
                const obj = {email, name, image, token, selects};
               
                localStorage.setItem('User-Info', JSON.stringify(obj));
                   try {
                        const response = await axios.post('http://localhost:8080/api/send-email', {
                            email,
                            subject,
                            text,
                        });
                        setMessage(`Email sent successfully: ${response.data}`);
                    } catch (error) {
                        console.error('Error sending email:', error);
                        setMessage('Error sending email');
                    }
                navigate('/dashboard');
                console.log('result.data.user---', result.user.data);
            }
            console.log(authResult);
        }catch(err){
            console.log("Error While Requesting the code.",err)
        }
    }
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    });
    return(
        <div className='App'>
            <button onClick={googleLogin}>
                Login with Google
            </button>

            <h3>Select User Type</h3>
            <select value={selects} onChange={e=>setSelects(e.target.value)}>
                <option>Ordinary User</option>
                <option>Admin</option>
            </select>
        </div>
    )
}

export default GoogleLogin