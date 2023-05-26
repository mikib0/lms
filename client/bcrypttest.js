import { hash as _hash } from 'bcrypt';

const hash = await _hash('1234', 10)
console.log(hash)
