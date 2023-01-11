const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Importovanje routera
const authRoute = require('./routes/auth');

dotenv.config();
mongoose.set('strictQuery', false)

mongoose.connect(process.env.PLASTICNI_BUREK, {useNewUrlParser: true},
 () => console.log('mongoDb radi')
)   

app.use(express.json());

// Routde middleware
app.use('/api/user', authRoute)

app.listen(3000, () => console.log('Backend je pokrenut'))