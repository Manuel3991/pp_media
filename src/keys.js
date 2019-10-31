module.exports = {

    database: {
        // host: 'localhost',
        // user: 'root',
        // password: 'root',
        // database: 'socialmedia'

        host     : process.env.MYSQL_ADDON_HOST || 'localhost',
    	database : process.env.MYSQL_ADDON_DB || 'socialmedia',
    	user     : process.env.MYSQL_ADDON_USER || 'root' ,
    	password : process.env.MYSQL_ADDON_PASSWORD || 'root'
    }
};