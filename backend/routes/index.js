const {Router} = require("express");
const userRouter = require("./user");
const accountRouter = require("./balance");

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;