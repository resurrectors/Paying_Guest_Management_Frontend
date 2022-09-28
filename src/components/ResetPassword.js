import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const ResetPassword = () => {
    const [email, setEmail] = useState();

    //ACCESSORIES:
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    //HANDLERS:
    const successMessage = () => {
        return (
            <div className="success text-success" style={{ display: submitted ? '' : 'none', }}>
                {submitted}
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div className="error" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );
    };

    const handleSubmit =async (e) => {
        setError("");
        setSubmitted(`An email has been sent to ${email} containing link for resetting password!`);
        e.preventDefault();
        // try {
        //     const response = await axios.post(`/bed/inroom/${roomId}`, 
        //     JSON.stringify({description}),
        //     {
        //       headers: {
        //         'Authorization': `Bearer ${localStorage.accessToken}`,
        //         'Content-Type': 'application/json'
        //       }
        //     }
        //     );
        //     setSubmitted("Succesfully added bed... Redirecting to beds page...");
        //     setTimeout(() => {
        //         navigate(`/owner/room/bed/${roomId}`);
        //     }, 3000);
        // } catch (error) {
        //     setError("Description is mandatory!")
        // }
    }


    return (
        <div className="container-fluid" style={{ 'height': '98vh' }}>
            <div className='row justify-content-center'>
                <div className='col-5 display-4 text-center '>
                    Reset Password
                </div>
            </div>


            <div className='row justify-content-center mt-3'>
                <form className='col-5 '>
                    {/* Labels and inputs for form data */}
                    <label className="label">Enter email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="input form-control mb-2"
                        type="text" required />
                    {/* Calling to the methods */}
                    <div className="messages text-danger ">
                        {errorMessage()}
                        {successMessage()}
                    </div>
                    <br />
                    <div className='row justify-content-center '>
                        <button className="btn btn-lg  text-light" style={{ backgroundColor: 'blue' }} onClick={handleSubmit} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ResetPassword
