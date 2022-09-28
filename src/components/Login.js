import React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef,  useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import {  useLocation } from 'react-router-dom';

import axios from '../api/axios';
import jwtDecode from 'jwt-decode';


export default function Login() {
  const { setAuth } = useAuth();

    
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
console.log(location?.state?.from?.state?.room);
const nextState = location?.state?.from?.state?.room;
    const userRef = useRef();
    const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = { email, password };
  const navigate = useNavigate();
  // States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
  const rent = localStorage.getItem('rent');
  console.log(rent);
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
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setSubmitted(false);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setSubmitted(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signin",
          JSON.stringify({ email, password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      
      // const roleName = response?.data?.userRoles.map(obj => roles.push(obj.roleName));
      console.log(jwtDecode(accessToken).roles);
      const roles =jwtDecode(accessToken).roles;
      const userId =jwtDecode(accessToken).userId;
     
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('roles',roles);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);
      setAuth({ email, password, roles, accessToken });
      // setEmail('');
      // setPassword('');
      navigate(from, { replace: true }, {state: {nextState}});
      //navigate("/home");
  } catch (err) {
      if (!err?.response) {
          setError('No Server Response');
      } else if (err.response?.status === 400) {
          setError('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setError('Unauthorized');
      } else {
          setError('Login Failed');
      }
      // errRef.current.focus();
  }
  }
  return (
    <div>
      <div className='display-4 text-center'>Login</div>
      <div className='row justify-content-center' style={{ height: '90vh' }}>

        <form className='col-5 '>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" onBlur={handleEmail} className="form-control" id="email" aria-describedby="emailHelp" />

          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" onBlur={handlePassword} className="form-control mb-3" id="password" />
          </div>
          {/* Calling to the methods */}
					<div className="messages text-danger">
						{errorMessage()}
						{successMessage()}
					</div>

          <div className='row justify-content-center '>
            <button className="btn btn-lg  text-light" style={{ backgroundColor: 'cadetblue' }} onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}