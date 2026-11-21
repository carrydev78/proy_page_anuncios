const express = require('express');

const routes = require('./router');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', function (req, res) {
   return res.json({ mensaje: 'Bienvenido a mi API desde el backend' });
});

app.use('/api', routes);

app.listen(PORT, function () {
    console.log(`Servisor iniciado en: http://127.0.0.1:${PORT}`);
});
