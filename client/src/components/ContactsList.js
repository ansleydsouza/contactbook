import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [isPrevActive, setIsPrevActive] = useState(false);
    const [isNextActive, setIsNextActive] = useState(true);

    //Fetch records from the database on page load

    async function getContacts(currentPage) {
        axios
            .get(`http://localhost:8082/paginatedRecords/` + currentPage)
            .then(res => {
                setRecords(res.data.contacts);
            })
            .catch(err => {
                console.log(`Error encountered when fetching contact list: ${err.statusText}`);
            })
    }

    useEffect(() => {
        getContacts(currentPage);
    }, [currentPage]);

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

    function getPreviousPage() {
        getContacts(setCurrentPage(currentPage-1));
        if (currentPage == 1) {
            setIsPrevActive(!isPrevActive)
        }
    }

    function getNextPage() {
        getContacts(setCurrentPage(currentPage+1));
        if (currentPage == 1) {
            setIsPrevActive(isPrevActive)
        }
    }

    return (
        <div>
            <nav aria-label="Pagination">
                <ul className="pagination justify-content-end">
                    <li className="page-item">
                        <a className="page-link" onClick={() => getPreviousPage()}>Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => getNextPage()}>Next</a>
                    </li>
                </ul>
            </nav>
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