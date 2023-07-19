const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc     Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, imagePath } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  //Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    imagePath,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      imagePath: user.imagePath,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

//@desc     Authenticate a user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      imagePath: user.imagePath,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

//@desc     Get user data
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json(user);
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req.body);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  try {
    const isMatch = await bcrypt.compare(req.body.confPassword, user.password);

    if (!isMatch) {
      throw new Error("Wrong password!");
    }
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      imagePath: req.body.imagePath,
    };
    if (req.body.newPassword !== "") {
      console.log("hellooo");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
      newUser.password = hashedPassword;
      console.log(newUser);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, newUser);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
  getUserById,
};
