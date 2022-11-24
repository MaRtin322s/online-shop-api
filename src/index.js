const express = require('express');
const { initialDatabase } = require('../config/db');
const { initViewEngine } = require('../config/hbs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router');
const app = express();
const port = 3030;

initViewEngine(app);
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

initialDatabase()
    .then(() => {
        console.log("Database initialized successfully!");
        app.listen(port, () => console.log(`Server is working at: http://localhost:${port}`));
    })
    .catch((error) => {
        console.log("Database error: " + error.message);
    });
