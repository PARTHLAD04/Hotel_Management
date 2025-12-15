const express = require('express');
const Person = require('../models/Person');
const router = express.Router();
const { jwtMiddleware, generateToken } = require('../jwt');

// Create Person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Person created successfully');


        // Generate JWT token
        const payload = {
            id: response.id,
            username: response.username
        };
        console.log('Payload for Token:', JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Generated Token:', token);
        res.status(201).json({ response: response, token: token });

    } catch (err) {
        console.error('Error creating person:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Login Person
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const person = await Person.findOne({ username: username });
        if (!person) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }   
        const isMatch = await person.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }
        // Generate JWT token
        const payload = {
            id: person.id,
            username: person.username   
        };
        console.log('Payload for Token:', JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Generated Token:', token);
        res.json({token: token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/profile', jwtMiddleware, async (req, res) => {
   try {
        const persondata = req.user;
        console.log('Authenticated user data:', persondata);

        const personId = persondata.id;
        const person = await Person.findById(personId);

        res.status(200).json({person});        
   } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
   }
});

// Read Person
router.get('/',jwtMiddleware, async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
        console.log('Persons fetched successfully');
    } catch (err) {
        console.error('Error fetching persons:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype === 'Chef' || worktype === 'manager' || worktype === 'waiter') {
            const response = await Person.find({ work: worktype });
            res.status(200).json(response);
            console.log(`Persons with work type ${worktype} fetched successfully`);
        } else {
            res.status(400).send({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error fetching persons by work type:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Updated Person
router.put('/:id',jwtMiddleware, async (req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updateData, { new: true });
        if (response) {
            res.status(200).json(response);
            console.log(`Person with ID ${personId} updated successfully`);
        } else {
            res.status(404).send({ error: 'Person not found' });
        }
    } catch (err) {
        console.error('Error fetching persons by work type:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


// delete Person
router.delete('/:id',jwtMiddleware, async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (response) {
            res.status(200).json({ message: 'Person deleted successfully' });
            console.log(`Person with ID ${personId} deleted successfully`);
        } else {
            res.status(404).send({ error: 'Person not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



module.exports = router;
