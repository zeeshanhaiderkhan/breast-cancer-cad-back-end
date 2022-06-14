const { verifyRole ,verifyToken} = require("../middleware/verifyToken");
const {getAllPatients,getPatient,deletePatient,updatePatient,getAssignedPatients} = require("../controllers/patient");
const router = require("express").Router();

router.get("/all",getAllPatients);
router.get("/:id",verifyRole(["admin","doctor","patient"]),getPatient);
router.delete("/:id",verifyRole(["admin","doctor","patient"]),deletePatient)
router.put("/:id",verifyRole(["admin","doctor","patient"]),updatePatient)
//get all unassigned patients // bool=='1' means assigned //bool=='0' means not assigned
router.get("/assigned/:bool",getAssignedPatients)



module.exports = router;