const bd = require('./bd_mock')

const postVideo = (req, res, next) => {
    console.log(req.file);
    res.send();
}

module.exports = {
    postVideo
}