const router = require('express').Router();
const {authorize_user,create_new_user,deauthorize_user} = require('../controllers/auth')
const upload = require("../middleware/upload");
const {verifyToken,verifRole} = require('../middleware/verifyToken');
require('dotenv').config();

router.post('/auth',authorize_user)
router.post('/new',create_new_user)
router.post('/deauth',verifyToken,deauthorize_user)


module.exports = router;
