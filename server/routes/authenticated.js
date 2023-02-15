const isAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.status(401).send({
      success: false,
      message: 'You need to be authenticated to access this page!'
    })
  } else {
    next();
  }
};

module.exports isAuthenticated;

