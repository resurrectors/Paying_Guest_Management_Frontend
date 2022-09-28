import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import BuildingCard from './BuildingCard';

const Home = () => {
  const [buildings, setBuildings] = useState([]);
  let searchTerm = "";

  useEffect(() => {
    axios.get("/building").then(res => {
      const persons = res.data;
      setBuildings(persons);
    })
  }, []);

  function applyFilter(e) {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
      const newContactList = buildings.filter((b) => {
        let ls = [b.name, ...Object.values(b.buildingAddr), ...Object.values(b.owner)]
        return ls
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setBuildings(newContactList);
    } else {
      axios.get("/building").then(res => {
        const persons = res.data;
        setBuildings(persons);
      })
    }
  }

  return (
    <>

      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="data:image/jpeg;base64,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" class="d-block w-100" alt="..." style={{ "height": "200px" }} />
          </div>
          <div class="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAz9E73Gtwc0Fjc9NtHFo9QFaaHqsyR3B2A&usqp=CAU" class="d-block w-100" alt="..." style={{ "height": "200px" }} />
          </div>
          <div class="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSytra5qb7_0kk1S6-onJ9JyOUUwGq9pr-2ew&usqp=CAU" class="d-block w-100" alt="..." style={{ "height": "200px" }} />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>


      <div className='row' >
        <div className='row justify-content-center align-content-center mt-5 mb-3'>


          <div className=" col-11  d-flex justify-content-center ">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
              </svg>
            </div>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;Welcome to P.G. Rental System! Find and book a stay!</h4>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-3'></div>
          <div className='col-6'>
            <div className='mb-3'>
              <input type="text" className="form-control" id="search" name='searchFilter' placeholder='Search with name, location, state, owner, zipcode.....' onChange={(e) => applyFilter(e)} />
            </div>
          </div>
        </div>
        <hr />
        {/* <div className='container-fluid' style={{ height: "97vh" }}>
        <div className='row justify-content-center align-items-center'> */}
        {/* <BuildingCard building={buildings[0]} /> */}
        {/* <div className='col-6'> */}
        {/* {
            buildings.map(
              building =>
                <div style={{ padding: '15px', "minWidth":"200px" }} >
                  <div className="card shadow" key={building.id}>
                    <div className="d-flex flex-row" > */}

        {/* <div className="card-body">
                        <div className="d-flex flex-column mb-4">
                          <div className='row'>
                            <div className='col-12 card-title display-5'>{building.name}</div>

                            <div className='col-6'><p className="card-text" style={{ fontSize: '20px' }}>City : {building.buildingAddr.city}<br /> State : {building.buildingAddr.state} </p></div>
                            <div className='col-1'></div>
                            <div className='col-5 text-center'>  <a href="#" className="btn ">
                              <Link className="btn btn-outline-secondary" to={`/building/${building.id}`}>View Rooms</Link></a>
                            </div>
                          </div> */}

        {/* </div>
                      </div>
                    </div>
                  </div>
                </div> */}
        {/* )
          } */}
        {/* </div> */}
        {/* <div className='col-5' style={{ 'margin': '10px',"minWidth":"200px" }}>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://thumbs.dreamstime.com/b/vertical-shot-road-magnificent-mountains-under-blue-sky-captured-california-163571053.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://mobirise.com/bootstrap-carousel/assets2/images/thomas-smith-399133-1707x2560.jpg" className="d-block w-100" alt="..." />
              </div>
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
        </div> */}
        {/* </div >
      </div> */}
      </div>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center wrap' style={{ "padding": "3rem" }}>
          {
            buildings.map(
              building => <BuildingCard building={building} />)}
        </div>
      </div>

      

    </>
  )
}

export default Home
