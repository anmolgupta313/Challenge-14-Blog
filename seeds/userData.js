
const {User} = require('../Models');

const userData = [
    {
        user_name: 'Anmolgupta313',
        password: 'Lomna321',
    },
    {
        user_name: 'Anmolgupta31',
        password: 'Lomna321',
    },
    {
        user_name: 'Anmolgupta3',
        password: 'Lomna321',
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
