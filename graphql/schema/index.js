const { buildSchema } = require("graphql");

/*type - schema types: Project, User. 
Schemas defining how graphql defines database schemas. 
Should coorespond to models

input - defines what the user can define for the object

rootQuery - defines how graphql searches for data

rootMutation - defines what the user can do with the data(CRUD)

schema: rootQuery and rootMutation

*/

module.exports = buildSchema(`

type Project {
    _id: ID
    title: String!
    subtitle: String!
    description: String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    cratedProjects: [Project!]
}

input ProjectInput {
    title: String!
    subtitle: String!
    description: String!
}

input UserInput {
    name: String!
    email: String!
    password: String!
}

type RootQuery {
    projects: [Project!]!
    users: [User!]!
}

type RootMutation {
    createProject(projectInput: ProjectInput): Project
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);
