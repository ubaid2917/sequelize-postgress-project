const {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controller/projectController");
const { authentication, restrictTo } = require("../controller/authController");

const router = require("express").Router();

router
  .route("/")
  .post(authentication, restrictTo("1", "2"), createProject)
  .get(authentication, getAllProject);

router.route("/:id").get(authentication, getProjectById);

router.route("/:id").patch(authentication, updateProject);
router.route("/:id").delete(authentication, deleteProject);
module.exports = router;
