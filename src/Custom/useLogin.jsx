import React, { useEffect, useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [serverError, setServerError] = useState("");
  const loginUser = async (password, email) => {
    try {
      const res = await axios.post(
        "https://movie-trackr-28ca8d8b6755.herokuapp.com/auth/login",
        {
          password: password,
          email: email,
        }
      );

      localStorage.setItem("token", JSON.stringify(res.data.token));
      return true;
    } catch (error) {
      if (error.response.status === 401) {
        setServerError("Invalid password");
      } else if (error.response.status === 404) {
        setServerError("User Doesnt Exist");
      } else {
        setServerError("Unable to reach server try again later");
      }
    }
  };

  return { loginUser, serverError };
};

export default useLogin;
