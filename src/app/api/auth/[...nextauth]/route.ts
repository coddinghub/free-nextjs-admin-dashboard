// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        //   })
    ],
    callbacks: {
        async signIn({ user}) {
          if (user.email?.includes("sam.sys.hk@gmail.com")) {
            return true;
          } else {
            return false;
          }
        },
        async redirect({ }) {
          return "/";
        },
      },
})

export { handler as GET, handler as POST }
