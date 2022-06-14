const { verifyRole ,verifyToken} = require("../middleware/verifyToken");
const {getAllDoctors,getDoctor,deleteDoctor,updateDoctor,assignPatient,
getPatientsAssigned    } = require("../controllers/doctor");
const router = require("express").Router();

router.get("/all",getAllDoctors);
router.get("/:id",getDoctor);
router.delete("/:id",deleteDoctor)
router.put("/:id",updateDoctor)
router.post('/assign/:id',assignPatient)
router.get('/patients/:id',getPatientsAssigned)



module.exports = router;