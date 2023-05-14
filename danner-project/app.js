const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'danner-project')));

app.get('*', (req, res) => {
    const url = path.join(__dirname, 'dist', 'danner-project', 'index.html');
    res.sendFile(url);
});

app.listen(5000, () => {
    console.log('app is running');
})