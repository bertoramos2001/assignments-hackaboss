const bd = require('./bd_mock');

const sendContract = (req, res, next) => {
    const { email } = req.params;
    const decodedToken = req.auth;
    const user = bd.getUser(email);
    const { mensaje } = req.body;

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    if(!decodedToken || decodedToken.role !== 'ojeador') {
        const AuthError = new Error('Debes estar registrado como ojeador para poder enviar contrataciones');
        AuthError.status = 404;
        next(AuthError)
        return;
    }
    if(!mensaje) {
        const emptyMessage = new Error('No puedes enviar un mensaje vacío');
        emptyMessage.status = 404;
        next(emptyMessage)
        return;
    }

    bd.saveContract(decodedToken.id, decodedToken.email, user.id, user.email, mensaje);

    res.send();
}

const showReceivedContracts = (req, res, next) => {
    const decodedToken = req.auth;

    const listaContratosRecibidos = bd.listReceivedContracts(decodedToken.id);

    res.json(listaContratosRecibidos);
}

const showSentContracts = (req, res, next) => {
    const decodedToken = req.auth;

    const listaContratosEnviados = bd.listSentContracts(decodedToken.id);

    res.json(listaContratosEnviados);
}

module.exports = {
    sendContract,
    showReceivedContracts,
    showSentContracts
}
