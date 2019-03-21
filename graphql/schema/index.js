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
    description: { type: GraphQLString },
    url: { type: GraphQLString },
    github: { type: GraphQLString }
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
  name: "RootMutation",
  fields: {
    createProject: {
      type: ProjectType,
      // args - the equivalent of input type in template resolver
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        github: { type: new GraphQLNonNull(GraphQLString) }
      },
      // why are parents needed to make mutations work?
      resolve(parent, args) {
        let project = new Project({
          title: args.title,
          subtitle: args.subtitle,
          description: args.description,
          url: args.url,
          github: args.github
        });
        return project.save();
      }
    },
    deleteProject: {
      type: ProjectType,
      description:
        "delete project with id and return the project that has been deleted",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (value, { id }) => {
        return Project.findByIdAndDelete(id);
      }
    },
    updateProject: {
      type: ProjectType,
      description: "edit object with id and return edited object",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (value, { id }, args) => {
        let project = new Project({
          title: args.title,
          subtitle: args.subtitle,
          description: args.description
        });
        return Project.findByIdAndUpdate(id, project);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
