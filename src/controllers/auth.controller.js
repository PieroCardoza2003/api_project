import bcrypt from'bcrypt'

export const encryptPassword = async (passwrd) => {

    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(passwrd, salt)
}

export const comparePassword = async (passwrd, hash) => {

    return await bcrypt.compare(passwrd, hash)
}