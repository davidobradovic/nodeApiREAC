const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    
    //validacija
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Provjera korisnika u bazi
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Korisnik sa tim mailom vec postoji")

    const phoneExits = await User.findOne({ phone: req.body.phone })
    if (phoneExits) return res.status(400).send("Korisnik sa tim brojem vec postoji")

    // Enkripcija sifre
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //Create a new uses
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {

        //validacija
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // Provjera korisnika u bazi
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Ne postojeci email")

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Netacna sifra")

        // Create and assign token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)

})

module.exports = router;