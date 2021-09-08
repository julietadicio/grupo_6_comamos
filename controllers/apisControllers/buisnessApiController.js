const express = require('express');
const path = require('path');
const router = express.Router ();
const fs = require('fs');
const { fileLoader } = require('ejs');
const { FILE } = require('dns');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const e = require('express');

const db = require ('../../database/models');
const { Op } = require("sequelize");

const controller = {
    loginBuisness: (req, res) => {
        return res.render ('buisness-login');
    }
}

module.exports = controller;    