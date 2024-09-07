async function imageUploadController(req, res) {
    console.log(req.files);
    
  res.send(req.files.path);
}

module.exports = imageUploadController;
