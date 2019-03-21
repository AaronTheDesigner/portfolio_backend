const graphql = require("graphql");
const Project = require("../../models/Project");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

/*type - schema types: Project, User. 
Schemas defining how graphql defines database schemas. 
Should coorespond to models. Types are not exported but defined

input - defines what the user can define for the object

rootQuery - defines how graphql searches for data

rootMutation - defines what the user can do with the data(CRUD)

schema: rootQuery and rootMutation

*/

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",

  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
  //mutation: RootMutation
});
