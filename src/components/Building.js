import { autocompleteClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../api/axios';
import RoomCard from './RoomCard';
const Building = () => {
  const { buildingId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [bimages, setBimages] = useState([]);
  const BACKEND = 'http://localhost:8080/image/id'

  const getImageIds = async () => {
    const response = await axios.get(`/image/building/${buildingId}`);
    return response.data;
  };

  useEffect(async () => {
    try {
      const response = await axios.get(`/room/inbuilding/${buildingId}`)
      console.log(response?.data)
      setRooms(response?.data);
    } catch (error) {
      console.log("Error!!!!!!!!!")
    }
    const getBimageIds = async () => {
      const ids = await getImageIds();
      if (ids) {
        console.log(ids);
        setBimages(ids);
      }
    }
    getBimageIds();
  }, [])
  return (
    <div className=''>

      <div className="container-fluid" id="buildhead" >
        <p>Choose a room as per your convinience:
          <br />
        </p>
        <p>
          Rooms in the building you selected( Building Id:{buildingId})
        </p>
      </div>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://media.istockphoto.com/videos/welcome-sign-linear-gradient-leftright-transition-on-black-background-video-id1211888212?s=640x640" className="d-block w-100" style={{ 'height': '250px' }} alt="..." />
              </div>
              {
                bimages.map(i =>
                  <div className="carousel-item">
                    <img src={`${BACKEND}/${i}`} className="d-block w-100" style={{ 'height': '250px' }} alt="..." />
                  </div>
                )
              }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <br />


      {/* <div className='row'>
        <div className='col-2'></div>
        <div className="col-8">
          {
            rooms.map(
              room => (
                <div className="card text-center mb-3">
                  <div className="card-body row">
                    <div className='col-4'>
                      <h5 className="card-title">Room No. {room.id}</h5>
                    </div>
                    <div className='col-4'>
                      <p className="card-text">Rent: Rs. {room.rentPerDay}</p>
                    </div>
                    <div className='col-4'>
                      <Link className="btn btn-outline-primary" to={`/room/${room.id}`}>View Beds</Link>
                    </div>
                  </div>
                </div>

                // <div className="card shadow" style={{width : "400px"}}>
                //   <div className="card-body">
                //     <h5 className="card-title">&nbsp;&nbsp; Room No. 0{room.id}</h5>
                //     <p className="card-text">&nbsp;&nbsp;&nbsp;&nbsp;Rent: Rs.{JSON.stringify(room.rentPerDay)} /- only</p>
                //     <div className="row" id="btnroom">
                //       <a href="#" className="btn btn-primary shadow"><Link className="btn" to={`/room/${room.id}`}>View Beds</Link></a>
                //     </div>
                //   </div>
                // </div>
              )
            )
          }
        </div>
      </div> */}
      <div className='container-fluid'>
      <div className='row justify-content-center align-items-center wrap' style={{ "padding": "3rem" }}>
      {
            rooms.map(
              room => <RoomCard room={room}/> )}
      </div>
    </div>
    </div>
  )
}

export default Building
