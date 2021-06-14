const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-cors'), {
    origin: true
})
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ashishthesatan', 'ashishthesatan', '', {
    host: 'localhost',
    dialect: 'postgres'
});
(async ()=>{try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}})();

const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});
User.sync();

fastify.route({
    method: 'POST',
    url: '/',
    schema: {

        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' }
                }
            }
        }
    },
    handler: async (request, reply) => {
        const {username, password} = request.body;
        const user = await User.create({ username, password });
        return {success:true}
    }
})

const start = async () => {
    try {
        await fastify.listen(4000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()