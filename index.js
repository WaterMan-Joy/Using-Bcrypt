const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}
const login = async (pw, hashPassword) => {
    const result = await bcrypt.compare(pw, hashPassword);
    if (result) {
        console.log('LOGGED YOU IN!');
    }
    else {
        console.log('INCORRECT!');
    }
}

// hashPassword('monkey');

login('monkey', '$2b$10$rAdt/DWnIxiYdZ9NQUFfEOBpyzKaDPcj5xNo6eSUOewl2D.ePpGv.');