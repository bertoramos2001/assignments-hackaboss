const bd = require('./bd_mock')

const postVideo = (req, res, next) => {
    let videoFamilia;
    const { titulo, descripcion } = req.body;
    const { email } = req.params;
    const user = bd.getUser(email);

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if (!req.file) {
        const profileImageError = new Error('Debes añadir un vídeo');
        profileImageError.status = 400;
        next(profileImageError);
        return;
    } else {
        videoFamilia = req.file.path;
    }
    const id = user.id;
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

    res.json(bd.getListOfVideos(user.id));
}

const deleteVideo = (req, res, next) => {
    const { idVideo, email } = req.params;
    const user = bd.getUser(email);

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    const videoToDelete = bd.getVideo(idVideo);

    if (!videoToDelete) {
        const videoError = new Error(`No existe el video que estas buscando`);
        videoError.status = 404;
        next(videoError);
        return;
    }

    if (parseInt(videoToDelete.id) !== parseInt(user.id)) {
        const videoError = new Error(`No tienes permiso para borrar un video que no es tuyo`);
        videoError.status = 403;
        next(videoError);
        return;
    }

    bd.deleteVideo(idVideo);
    res.send();
}

module.exports = {
    postVideo,
    showVideos,
    deleteVideo
}