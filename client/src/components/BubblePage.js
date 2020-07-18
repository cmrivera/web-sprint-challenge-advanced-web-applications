import React, { useState, useEffect } from "react";
import { AxiosWithAuth } from "../components/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    AxiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        setColorList(res.data);
        console.log(colorList);
      })
      .catch((err) => console.log(err));
  }, []);

  //updatecolor option to get api infor
  const updateColors = () => {
    AxiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then((res) => {
        setColorList(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ColorList colors={colorList} updateColors={updateColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
