import React, { useEffect, useState } from "react";
import axios from "axios";

// send token with get req to check if user is authorized

const useRegister = () => {
  const [serverError, setServerError] = useState("");
  const registerUser = async (username, password, email) => {
    try {
      const res = await axios.post(
        "https://movie-trackr-28ca8d8b6755.herokuapp.com/auth/register",
        {
          username: username,
          password: password,
          email: email,
        }
      );
      if (res.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      }
      return true;
    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Unable to reach server try again later");
      }
    }
  };

  return { registerUser, serverError };
};

export default useRegister;
