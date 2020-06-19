const bd = require('./bd_mock')

const postVideo = (req, res, next) => {
    let videoFamilia = '';
    const { titulo, descripcion } = req.body;
    const { email } = req.params;

    if (!req.file) {
        const profileImageError = new Error('Debes añadir un vídeo');
        profileImageError.status = 400;
        next(profileImageError);
    } else {
        videoFamilia = req.file.path;
    }
    const id = (bd.getUser(email)).id;
    bd.saveVideo(id, titulo, descripcion, videoFamilia);
    res.json(videoFamilia);
}

const showVideos = (req, res, next) => {
    const { email } = req.params;
    const user = bd.getUser(email);

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }

    res.json(bd.getListOfVideos(user.id));
}

const deleteVideo = (req, res, next) => {
    let { idVideo } = req.params;
    bd.deleteVideo(parseInt(idVideo));
    res.send();
}

module.exports = {
    postVideo,
    showVideos,
    deleteVideo
}