//Packages
const bcrype = require("bcryptjs");

//Imports
const Project = require("../../models/Project");
const User = require("../../models/User");

//__Resolvers__\\
module.exports = {
  //queries
  projects: async () => {
    try {
      return Project.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  users: async () => {
    try {
      await User.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  //create resolvers
  createProject: args => {
    const project = new Project({
      title: args.projectInput.title,
      subtitle: args.projectInput.subtitle,
      description: args.projectInput.description
    });
    let formattedProject;
    return project
      .save()
      .then(result => {
        formattedProject = { ...result._doc, _id: result.id };
        console.log(result);
        console.log(formattedProject);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
