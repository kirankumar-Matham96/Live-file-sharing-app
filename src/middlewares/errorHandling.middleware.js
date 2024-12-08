export const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log("🚀 ~ errorHandler ~ err:", err.stack);

    if (err.code == 11000) {
      return res.status(400).json({
        success: false,
        message: "Email exists. Please log in instead",
      });
    }

    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  next();
};
