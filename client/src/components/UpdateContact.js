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
        <div className="pt-3">
            <h3>Update an existing contact</h3>
            <form onSubmit={onSubmit}>
                <div className="pt-3">
                    <label htmlFor="contact_name">Contact Name</label>
                    <input
                        type="text"
                        disabled="true"
                        className="form-control"
                        id="contact_name"
                        placeholder="Name"
                        value={form.contact_name}
                        onChange={(e) => updateForm({ contact_name: e.target.value })}
                    />
                </div>
                <div className="pt-3 form-group">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contact_number"
                        placeholder="Contact Number"
                        value={form.contact_number}
                        onChange={(e) => updateForm({ contact_number: e.target.value })}
                    />
                </div>
                <div className="pt-3 form-group">
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