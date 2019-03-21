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
    //read all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      }
    },
    //read individual project by id
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      // args - the equivalent of input type in template resolver
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let project = new Project({
          title: args.title,
          subtitle: args.subtitle,
          description: args.description
        });
        return project.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
