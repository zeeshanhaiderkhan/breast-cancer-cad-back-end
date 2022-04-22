const { verifyRole ,verifyToken} = require("../middleware/verifyToken");
const {getAllAdmins,getAdmin,deleteAdmin,updateAdmin} = require("../controllers/admin");
const router = require("express").Router();

router.get("/all",verifyRole(["admin","doctor","patient"]),getAllAdmins);
router.get("/:id",verifyRole(["admin","doctor","patient"]),getAdmin);
router.delete("/:id",verifyRole(["admin","doctor","patient"]),deleteAdmin)
router.put("/:id",verifyRole(["admin","doctor","patient"]),updateAdmin)

module.exports = router;