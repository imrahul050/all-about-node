require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {

    return res.json({
        success: true,
        message: 'Blog API Running'
    });

});

console.log('APP_URL =', process.env.APP_URL);

const startServer = async () => {
    await connectDB();
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };

startServer();