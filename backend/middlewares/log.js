const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to -> ${req.url}`)
  next();
}

module.exports = {logRequest}