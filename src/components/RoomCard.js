import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function RoomCard(props) {

    const [imageIds, setImageIds] = useState([]);
    const room = props.room;

    const getImageIds = async () => {
        const response = await axios.get(`/image/room/${room.id}`)
        return response.data
    }

    useEffect(() => {
        console.log(room);
        getImageIds().then((data) => {
            setImageIds(data);
        }).catch((e) => {
            console.log("error getting image ids");
            console.log(e);
        })
    }, [room]);

    return (
        <div style={{ "width": "18rem", "padding": "2px", "margin": "10px" }} >

            <div className="card" style={{ "width": "18rem"}}>
                {/* <div style={{"height":"30rem"}}> */}
                <img src={`http://localhost:8080/image/id/${imageIds[imageIds.length-1]}`} style={{"height":"15rem","aspectRatio":"auto"}} className="card-img-top" alt="No image" />
                
                
                {/* </div> */}
                <div className="card-body">
                    {/* <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <div className="d-flex flex-column mb-4">

                        <h4 className="card-title">Room No. {room.id}</h4>

                        <p className="card-text">Rent: Rs. {room.rentPerDay} </p>
                        <hr/>
                        <div className='text-center'>
                            <Link className="btn btn-outline-secondary" to={`/room/${room.id}`}>View Beds</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
