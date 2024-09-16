const { MongoClient } = require('mongodb');
require('dotenv').config();


connection = () => {
    return MongoClient
        .connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((conn) => conn.db(process.env.DB_NAME))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}


module.exports = connection;