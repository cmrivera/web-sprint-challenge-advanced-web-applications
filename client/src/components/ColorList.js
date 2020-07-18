import React, { useState } from "react";
import { AxiosWithAuth } from "./axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const history = useHistory();
  const [sucMsg, setSucMsg] = useState("");

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  //save edited information handler
  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    setEditing(false);
    AxiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        updateColors();
      })
      .catch((err) => {
        console.log("err updating", err);
      });
  };

  //handler for delete to ask permission axioswithauth to delete from server

  const deleteColor = (color) => {
    // make a delete request to delete this color
    AxiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(() => {
        updateColors();
      })
      .catch((err) => {
        console.log("err deleting", err);
      });
  };

  const postColor = (e) => {
    e.preventDefault();
    setEditing(false);
    AxiosWithAuth()
      .post("/api/colors", colorToPost)
      .then((res) => {
        updateColors();
        console.log("posting", response);
        setSucMsg(res.statusText);
      })
      .catch((err) => {
        console.log("unable to post ", err);
      });
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
          <legend>edit color</legend>
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
