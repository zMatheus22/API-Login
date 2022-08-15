const express = require("express");
const router = express.Router();

const auth = require('../controllers/authController')

router.get("/", auth, (req, res) => {
    if(req.user.admin){
        res.send("Esse pagina só pode ser vista pelo Admin");
    }else{
        res.status(401).send("Not Admin: Acesso negado");
    }

  
});

module.exports = router;
