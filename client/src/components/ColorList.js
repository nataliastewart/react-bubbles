import React, { useState } from "react";
import axiosWithAuth from "axios";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }, props) => {
  const { push } = useHistory();
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${props.color.id}`, colorToEdit)
      .then((res) => {
        // console.log("SAVE-EDIT Response", res )
        const colorListEdit = props.color.map((oneColor) => {
          if (oneColor.id === res.data.id) {
            return res.data;
          } else {
            return oneColor;
          }
        });
        props.setColorToEdit(colorListEdit);
        push(`/bubble-page`);
      });

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    // axiosWithAuth()
    //   .delete(`/api/colors/${color.id}`, color)
    //   .then((res) => {
    //     console.log("DELETE RES", res);
    //     // res.data
    //     // props.setItems(res.data);
    //     // // res.data ==> just the id
    //     const newItems = props.items.filter((v) => `${v.id}` !== res.data);
    //     props.setItems(newItems);
    //     push("/");
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <button onClick={() => push(`/update-color/${colorToEdit.id}`)}>
            edit color
          </button>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
