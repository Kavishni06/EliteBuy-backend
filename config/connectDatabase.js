const mongoose=require('mongoose');
const connectDatabase=()=>{
mongoose.connect(process.env.DB_URL).then((con) =>{
    console.log('MongoBD connected to hast:'+con.connection.host)
})
};
module.exports=connectDatabase;