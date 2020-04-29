const express = require('express')
const mongoose = require('mongoose')
const schema = require('./schema/schema')

const graphqlHTTP = require('express-graphql')

// 
mongoose.connect('mongodb+srv://wonde:wondeshi@wscluster-hikgh.mongodb.net/graphql_test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true},
	()=>console.log("Successfuly connected with Db."))
const app = express();

app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
	
}));

app.listen(5000,()=> console.log('now listing for requests on port 5000'))