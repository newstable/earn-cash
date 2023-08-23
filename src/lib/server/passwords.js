import bcrypt from 'bcrypt';

export const hashPassword = async password => await bcrypt.hash(password, 10);

export const checkPassword = async(hash, password) => {
    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
    return bcrypt.compare(password, hash);
}