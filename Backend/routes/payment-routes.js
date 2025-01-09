const express = require('express');
const { auth, isStudent } = require('../middlewares/auth-middlewares');
const { capturePayment, verifySignature } = require('../controllers/paymet-controller');

const router = express.Router();

router.post('/capturePayment',auth,isStudent,capturePayment);
router.post('/verifySignature',verifySignature);

module.exports = router;