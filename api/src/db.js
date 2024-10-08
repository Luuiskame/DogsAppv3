require('dotenv').config();
const pg = require('pg')
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, POSTGRES_URL,
} = process.env;

const sequelize = POSTGRES_URL
  ? new Sequelize(POSTGRES_URL, {
      dialect: 'postgres',
      dialectModule: pg,
      logging: false, 
      native: false, 
      dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false, 
        }
      }
    })
  : new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogsapp`,
    {
      logging: false,
      native: false
    }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones
Dog.belongsToMany(Temperament, {through: 'Dogs_temperament'})
Temperament.belongsToMany(Dog, {through: 'Dogs_temperament'})
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
