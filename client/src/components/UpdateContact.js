import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function UpdateContact() {
    const [form, setForm] = useState({
        contact_name: "",
        contact_number: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getSingleContactData() {
            const id = params.id.toString();
            axios
                .get('http://localhost:8082/record/'+id)
                .then(res => {
                    setForm(res.data)
                })
                .catch(err => {
                    console.log(`Error getting contact data`);
                })
        }
        getSingleContactData();
        return;
    }, [params.id, navigate]);

    // Update property params on form change
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const id = params.id.toString();

        const editedContact = {
            contact_name: form.contact_name,
            contact_number: form.contact_number,
        };

        axios.put('http://localhost:8082/update/'+id, editedContact)
            .then(res => {
                navigate("/");
            })
            .catch(err => {
                console.log("Error encountered when updating contact");
            })

    }

    return (
        <div>
            <h3>Update an existing contact</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="contact_name">Contact Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contact_name"
                        value={form.contact_name}
                        onChange={(e) => updateForm({ contact_name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contact_number"
                        value={form.contact_number}
                        onChange={(e) => updateForm({ contact_number: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Contact"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}