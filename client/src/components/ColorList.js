import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }, props) => {
  // console.log("COLOR-LIST-PROPS", props);
  const { push } = useHistory();
  const { id } = useParams();
  // console.log("COLORS:", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // console.log("SAVEPROPS", props);
  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then((res) => {
        console.log("SAVE-EDIT-Res:", res);

        const newArray = colors.map((item) => {
          if (item.id === res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
        console.log("NEW-ARRAY", newArray);

        updateColors(newArray);

        push(`/bubble-page`);
      })
      .catch((err) => console.log("SAVEEDIT ERROR:", err));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        console.log("res.data - DELETE:", res.data);
        const filteredColors = colors.filter((item) => item.id !== res.data);

        updateColors(filteredColors);
        push("/bubble-page");
      })
      .catch((err) => console.log("DELETE ERROR:", err));

    // props.history.push("/bubble-page");
    // make a delete request to delete this color
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
          <legend onClick={() => push(`/update-color/${colorToEdit.id}`)}>
            edit color
          </legend>
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
