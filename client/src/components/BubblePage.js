import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import NavBar from "./NavBar";
import UpdateColor from "./UpdateColor";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        console.log("bubblePage-res:", res);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log("BubblePAge error:", err);
      });
  }, []);

  return (
    <>
      <NavBar />
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      <UpdateColor colorList={colorList} setColorList={setColorList} />
    </>
  );
};

export default BubblePage;
