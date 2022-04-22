const { verifyRole ,verifyToken} = require("../middleware/verifyToken");
const {getAllPatients,getPatient,deletePatient,updatePatient} = require("../controllers/patient");
const router = require("express").Router();

router.get("/all",verifyRole(["admin","doctor","patient"]),getAllPatients);
router.get("/:id",verifyRole(["admin","doctor","patient"]),getPatient);
router.delete("/:id",verifyRole(["admin","doctor","patient"]),deletePatient)
router.put("/:id",verifyRole(["admin","doctor","patient"]),updatePatient)

module.exports = router;