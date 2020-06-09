const router = require("express").Router();

const {
  signIn,
  signUp,
  requireSignin,
  isAuth,
  userById,
  signout
} = require("../controllers/auth");

router.get("/secret/:userId", requireSignin,isAuth, (req, res) => {
  res.json({

    _id:req.profile
  });
});

router.get('/signout', signout)

router.post("/signup", signUp);
router.post("/login", signIn);

router.param("userId", userById);
module.exports = router;
