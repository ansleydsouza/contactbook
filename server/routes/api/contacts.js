const express = require("express");
const router = express.Router();

const Contacts = require('../../models/Contact');

//Application interfaces

/**
 * @swagger
 * /records:
 *   get:
 *     description: Get All contacts in the database
 *     responses:
 *       200:
 *         description: Returns all the contacts in the database
 */
router.get('/records', (req, res) => {
    Contacts.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(404).json({noContactsFound: 'No Contacts Found'}));
});

//This interface will get the list of records with pagination
router.get('/paginatedRecords/:page/:searchName?', async(req, res) => {
    const page = req.params.page || 1;
    var searchName;
    if (req.params.searchName != null) {
        searchName = req.params.searchName;
    }
    const limit = 20;

    try {
        // execute query with page and limit values
        const contacts = await Contacts.find(searchName  != null ? { "contact_name": { $regex: '.*' + searchName + '.*' }} : null)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort("contact_name")
            .exec();

        // get total documents in the Contacts collection
        const count = await Contacts.countDocuments();

        // return response with posts, total pages, and current page
        res.json({
            contacts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * @swagger
 * /record/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: Contact ID
 *        required: true
 *        type: string
 *        description: The contact ID.
 *     description: Get a contact by id
 *     responses:
 *       200:
 *         description: Returns the requested contact
 */
router.get('/record/:id', (req, res) => {
    Contacts.findById(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

/**
 * @swagger
 * /create:
 *   post:
 *     parameters:
 *      - in: body
 *        name: Request Body
 *        description: New Contact
 *        schema:
 *          type: object
 *          properties:
 *            contact_name:
 *              type: string
 *            contact_number:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/create', (req, res) => {
    Contacts.create(req.body)
        .then(contacts => res.json({msg: 'New contact added successfully'}))
        .catch(err => res.status(404).json({error: 'Unable to add this contact'}));
});

/**
 * @swagger
 * /update/{id}:
 *  put:
 *      parameters:
 *          - in: path
 *            name: Contact ID
 *            required: true
 *            type: string
 *            description: The contact to be updated
 *          - in: body
 *            name: Request Body
 *            description: Updated contact details
 *            schema:
 *              type: object
 *              properties:
 *                  contact_name:
 *                      type: string
 *                  contact_number:
 *                      type: string
 *      responses:
 *          201:
 *              description: Contact updated successfully
 */
router.put('/update/:id', (req, res) => {
    Contacts.findByIdAndUpdate(req.params.id, req.body)
        .then(contact => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

/**
 * @swagger
 * /{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: Contact ID
 *        required: true
 *        type: string
 *        description: The contact to be deleted
 *      responses:
 *          201:
 *              description: Record deleted successfully
 */
router.delete('/:id', (req, res) => {
    Contacts.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({ mgs: 'Contact entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such contact' }));
});

module.exports = router;
