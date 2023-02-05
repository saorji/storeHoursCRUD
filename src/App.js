import React, { useState, useEffect } from "react";
import StoreOpTable from "./StoreOpTable";
import AddStoreHourData from './AddStoreHourData';


function App() {
    const [storeHoursData, setStoreHoursData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        getStoreHoursData();
    }, []);

    const getStoreHoursUrl = `https://lbv8r74mbb.execute-api.eu-central-1.amazonaws.com/default/-hoursofop-list`;
    
    const onDelete = async (id) => {
        await deleteItem(id);
        getStoreHoursData();
    };

    const getStoreHoursData = async () => {
        const response = await fetch(getStoreHoursUrl);
        const jsonData = await response.json();
        if (jsonData && jsonData.message !== "Not Found") {
            setStoreHoursData(jsonData);
        } else {
            setStoreHoursData([]);
        }
    };

    const onAdd = async (data) => {
        const putUrl = `https://lbv8r74mbb.execute-api.eu-central-1.amazonaws.com/default/-hoursofop-list`;
        const response = await fetch(putUrl, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
                
            }
        });
        const jsonData = await response.json();
        if (jsonData.status === "success") {
            getStoreHoursData();
        }
    };

    async function deleteItem(id) {
        const url = `https://lbv8r74mbb.execute-api.eu-central-1.amazonaws.com/default/-hoursofop-list/${id}`;
        const options = {
          method: 'DELETE',
        };
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        } catch (error) {
          console.error(error);
        }
    }

    const onEdit = (item) => {
        setEditId(item.id);
        setEditData(item);
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`//https://lbv8r74mbb.execute-api.eu-central-1.amazonaws.com/default/-hoursofop-list/${editId}`, {
                //https://lbv8r74mbb.execute-api.eu-central-1.amazonaws.com/default/-hoursofop-list/${editId}
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: e.target.id.value,
                    days: e.target.day.value,
                    open: e.target.open.value,
                    close: e.target.close.value,
                })
            });
            const data = await response.json();
            // update storeHoursData with new values
            const updatedData = storeHoursData.map(i => i.id === editId ? { ...i, Day: data.Day, Open: data.Open, Close: data.Close } : i);
            setEditId(null);
            setEditData({});
            setStoreHoursData(updatedData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <StoreOpTable 
                storeHoursData={storeHoursData} 
                onAdd={onAdd} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                editId={editId} 
                handleEdit={handleEdit} 
                editData={editData}
            />
            <div>
                <br></br>
            <AddStoreHourData onAdd={onAdd}/>
            </div>
        </div>
    );
}

export default App;
