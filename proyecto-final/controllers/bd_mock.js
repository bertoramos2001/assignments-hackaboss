let users = [];

const getUser = (email) => {
    const matchEmail = user => user.email === email;
    return users.find(matchEmail);
}

const saveFamily = (email, password, role, namePlayer, surnamePlayer, nameTutor, surnameTutor, gender, province, birthDate, actualClub, category, positions, skills) => {
    users.push({
        email,
        password,
        role,
        namePlayer,
        surnamePlayer,
        nameTutor,
        surnameTutor,
        gender,
        province,
        birthDate,
        actualClub,
        category,
        positions,
        skills
    })
}

const saveScout = (email, password, role, name, surname, gender, province, birthDate, actualClub, categories, positions, skills) => {
    users.push({
        email,
        password,
        role,
        name,
        surname,
        gender,
        province,
        birthDate,
        actualClub,
        categories,
        positions,
        skills
    })
}

const getListOfUsers = () => {
    return users;
}


module.exports = {
    getUser,
    saveScout,
    saveFamily,
    getListOfUsers
}