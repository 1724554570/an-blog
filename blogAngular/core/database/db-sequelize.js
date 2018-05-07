import Sequelize from "sequelize";
import { mysqlDb } from '../config/db-cofig';
import { getLogger } from "../../lib/log-config";

const { database, user, password } = mysqlDb;
const loggerDb = getLogger('dberr');
const sequelize = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => { loggerDb.info('Connection has been established successfully.'); })
    .catch(err => { loggerDb.error('Unable to connect to the database:' + err); });


export default sequelize;