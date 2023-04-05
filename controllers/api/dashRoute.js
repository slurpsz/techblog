const router = require("express").Router();
router.get("/new-posts", async (req, res) => {
  res.render("new-posts");
});
module.exports = router;