import React, { useState } from "react";
import "./StoreOpTable.css";

const StoreOpTable = ({ storeHoursData, onEdit, onDelete, onAdd, editId, handleEditSubmit, editData }) => {
const [isEditing, setIsEditing] = useState(false);
const [showModal, setShowModal] = useState(false);


const handleCancel = () => {
    setIsEditing(false);
    // setEditId(null);
    // setEditData({});
    setShowModal(false);
}

const handleEditClick = (item) => {
    onEdit(item);
    setIsEditing(true);
    setShowModal(true);
}

return (
    <>
        <table className="table">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Opening Hour</th>
                    <th>Closing Hour</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {storeHoursData.map(item => (
                    <tr key={item.id} className="table-row">
                        <td>{item.Day}</td>
                        <td>{item.Open}</td>
                        <td>{item.Close}</td>
                        <td>
                            {
                                item.id === editId && isEditing ? (
                                    <>
                                        <button data-id={item.id} onClick={() => handleEditClick(item)} className="edit-button">Edit</button>
                                        <button data-id={item.id} onClick={(e) => onDelete(e.target.dataset.id)} className="delete-button">Delete</button>
                                    </>
                                ) : (
                                        <>
                                            <button data-id={item.id} onClick={() => handleEditClick(item)} className="edit-button">Edit</button>
                                            <button data-id={item.id} onClick={(e) => onDelete(e.target.dataset.id)} className="delete-button">Delete</button>
                                        </>
                                    )
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" name="day" defaultValue={editData.Day} />
                        <input type="text" name="open" defaultValue={editData.Open} />
                        <input type="text" name="close" defaultValue={editData.Close} />
                        <button type="submit">Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        )}
    </>
);

};

export default StoreOpTable;