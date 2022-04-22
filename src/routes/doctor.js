const { verifyRole ,verifyToken} = require("../middleware/verifyToken");
const {getAllDoctors,getDoctor,deleteDoctor,updateDoctor} = require("../controllers/doctor");
const router = require("express").Router();

router.get("/all",verifyRole(["admin","doctor","patient"]),getAllDoctors);
router.get("/:id",verifyRole(["admin","doctor","patient"]),getDoctor);
router.delete("/:id",verifyRole(["admin","doctor","patient"]),deleteDoctor)
router.put("/:id",verifyRole(["admin","doctor","patient"]),updateDoctor)

module.exports = router;