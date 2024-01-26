import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <p>Page does not exist</p>
      <button onClick={() => navigate("/")}>Go back</button>
    </>
  );
};

export default NotFound;
