const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log("errorHandler");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.log(err);
  res.json({
    message: err.message,
    stack: process.env.NOVE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
