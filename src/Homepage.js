import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Homepage() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://movie-bot-backend-26orzciwg-ghutoon.vercel.app/onboarding/get_onboarding_qrcode"
      )
      .then((res) => {
        // console.log(res);
        return res.data;
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <img src={posts} alt="new" />
    </>
  );
}
