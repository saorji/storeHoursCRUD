import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const EditStoreHourData = ({ handleEdit, handleCancel, editData }) => {
const [day, setDay] = useState(editData.Day);
const [open, setOpen] = useState(editData.Open);
const [close, setClose] = useState(editData.Close);

const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit({ id: editData.id, Day: day, Open: open, Close: close });
}

return (
    <div className="modal-overlay">
        <div className="modal-content">
            <form onSubmit={handleSubmit}>
                <input type="text" name="day" value={day} onChange={(e) => setDay(e.target.value)} />
                <input type="text" name="open" value={open} onChange={(e) => setOpen(e.target.value)} />
                <input type="text" name="close" value={close} onChange={(e) => setClose(e.target.value)} />
                <button type="submit">Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    </div>
);
}

export default EditStoreHourData;