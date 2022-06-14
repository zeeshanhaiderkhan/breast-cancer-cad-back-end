const { verifyRole ,verifyToken} = require("../middleware/verifyToken");
const {getAllAdmins,getAdmin,deleteAdmin,updateAdmin} = require("../controllers/admin");
const router = require("express").Router();

router.get("/all",getAllAdmins);
router.get("/:id",getAdmin);
router.delete("/:id",deleteAdmin)
router.put("/:id",updateAdmin)

module.exports = router;