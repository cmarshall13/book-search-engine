const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, args) => {
            return User.findOne({args, });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate("savedBooks");
                return user;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);
            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect login information.');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedBooks = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args }},
                    { new: true, runValidators: true }
                );
                return updatedBooks;
            }
            throw new AuthenticationError('Please login to save a book!');
        }
    }
};

module.exports = resolvers;