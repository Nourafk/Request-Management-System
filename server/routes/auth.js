const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middlewares/auth");



//-------------- register ----------------
router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  // check all the missing fields.
  if (!name || !username || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required field.` });

  // name validation.
  if (name.length > 25)
    return res
      .status(400)
      .json({ error: "name can only be less than 25 characters" });

  // username validation.
  const usernameReg = /^(?=.*[A-Za-z0-9]).{3,30}$/;

  if (!usernameReg.test(username))
    return res
      .status(400)
      .json({ error: "please enter a valid username." });


  // password validation.
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be at least 6 characters long" });


  try {
    const doesUserAlreadyExist = await User.findOne({ username });
    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: `a user with that username [${username}] already exists so please try another one.`,
      });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, username, password: hashedPassword });

    // save the user 
    const result = await newUser.save();
    result._doc.password = undefined;
    return res.status(201).json({ ...result._doc });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }

});

//-------------- login ----------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required fields!" });

  // username validation.
  const usernameReg = /^(?=.*[A-Za-z0-9]).{3,30}$/;

  if (!usernameReg.test(username))
    return res
      .status(400)
      .json({ error: "please enter a valid username." });


  try {
    const doesUserExits = await User.findOne({ username });
    if (!doesUserExits)
      return res.status(400).json({ error: "Invalid username or password!" });

    // if there were any user present.
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid username or password!" });

    const payload = { _id: doesUserExits._id };
    const token = jwt.sign(payload, "" + process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = { ...doesUserExits._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

module.exports = router;