const bd = require('./bd_mock')

const postVideo = (req, res, next) => {
    let videoFamilia = '';
    const { titulo, descripcion } = req.body;
    const email = req.params;

    if (!req.file) {
        const profileImageError = new Error('Debes añadir un vídeo');
        profileImageError.status = 400;
        next(profileImageError);
    } else {
        videoFamilia = req.file.path;
    }
    const id = (bd.getUser(email.email)).id;
    bd.saveVideo(id, titulo, descripcion, videoFamilia);
    res.json(videoFamilia);
}

module.exports = {
    postVideo
}