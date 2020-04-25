import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  color: "",
  hex: "",
};

const UpdateColor = (props) => {
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/colors/${item.id}`)
      .then((res) => {
        //    console.log("RES_DATA", res.data);

        setItem(res.data.color);
      })
      .catch((err) => console.log("UPDATE-FORM ERROR", err));
  }, [id]);

  const changeHandler = (e) => {
    e.persist();
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/colors/${item.id}`, item)
      .then((res) => {
        // res.data
        const newList = props.colorList.map((oneColor) => {
          if (oneColor.id === res.data.id) {
            return res.data;
          } else {
            return oneColor;
          }
        });
        props.setColorList(newList);
        push(`/bubble-page`);

        // res.data ==> just updated item object
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Color</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="color"
          onChange={changeHandler}
          placeholder="color"
          value={item.color}
        />
        <div />

        <input
          type="text"
          name="hex"
          onChange={changeHandler}
          placeholder="hex"
          value={item.hex}
        />
        <div />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateColor;
