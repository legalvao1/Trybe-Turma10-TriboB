const connection = require('./connection');
const { ObjectId } = require('mongodb'); // para o mongo

const userIsValid = (firstName, lastName, email, password) => {
    if (!firstName) return false;
    if (!lastName) return false;
    if (!email) return false;
    if (!password || typeof password !== 'string' || password.length < 6) return false;

    return true;
}


const createUser = (firstName, lastName, email, password) =>
    connection()
        .then((db) => db.collection('users').insertOne({ firstName, lastName, email, password }))
        .then(result => ({ id: result.insertedId, firstName, lastName, email }));


const getAllUsers = () => {
    return connection()
        .then((db) => db.collection('users').find().toArray())
        // .then(users => users)
}


const getUserById = (userId) => {
    if (!ObjectId.isValid(userId)) {
        return null;
    }

    const userData = connection()
        .then((db) => db.collection('users').findOne(new ObjectId(userId)));
  
    if (!userData) return null;
  
    return userData; 
};
  
  
module.exports = {
    userIsValid,
    createUser,
    getAllUsers,
    getUserById
}

