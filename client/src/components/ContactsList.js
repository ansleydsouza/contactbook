import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//Create the record component to improve code readability
const Record = (props) => (
    <tr>
        <td>{ props.record.contact_name }</td>
        <td>{ props.record.contact_number }</td>
        <td>
            <Link className="btn btn-link" to={`/update/${props.record._id}`}>Update</Link>
            <button className="btn btn-link"
                    onClick={() => {
                        props.deleteRecord(props.record._id);
                    }}>
                Delete
            </button>
        </td>
    </tr>
);

export default function ContactsList() {
    const [records, setRecords] = useState([]);

    const navigate = useNavigate();

    //Fetch records from the database on page load
    useEffect(() => {
        async function getContacts() {
            axios
                .get(`http://localhost:8082/paginatedRecords/` + 1)
                .then(res => {
                    setRecords(res.data.contacts);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(`Error encountered when fetching contact list: ${err.statusText}`);
                })
        }
        getContacts();
        return;
    }, [records.length]);

    //Function to delete a record by id from the database
    async function deleteRecord(id) {
        axios.delete(`http://localhost:8082/`+id)
            .then(res => {
                const newRecords= records.filter((el) => el._id !== id);
                setRecords(newRecords);
            })
            .catch(err => {
                console.log(`Error deleting record from the database: ${err.statusText}`);
            })
    };

    //Map the records to the Record component
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record = {record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Phone Number</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {recordList()}
                </tbody>
            </table>
        </div>
    );
}