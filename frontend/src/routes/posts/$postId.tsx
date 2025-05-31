import { createFileRoute, useLoaderData } from "@tanstack/react-router";

interface Comment {
  id: number;
  content: string;
  author: string;
}

interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  username: string;
  vote: number;
  comment: number;
  comments: Comment[];
  timestamp: string;
}

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params }) => {
    console.log("params", params);
    try {
      const data = await new Promise<PostData>((resolve) => {
        setTimeout(() => {          
          resolve({
            id: 1,
            title: "First post",
            content: "This is my first post!",
            author: "user1",
            username: "user1",
            vote: 5,
            comment: 2006,
            comments: [
              {
                id: 1,
                content: "This is a comment",
                author: "user1",
              },
            ],
            timestamp: "2025-05-17T12:00:00Z",
          });
        }, 4000);
      });
      return data;
    } catch (error) {
      throw new Error("Failed to load post data");
    }
  },
  component: PostComponent,
  pendingComponent: () => <div>Loading post...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

function PostComponent() {
  // Simpler data access in newer TanStack Router versions
  const { title, content, author, username, vote, comment, timestamp, comments } = 
    useLoaderData({ from: Route.fullPath });
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post</h1>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="my-2">{content}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Author: {author}</p>
        <p>Username: {username}</p>
        <p>Votes: {vote}</p>
        <p>Comments: {comment}</p>
        <p>Posted: {new Date(timestamp).toLocaleString()}</p>
      </div>

      <h3 className="text-lg font-medium mt-6 mb-2">Comments</h3>
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="border p-3 rounded">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">By: {comment.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}