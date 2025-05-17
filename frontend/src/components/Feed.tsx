export default function () {
  type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
  };

  const dummyPosts: Post[] = [
    {
      id: 1,
      title: "First post",
      content: "This is my first post!",
      author: "user1",
    },
    {
      id: 2,
      title: "Another Post",
      content: "Second post content goes here...",
      author: "user2",
    },
    {
      id: 3,
      title: "React + TanStack",
      content: "Third post",
      author: "user3",
    },
  ];

  return (
    <>
      <div>
        {dummyPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              Posted by {post.author}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
