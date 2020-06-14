let users = [];

const getUser = (email) => {
    const matchEmail = user => user.email === email;
    return users.find(matchEmail);
}

const saveUser = (email, password, role, name, surname, gender, province, birthDate, actualClub, categories, positions, skills) => {
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
    saveUser,
    getListOfUsers
}