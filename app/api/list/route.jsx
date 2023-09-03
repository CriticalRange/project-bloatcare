import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json(
    {
      api: {
        method: "GET",
        location: "/api",
      },
      comments: {
        method: "GET",
        location: "/api/comments/",
      },
      getRandomPosts: {
        method: "GET",
        location: "/api/getRandomPosts",
      },
      list: "/api/list",
      posts: {
        method: "GET",
        location: "/api/posts",
        [postId]: {
          method: "GET",
          location: "/api/posts/[postId]",
        },
      },
      usernames: {
        method: "GET",
        location: "/api/usernames",
        [username]: {
          method: "GET",
          location: "/api/usernames/[username]",
        },
      },
      users: {
        method: "GET",
        location: "/api/users",
        [userUid]: {
          method: "GET",
          location: "/api/users/[userUid]",
        },
      },
    },
    {
      status: 200,
    }
  );
}
