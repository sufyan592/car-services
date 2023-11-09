const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365; // 60 seconds * 60 minutes * 24 hours * 365 days

// ====================================== Sigin =============================================

// exports.signin = async (req, res, next) => {
//   try {
//     const data = await User.create(req.body);
//     const token = await jwt.sign({ id: data._id }, process.env.SCREATE_KEY, {
//       expiresIn: expirationTime,
//     });
//     res.status(201).json({
//       status: "Success",
//       data: data,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fails",
//       error,
//     });
//   }
// };

// ====================================== login =============================================

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error(
        "Enter Details including name,email,password and Cpassword. Thanks"
      );
    }
    const user = await User.findOne({ email: email });
    const correct = await user.compairePass(password, user.password);

    if (!user || !correct) {
      throw new Error(
        "Your account is not found. Please create your Account First. Thanks"
      );
    }
    const token = await jwt.sign({ id: user._id }, process.env.SCREATE_KEY, {
      expiresIn: expirationTime,
    });
    res.cookie("jwt", token, {
      expiresIn: expirationTime,
      httpOnly: true,
    });

    res.status(200).json({
      status: "Success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fails",
      error,
    });
  }
};

// ====================================== Authorization =============================================

exports.auth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      throw new Error("Token not found!");
    }

    const decoded = await jwt.verify(token, process.env.SCREATE_KEY);

    // 3. Check User is Exist or not

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new Error("The user belonging to this token is not exist");
    }

    // 4. Check Password changed after token issued

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new Error("User recently changed Password! Please login again");
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "You're not allowed to visit this route. Just login.",
      error,
    });
  }
};
