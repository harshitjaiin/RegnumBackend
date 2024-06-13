module.exports = {
    port: process.env.PORT || 3000,
    dbURL : process.env.DB_URI || "mongodb+srv://harshitjaiin:DTU188jain@harshitxdev.6zuqfbb.mongodb.net/TestServer",
    jwtSecret : process.env.JWT_SECRET || "RegnumNewUser",
    email:{
        service: process.env.EMAIL_SERVICE || 'gmail',
        user : process.env.EMAIL_USER || 'harshitjain.tj@gmail.com',
        pass : process.env.EMAIL_PASS || 'DTU188@jain'
    }
    //hhjdh
};