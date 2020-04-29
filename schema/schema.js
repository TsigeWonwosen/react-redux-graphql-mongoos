const graphql = require('graphql')
const Book =require('../models/Book')
const Author =require('../models/Author')

const _ =require('lodash')

const {
GraphQLObjectType,
GraphQLString,
GraphQLID,
GraphQLSchema,
GraphQLInt,
GraphQLList,
GraphQLNonNull
}= graphql


// const Books =[
// {name:'Name of the Wind',genre:'Fantasy',id:'1',authorId:'1'},
// {name:'The Final Empire',genre:'Fantasy',id:'2',authorId:'2'},
// {name:'The Long Earth',genre:'Sci-Fi',id:'3',authorId:'3'},
// {name:'Tikusat',genre:'Sibhat',id:'4',authorId:'4'},
// {name:'Ke Admas Bashager',genre:'Paulos Gnogno',id:'5',authorId:'5'},
// {name:'Ye berqa zemta',genre:'Tesfay',id:'6',authorId:'4'},
// {name:'Ye gazetegna  Mastawesh',genre:'Paulos Gnogno',id:'7',authorId:'4'}
// ]

// const Authers =[
// {name:'Name of the Wind',age:'48',id:'1'},
// {name:'The Final Empire',age:'70',id:'2'},
// {name:'The Long Earth',age:'80',id:'3'},
// {name:'Tikusat',age:'65',id:'4'},
// {name:'Ke Admas Bashager',age:'45',id:'5'}
// ]
const BookType = new GraphQLObjectType({
	name:"Book",
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		genre:{type:GraphQLString},
		author:{
			type:AutherType,
			resolve(parent,args){
				// return _.find(Author,{id:parent.authorId})
				return Author.findById(parent.authorId)
			}
			}

		
	})
})

const AutherType = new GraphQLObjectType({
	name:"Auther",
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		age:{type:GraphQLInt},
		books:{
			type:new GraphQLList(BookType),
			resolve(parent,args){
				// return _.filter(Book,{authorId:parent.id})
				return Book.find(parent.id)
			}

		}
	})
})

const RootQueary = new GraphQLObjectType({
	name:'RootQuearyType',
	fields:{
		book:{
			type:BookType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
			// code to get data from DB//
			// return _.find(Book,{id:args.id})
			return Book.findById(args.id)
			}
			},
		
		auther:{
			type:AutherType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
			// code to get data from DB//	
			// return _.find(Author,{id:args.id})
			return Author.findById(args.id)
			}
			
		},
		books:{
				type:new GraphQLList(BookType),
				resolve(parent,args){

					return Book.find({})
				}
			},
		authers:{
			type: new GraphQLList(AutherType),
			resolve(parent,args){
				return Author.find({});
			}
		}
	},
})

const Mutation = new GraphQLObjectType({
	name:'Mutation',
	fields:{
		addAuthor:{
			type:AutherType,
			args:{
				name:{type:new GraphQLNonNull(GraphQLString)},
				age:{type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve(parent,args){
				let author = new Author({
					name:args.name,
					age:args.age
				})
				return author.save();
			}
		},
		addBook:{
			type:BookType,
			args:{
				name:{type: new GraphQLNonNull(GraphQLString)},
				genre:{type:new GraphQLNonNull(GraphQLString)},
				authorId:{type:new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent,args){
				let book = new Book({
					name:args.name,
					genre:args.genre,
					authorId:args.authorId
				})
				return book.save();
			}
		}
	}
})
module.exports = new GraphQLSchema({
	query:RootQueary,
	mutation:Mutation

});