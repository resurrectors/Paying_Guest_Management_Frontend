import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const Book = (props) => {
  const { bedId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rent, setRent] = useState(0);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const rentPerDay = localStorage.getItem('rent');
  // const rentPerDay=10;
  const setAuth = useAuth();
  const navigate = useNavigate();
  const auth = setAuth.auth;

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


  const handleStartDate = (e) => {
    setStartDate(new Date(e.target.value));


  }

  const handleEndDate = (e) => {
    setError(null);
    const date = new Date(e.target.value);
    if (startDate === 'undefined') {
      setError("Please select start date first!")
    } else if (date < startDate) {
      setError("End date cannot be earlier that start date!")
    } else {
      setEndDate(date);
    }

  }
  const handleTotalDays = (e) => {

  }
  useEffect(async () => {
    try {

      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

      if (isNaN(days)) {
        setTotalDays(0);
      } else {
        setTotalDays(days);
      }
    } catch (error) {
      console.log("Error!!!!!!!!!")
    }

    setRent(rentPerDay * totalDays);

  }, [endDate, startDate, totalDays])




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      


      const response = await axios.post(`/booking/bed/${bedId}`,
        JSON.stringify({ startDate, endDate, rent, transactionDate }),
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          },
          // withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      setSubmitted('Booking Successful! You are being redirected to Home page...')
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.data.endDate) {
        setError('End date must be in the future!');
      } else if (err.response?.status === 401) {
        setError('Please login to Book!');
      } else if (err?.response?.status === 400) {
        setError('Booking Failed, bed is already booked on these dates!');
      }
      else {
        setError('Unknown Error occured please try again!');
      }

    }
  }
  return (
    <div className="container-fluid" style={{ 'height': '98vh' }}>
      <div className='row justify-content-center'>
        <div className='col-5 display-4 text-center '>
          Book
        </div>
      </div>


      <div className='row justify-content-center mt-3'>
        <form className='col-5 '>
          {/* Labels and inputs for form data */}
          <label className="label">Start Date</label>
          <input onChange={handleStartDate} className="input form-control"
            type="date" required />


          <label className="label">End Date</label>
          <input onChange={handleEndDate} className="input form-control"
            type="date" required />

          <label className="label">Rent per Day: Rs. </label>
          <input className="input form-control"
            type="text" value={rentPerDay} disabled/>
          <label className="label">Total Days  : </label>
          <input className="input form-control"
            type="text"  value={totalDays} disabled />
          <label className="label">Total amount for {totalDays} Days : </label>
          <input className="input form-control mb-3"
            type="text"  value={rentPerDay * totalDays} disabled />





          {/* Calling to the methods */}
          <div className="messages text-danger">
            {errorMessage()}
            {successMessage()}
          </div>







          <br />
          <div className='row justify-content-center '>
            <button className="btn btn-primary   text-light" style={{ width: '10rem' }} onClick={handleSubmit} type="submit">
              Pay Rs. {rentPerDay * totalDays} Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Book
