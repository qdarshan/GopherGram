import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  MessageCircle,
  Share2,
} from "lucide-react";
import Avatar from "./Avatar";

export default function () {
  type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    vote: number;
    comment: number;
    comments?: Comment[];
  };

  type Comment = {
    id: number;
    content: string;
    author: string;
  };

  const dummyPosts: Post[] = [
    {
      id: 1,
      title: "First post",
      content: "This is my first post!",
      author: "user1",
      vote: 5,
      comment: 2,
      comments: [
        {
          id: 1,
          content: "This is a comment",
          author: "user1",
        },
      ],
    },
    {
      id: 2,
      title: "Another Post",
      content: "Second post content goes here...",
      author: "user2",
      vote: 5,
      comment: 2,
      comments: [
        {
          id: 1,
          content: "This is a comment",
          author: "user1",
        },
      ],
    },
    {
      id: 3,
      title: "React + TanStack",
      content: "Third post",
      author: "user3",
      vote: 5,
      comment: 2,
      comments: [
        {
          id: 1,
          content: "This is a comment",
          author: "user1",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 px-4 py-6">
      {dummyPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Avatar src="https://avatar.iran.liara.run/public" size="sm" />

            {/* Content */}
            <div className="flex-1">
              {/* Author Info */}
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span className="text-sm font-medium text-gray-800">
                  {post.author}
                </span>
                <span className="text-xs text-gray-500">@{post.author}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>

              {/* Body */}
              <p className="text-gray-700 text-sm mb-4">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {/* Vote */}
                <div className="flex items-center gap-1 bg-zinc-200 px-3 py-1 rounded-full hover:shadow hover:bg-zinc-300">
                  <ArrowBigUpDash
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => alert("up vote")}
                  />
                  <span className="font-medium">{post.vote}</span>
                  <ArrowBigDownDash
                    className="cursor-pointer hover:text-blue-500"
                    onClick={() => alert("down vote")}
                  />
                </div>

                {/* Comments */}
                <div>
                  <button
                    onClick={() => alert("comment")}
                    className="group flex items-center gap-1 bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded-full cursor-pointer"
                  >
                    <MessageCircle className="text-gray-500 group-hover:text-red-500 transition-colors" />
                    <span className="font-medium text-gray-700">
                      {" "}
                      {post.comment}{" "}
                    </span>
                  </button>
                </div>

                {/* Boost */}
                {/* <div className="group flex items-center gap-1 bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded-full cursor-pointer">
                  <ChevronsUp
                    className="text-gray-500 group-hover:text-red-500 transition-colors"
                    onClick={() => alert("share")}
                  />
                  <span className="font-medium">Boost</span>
                </div> */}

                {/* Share */}
                <div className="group flex items-center gap-1 bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded-full cursor-pointer">
                  <Share2
                    className="text-gray-500 group-hover:text-red-500 transition-colors"
                    onClick={() => alert("share")}
                  />
                  <span className="font-medium">Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
