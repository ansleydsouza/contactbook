const express = require("express");
const router = express.Router();

const Contacts = require('../../models/Contact');

//Application interfaces

//This interface will get the list of all contacts
router.get('/records', (req, res) => {
    Contacts.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(404).json({noContactsFound: 'No Contacts Found'}));
});

//This interface will get a single record by id
router.get('/record/:id', (req, res) => {
    Contacts.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

//This interface will add a single contact number and number to the database
router.post('/create', (req, res) => {
    Contacts.create(req.body)
        .then(contacts => res.json({msg: 'New contact added successfully'}))
        .catch(err => res.status(404).json({error: 'Unable to add this contact'}));
});

//This interface will update a record by the id
router.put('/update/:id', (req, res) => {
    Contacts.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

//This interface will delete a record by the id
router.delete('/:id', (req, res) => {
    Contacts.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({ mgs: 'Contact entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a contact' }));
});

module.exports = router;
