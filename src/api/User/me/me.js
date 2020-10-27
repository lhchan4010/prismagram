import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      return { user: userProfile, posts };
    },
  },
  User: {
    fullName: (_, __, { request }) => {
      console.log(request);
      return "hello";
    },
  },
};
