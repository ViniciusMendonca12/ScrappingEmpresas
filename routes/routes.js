var express = require("express");
var app = express();
var router = express.Router();
 const ChatJivoController = require("../controller/ChatJivoController");


router.get("/",ChatJivoController.olaMundo)


module.exports = router;