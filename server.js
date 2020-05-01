require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema/schema')

const graphqlHTTP = require('express-graphql')

// 
mongoose.connect(process.env.DATA_BASE_KEY,{useNewUrlParser: true, useUnifiedTopology: true},
	()=>console.log("Successfuly connected with Db."))
const app = express();
app.use(cors())
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
	
}));

app.listen(5000,()=> console.log('now listing for requests on port 5000'))