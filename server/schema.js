const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt,  GraphQLSchema} = require('graphql');
const axios = require('axios');

//Person Type
const personType = new GraphQLObjectType({
    name : 'Person',
    fields : () => ({
        name : { type : GraphQLString},
        height : {type : GraphQLString},
        mass : {type : GraphQLString},
        gender : {type : GraphQLString},
        homeworld : {type : GraphQLString},
        homeworld : {type : GraphQLString},
        hair_color: {type : GraphQLString},
        skin_color: {type : GraphQLString},
        eye_color: {type : GraphQLString},
        birth_year: {type : GraphQLString},
        planet : {
            type : homePlanet,
            resolve(parent, args){
                return  axios.get(parent.homeworld)
                .then(res => res.data)
            }
        }
    })
})

//search for a person type
const searchType =  new GraphQLObjectType({
    name : 'search',
    fields : () => ({
        name : { type : GraphQLString},
        height : {type : GraphQLString},
        mass : {type : GraphQLString},
        gender : {type : GraphQLString},
        homeworld : {type : GraphQLString},
        hair_color: {type : GraphQLString},
        skin_color: {type : GraphQLString},
        eye_color: {type : GraphQLString},
        birth_year: {type : GraphQLString},
        planet : {
            type : homePlanet,
            resolve(parent, args){
                return  axios.get(parent.homeworld)
                .then(res => res.data)
            }
        }
    })
})

//Planet Type
const homePlanet = new GraphQLObjectType({
    name : 'home',
    fields : () => ({
        name : { type : GraphQLString},
        climate : { type : GraphQLString},
        population : { type : GraphQLString},
        rotation_period : { type : GraphQLString},
        orbital_period: { type : GraphQLString},
        diameter: { type : GraphQLString},
        gravity: { type : GraphQLString},
        terrain: { type : GraphQLString},
        surface_water:{ type : GraphQLString}
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        Person :{
            type : new GraphQLList(personType),
            args :{
                url : {type : GraphQLString}
            },
            resolve(parent, args){
                return  axios.get(args.url)
                .then(res => res.data.results)
            }
        },

        searchPerson :{
            type : searchType,
            args : {
                personName : {type : GraphQLString}
            },
            resolve (parent, args){
                return  axios.get(`https://swapi.dev/api/people/?search=${args.personName}`)
                .then(res => res.data.results[0])
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery
})