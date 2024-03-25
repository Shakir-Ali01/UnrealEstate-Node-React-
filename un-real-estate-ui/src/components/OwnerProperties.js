import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./OwnerProperties.css";

function OwnerProperties() {
  const navigate = useNavigate();
  const { ownerId } = useParams();

  const [data, setData] = useState(null);

  let sessionUser = {};
  let userIsAgent = false;
  let userIsTenant = false;
  let userIsOwner = false;
  let sessionLoggedIn = sessionStorage.getItem("sessionLoggedIn");
  if (sessionLoggedIn === "true") {
    sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"));
    if (sessionUser.role.toLowerCase() === "tenant") {
      // eslint-disable-next-line
      userIsTenant = true;
    } else if (sessionUser.role.toLowerCase() === "owner") {
      userIsOwner = true;
    } else {
      // eslint-disable-next-line
      userIsAgent = true;
    }
  }

  useEffect(() => {
    (async () => {
      let response = await axios.get("/users/" + ownerId);
      setData(response.data.propertiesOwned);
    })();
  }, [ownerId]);

  const openProperty = (e) => {
    let id = null;
    if (e.target.parentNode.id) {
      id = e.target.parentNode.id;
    } else {
      id = e.target.parentNode.parentNode.id;
    }
    navigate("/properties/" + id);
  };
  const newData = data ? data : [];

  const handleDelete = async (propId) => {
    try {
      let response = await axios.delete(
        `/properties/${propId}?ownerId=${sessionUser._id}`
      );
      console.log(response.data);
      // navigate("/owner-properties/" + sessionUser._id);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {newData.length > 0 ? (
            newData.map((item) => (
              <div className="col-md-3 g-4" key={item._id}>
                <div
                  className="card"
                  id={item._id}
                  onClick={(e) => openProperty(e)}
                >
                  <img
                    src="/placeholder_property.jpeg"
                    className="card-img-top"
                    alt="property"
                  />
                  <div className="card-body ownerPropertyCard">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text m-0 text-secondary">
                      City: {item.address.city}
                    </p>
                  </div>
                </div>
                {userIsOwner && sessionUser._i === item.owner._id ? (
                  item.tenant === undefined ? (
                    <button
                      id="deleteBtn"
                      className="btn mt-0"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete Property
                    </button>
                  ) : (
                    <button
                      id="deleteDisabledBtn"
                      className="btn mt-0"
                      disabled
                    >
                      Occupied By a Tenant
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <div className="noProperty">
              <h1>☹️ No Property found.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OwnerProperties;
