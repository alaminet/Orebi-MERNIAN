const secureAPI = (req, res, next) => {
  if (req.headers.authorization === "CAt7p0qqwYALAIY") {
    console.log("API Checked");
    next();
  } else {
    res.send({ error: "Invalid API" });
  }
};

module.exports = secureAPI;
