
const authorise = function (permittedRoles) {
  return function (req, res, next) {
    isAllowed = false;
    user = req.user.user;
    console.log("user", user);
    user.roles.map((role) => {
      if (permittedRoles.includes(role)) {
        isAllowed = true;
      }
    });

    if (!isAllowed)
      return res.status(401).json({
        status: "failed",
        message: " You are not allowed to access this",
      });
    next();
  };
};
const Usertype = require("../models/newitem.model");
const userauthorise = function (permittedRoles) {
  return async function (req, res, next) {
    isAllowed = false;
    usertype = await Usertype.findById(req.params.id).populate("user")
    console.log(usertype.user.roles)
    usertype.roles.map((role) => {
      if (permittedRoles.includes(role)) {
        isAllowed = true;
      }
    });

    if (!isAllowed)
      return res.status(401).json({
        status: "failed",
        message: " You are not allowed to access this",
      });
    next();
  };
};

module.exports = {authorise, userauthorise}
