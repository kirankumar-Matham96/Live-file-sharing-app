export const errorHandler = (err, req, res, next) => {
  if (err) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  next();
};
