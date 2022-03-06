import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

export default function CreateContact() {
    const [form, setForm] = useState({
        contact_name: "",
        contact_number: "",
    });

    const navigate = useNavigate();

    // Update property params on form change
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newContact = { ...form };

        axios
            .post('http://localhost:8082/create', newContact)
            .then(res => {setForm({ contact_name:"", contact_number: "" })
                navigate("/", { replace: true });
            })
            .catch(err => {
                console.log(`Encountered error when creating contact: ${err.statusText}`);
            })

    }

    return (
        <div className="container">
            <h3>Create a new contact</h3>
            <form onSubmit={onSubmit}>
                <div className="gy-5">
                    <label htmlFor="contact_name">Contact Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contact_name"
                        value={form.contact_name}
                        onChange={(e) => updateForm({ contact_name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contact_number"
                        value={form.contact_number}
                        onChange={(e) => updateForm({ contact_number: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="submit"
                        value="Create Contact"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );

}