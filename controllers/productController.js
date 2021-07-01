const express = require('express');
const router = express.Router ();

const controller = {
    index: (req,res) => {
        return res.render ('index');
    },
    detail: (req,res) => {
        return res.render ('product')
    }
}

module.exports = controller;