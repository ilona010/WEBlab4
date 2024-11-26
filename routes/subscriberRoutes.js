const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Отримати всіх підписників
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.render('subscribers/index', { subscribers });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Додати нового підписника
router.get('/subscribers/add', (req, res) => {
    res.render('subscribers/add');
});

router.post('/subscribers', async (req, res) => {
    try {
        const { name, email, account, password } = req.body;
        const subscriber = new Subscriber({ name, email, account, password });
        await subscriber.save();
        res.redirect('/subscribers');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Редагувати підписника
router.get('/subscribers/edit/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        res.render('subscribers/edit', { subscriber });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/subscribers/:id', async (req, res) => {
    try {
        const { name, email, account, password } = req.body;
        await Subscriber.findByIdAndUpdate(req.params.id, { name, email, account, password });
        res.redirect('/subscribers');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Видалити підписника
router.delete('/subscribers/:id', async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id);
        res.redirect('/subscribers');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
