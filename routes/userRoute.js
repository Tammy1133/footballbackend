const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const config = process.env;

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(408).send("All input is required");
    } else {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        email.includes(".com")
      ) {
        if (password.split("").length > 7) {
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await userModel.findOne({ email });

          if (oldUser) {
            res.status(409).send("User Already Exist. Please Login");
          }

          //Encrypt user password
          encryptedUserPassword = await bcrypt.hash(password, 10);

          // Create user in our database
          const user = await userModel({
            email: email.toLowerCase(), // sanitize
            password: encryptedUserPassword,
          });

          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "4s",
            }
          );
          // save user token
          user.token = token;
          await user.save();

          // return new user
          res.status(201).json(user);
        } else {
          res.status(402).send("Password should be longer than 7 characters");
        }
      } else {
        res.status(405).send("Invalid Email");
      }
    }
  } catch (err) {
    console.log(err);
  }

  // Our register logic ends here
});

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await userModel.findOne({ email });
    const logintoken = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "20m",
      }
    );
    // save user token

    const userToBeUpdated = await userModel.findOneAndUpdate(
      { email },
      { loginToken: logintoken }
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      // const token = jwt.sign(
      //   { user_id: user._id, email },
      //   process.env.TOKEN_KEY,
      //   {
      //     expiresIn: "10m",
      //   }
      // );
      // // save user token
      // user.token = token;
      const token = user.token;
      if (!token) {
        const updateUser = await userModel.findOneAndUpdate(
          { email },
          { plan: "free" }
        );
      }
      try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
      } catch (err) {
        const updateUser = await userModel.findOneAndUpdate(
          { email },
          { plan: "free" }
        );
      }

      const newUser = await userModel.findOne({ email });

      return res.status(200).json(newUser);
    }
    return res.status(400).send("Invalid Credentials");

    // Our login logic ends here
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/validateUser", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).send("Timeout");
  } else {
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      res.status(200).send("Successful");
      // req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(405).send(error);
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deleted = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send(req.params.id);
  } catch (error) {
    res.status(405).send(error);
  }
});

router.post("/updateuser", async (req, res) => {
  try {
    // Get user input
    const { email, plan } = req.body;
    console.log(email);
    console.log(plan);
    // Validate user input

    // Validate if user exist in our database
    const user = await userModel.findOne({ email });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );
    // save user token

    const userToBeUpdated = await userModel.findOneAndUpdate(
      { email },
      { token: token, plan: plan }
    );
    res.status(200).send("Successful");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
