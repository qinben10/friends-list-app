const Sequelize = require('sequelize')
const conn = new Sequelize('postgres://localhost/friendList');

const Friends = conn.define('friend',{
    name:{
        type: Sequelize.STRING
    },
    rating:{
        type: Sequelize.INTEGER,
        defaultValue: 5
    }
})

const syncAndSeed = async()=>{
    await conn.sync({force: true});
    const [moe, lucy, larr] = await Promise.all([
        Friends.create({name: 'moe', rating: 10}),
        Friends.create({name: 'lucy', rating: 5}),
        Friends.create({name: 'larry', rating: 1})
    ])
}

module.exports = {
    syncAndSeed,
    model:{
        Friends
    }
}