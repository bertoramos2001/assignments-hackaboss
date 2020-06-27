let users = [];
let id = 0;
let idVideos = 0;
let videos = [];
let contracts = [];
let experiences = [];
let idExperiences = 0;

const saveFamily = (email, password, role, name, surname, nameTutor, surnameTutor, gender, province, birthDate, actualClub, category, positions, skills, avatarPerfil) => {
    users.push({
        id: id++,
        email,
        password,
        role,
        name,
        surname,
        nameTutor,
        surnameTutor,
        gender,
        province,
        birthDate,
        actualClub,
        category,
        positions,
        skills,
        avatarPerfil
    })
}

const saveScout = (email, password, role, name, surname, gender, province, birthDate, actualClub, category, positions, skills, avatarPerfil) => {
    users.push({
        id:id++,
        email,
        password,
        role,
        name,
        surname,
        gender,
        province,
        birthDate,
        actualClub,
        category,
        positions,
        skills,
        avatarPerfil
    })
}

const getListOfUsers = () => {
    return users;
}

const getUser = (email) => {
    const matchEmail = user => user.email === email;
    return users.find(matchEmail);
}

const updateProfileFamily = (user, name, surname, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, positions, skills, avatarPerfil) => {
    user.email = emailTutor;
    user.name = name;
    user.surname = surname;
    user.nameTutor = nameTutor;
    user.surnameTutor = surnameTutor;
    user.gender = gender;
    user.province = province;
    user.birthDate = birthDate;
    user.actualClub = actualClub;
    user.category = category;
    user.positions = positions;
    user.skills = skills;
    user.avatarPerfil = avatarPerfil;
    return;
}

const updateProfileScout = (user, name, surname, email, gender, province, birthDate, actualClub, category, positions, skills, avatarPerfil) => {
    user.email = email;
    user.name = name;
    user.surname = surname;
    user.gender = gender;
    user.province = province;
    user.birthDate = birthDate;
    user.actualClub = actualClub;
    user.category = category;
    user.positions = positions;
    user.skills = skills;
    user.avatarPerfil = avatarPerfil;
    return;
}

const saveVideo = (idUsuario, titulo, descrpicion, videoFamilia) => {
    videos.push({
        id: idUsuario,
        idVideo: idVideos++,
        titulo,
        descrpicion,
        videoFamilia
    })
    return;
}

const getListOfVideos = (userId) => {
    return videos.filter(video => video.id === userId);
}

const getVideo = (idVideo) => {
    const matchVideo = video => parseInt(video.idVideo) === parseInt(idVideo);
    return videos.find(matchVideo);
}

const deleteVideo = (idVideo) => {
    videos = videos.filter((video => parseInt(video.idVideo) !== idVideo) && (parseInt(video.id) !== id));
    return;
}

const readList = () => {
    return users;
}

const saveContract = (idRemitente, emailRemitente, idDestinatario, emailDestinatario, mensaje) => {
    contracts.push({
        de: emailRemitente,
        idRemitente,
        para: emailDestinatario,
        idDestinatario,
        mensaje
    })
    return contracts
}

const listReceivedContracts = (idDestinatario) => {
    return contracts.filter(contract => parseInt(contract.idDestinatario) === parseInt(idDestinatario));
}

const listSentContracts = (idRemitente) => {
    return contracts.filter(contract => parseInt(contract.idRemitente) === parseInt(idRemitente));
}

const updatePassword = (usuario, nuevaContrasena) => {
    usuario.password = nuevaContrasena;
    return;
}

const saveExperience = (idUser, nombreEquipo, anoInicio, anoFin, resumen) => {
    experiences.push({
        id: idUser,
        idExperience: idExperiences++,
        nombreEquipo,
        anoInicio,
        anoFin,
        resumen
    })
    return;
}

const getListOfExperiences = (idUser) => {
    return experiences.filter(experience => experience.id === idUser);
}

const getExperience = (idExperience) => {
    const matchExperience = experience => parseInt(experience.idExperience) === parseInt(idExperience);
    return experiences.find(matchExperience);
}

const deleteExperience = (idExperience) => {
    experiences = experiences.filter(experience => parseInt(experience.idExperience) !== parseInt(idExperience));
    return;
}

module.exports = {
    deleteVideo,
    getListOfUsers,
    getListOfVideos,
    getUser,
    updateProfileFamily,
    updateProfileScout,
    readList,
    saveFamily,
    saveScout,
    saveVideo,
    getVideo,
    saveContract,
    listReceivedContracts,
    listSentContracts,
    updatePassword,
    getListOfExperiences,
    saveExperience,
    deleteExperience,
    getExperience
}