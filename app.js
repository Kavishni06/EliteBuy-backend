const express=require('express');
const cors = require('cors');
const app=express();
const dotenv=require('dotenv');
const path=require('path');


const connectDatabase=require('./config/connectDatabase')
dotenv.config({path: path.join(__dirname,'config','config.env') })
const products=require('./routes/product');
const orders=require('./routes/order');
connectDatabase();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200', // Allow only your Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials if needed
}));
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, '..','frontend','dist','frontend','browser')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'..','frontend','dist','frontend','browser','index.html'))
    });
}
app.listen(process.env.PORT,() => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});