export const notFound = (err, req, res, next) => {
  console.log(err);

  res.status(err.statusCode || 404).send(err.message);
};
