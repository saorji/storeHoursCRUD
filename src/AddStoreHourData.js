import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const AddStoreHourData = ({ onAdd }) => {

    const [day, setDay] = useState("Monday");
    const [open, setOpen] = useState("09:00");
    const [close, setClose] = useState("17:00");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: uuidv4(),
            Day: day,
            Open: open,
            Close: close,
        };
        onAdd(data);
        setDay("Monday");
        setOpen("09:00");
        setClose("17:00");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Day:
                <input type="text" value={day} onChange={e => setDay(e.target.value)} required />
            </label>
            <br />
            <label>
                Opening Hour:
                <input type="text" value={open} onChange={e => setOpen(e.target.value)} required />
            </label>
            <br />
            <label>
                Closing Hour:
                <input type="text" value={close} onChange={e => setClose(e.target.value)} required />
            </label>
            <br />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddStoreHourData;