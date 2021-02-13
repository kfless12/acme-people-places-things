const express = require('express');
const Sequelize = require('sequelize');
const { STRING, INTEGER, DATE } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/purchases");


const People = conn.define('people', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    }

});
const Places = conn.define('places', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    }

});
const Things = conn.define('things', {
    name: {
        type: STRING,
        allowNull: false,
        unique: false
    },
    count: { 
        type: INTEGER,
        allowNull: false,
        unique: false

    }, 
    date : {
        type: DATE,
        allowNull: false,
        unique: false
    }

});


Things.belongsTo(People)
People.hasMany(Things)

Things.belongsTo(Places)
Places.hasMany(Things)

let thingsarr = ['foo', 'bar', 'bazz', 'quq']

const synAndSeed = async () =>{
    await conn.sync({force: true});
    const [moe, lucy, larry] = await Promise.all([ 'moe', 'lucy', 'larry'].map( name => People.create({name : name})))

    const [NYC, Chicago, LA, Dallas] = await Promise.all([ 'NYC', 'Chicago', 'LA', 'Dallas'].map( name => Places.create({name : name})))
}

synAndSeed();



