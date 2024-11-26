const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const Subscriber = require('../models/Subscriber');

// Отримати всі розсилки
router.get('/newsletters', async (req, res) => {
    try {
        const newsletters = await Newsletter.find().populate('subscribers');
        res.render('newsletters/index', { newsletters });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Додати нову розсилку
router.get('/newsletters/add', async (req, res) => {
    const subscribers = await Subscriber.find();
    res.render('newsletters/add', { subscribers });
});

router.post('/newsletters', async (req, res) => {
    try {
        const { topic, content, subscribers } = req.body;
        const newsletter = new Newsletter({ topic, content, subscribers });
        await newsletter.save();
        res.redirect('/newsletters');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Редагувати розсилку
router.get('/newsletters/edit/:id', async (req, res) => {
    try {
        const newsletter = await Newsletter.findById(req.params.id).populate('subscribers');
        const subscribers = await Subscriber.find();
        res.render('newsletters/edit', { newsletter, subscribers });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/newsletters/:id', async (req, res) => {
    try {
        const { topic, content, subscribers } = req.body;
        await Newsletter.findByIdAndUpdate(req.params.id, { topic, content, subscribers });
        res.redirect('/newsletters');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Видалити розсилку
router.delete('/newsletters/:id', async (req, res) => {
    try {
        await Newsletter.findByIdAndDelete(req.params.id);
        res.redirect('/newsletters');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
