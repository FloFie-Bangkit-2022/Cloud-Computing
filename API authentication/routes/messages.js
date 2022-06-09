// Import dependencies
const express = require("express");

// Import diversons
const auth = require("../diverson/auth");
const { admin, editor, viewer, owner } = require("../diverson/roles");

// Dummy data
let messages = [{ id: 1, name: "Nama Anda", content: "selamat datang" }];

// Setup the router for express
const router = express.Router();

// *************************
// Set up the route handlers
// *************************

router.get("/", [auth, owner], (req, res) => {
    res.send({
        ok: true,
        result: messages
    });
});

router.get("/", [auth, viewer], (req, res) => {
    res.send({
        ok: true,
        result: messages
    });
});

router.post("/", [auth, editor], async (req, res) => {
    // Make a new message and add it
    messages.push({ id: messages.length + 1, name: req.body.name, content: req.body.content });

    // Send response
    res.status(200).send({
        ok: true,
        result: messages
    });
});

router.put("/", [auth, editor], async (req, res) => {
    // Update the message
    // Code not implemented
    // Send response
    res.status(200).send({
        ok: true,
        result: messages
    });
});

router.delete("/", [auth, admin], async (req, res) => {
    // Delete the message
    messages = messages.filter((message) => { message.id !== req.body.id });

    // Send response
    res.status(200).send({
        ok: true,
        result: messages
    });
});

// Export the router
module.exports = router;