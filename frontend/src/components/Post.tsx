import { ArrowBigDown, ArrowBigUp, MessageCircle, Share2 } from "lucide-react";
import { getCount, timeAgo } from "@/utils/Utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { motion } from "motion/react";
import { useState } from "react";

type Comment = {
  id: number;
  content: string;
  author: string;
};

type User = {
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  joinDate: string;
  verified: boolean;
  avatar: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  vote: number;
  comment: number;
  comments?: Comment[];
  timestamp: string;
  user: User;
};

interface PostItemProps {
  post: Post;
}

function ProfileSummary({ user }: { user: User }) {
  return (
    <HoverCardContent className="w-80 bg-slate-50 border-none shadow-sm p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.displayName?.slice(0, 2).toUpperCase() || "VC"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-bold">{user.displayName}</div>
            <div className="text-sm text-gray-500">@{user.username}</div>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          {user.bio || "No bio available"}
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            <span className="text-sm font-semibold">{user.following || 0}</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
          <div className="flex gap-1">
            <span className="text-sm font-semibold">{user.followers || 0}</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
}

export default function PostItem({ post }: PostItemProps) {
  const navigate = useNavigate();
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handlePostClick = (postId: number) => {
    navigate({
      to: "/posts/$postId",
      params: { postId: postId.toString() },
    });
  };

  const handleShareClick = async (postId: number) => {
    const postUrl = `${window.location.origin}/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopyStatus("Link copied!");
      setTimeout(() => setCopyStatus(null), 800);
    } catch (err) {
      console.error("Failed to copy link: ", err);
      setCopyStatus("Failed to copy link.");
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <div className="flex gap-4 p-4">
        <div className="flex-shrink-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={post.user.avatar} alt="User avatar" />
                <AvatarFallback>
                  {post.user.displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <ProfileSummary user={post.user} />
          </HoverCard>
        </div>

        <div className="flex-1">
          <CardHeader className="p-0">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link
                      to="/$username"
                      params={{ username: post.user.username }}
                      className="text-sm font-semibold text-gray-800 hover:text-orange-600 hover:shadow-text "
                    >
                      {post.user.displayName}
                    </Link>
                  </HoverCardTrigger>
                  <ProfileSummary user={post.user} />
                </HoverCard>

                <span className="text-sm text-gray-500">
                  @{post.user.username}
                </span>
                <span
                  className="text-sm text-gray-500"
                  title={new Date(post.timestamp).toLocaleString()}
                >
                  {timeAgo(post.timestamp)}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent
            className="p-0 pt-2 cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <h2 className="text-md font-semibold text-gray-900 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700 text-sm mb-4">{post.content}</p>
          </CardContent>

          <CardFooter className="p-0">
            <div className="flex items-center gap-4 text-sm">
              <div className="group flex items-center space-x-1 bg-zinc-200 hover:bg-zinc-300 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-muted-foreground">
                <Button
                  variant="ghost"
                  size="icon"
                  className="group flex items-center gap-2 px-4 py-2 group-hover:bg-zinc-300 hover:bg-zinc-300 rounded-full cursor-pointer transition-all duration-200 hover:text-orange-600"
                  onClick={() => alert("up vote")}
                >
                  <ArrowBigUp strokeWidth={3} className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-gray-800">
                  {getCount(post.vote)}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="group flex items-center gap-2 px-4 py-2 group-hover:bg-zinc-300 hover:bg-zinc-300 rounded-full cursor-pointer transition-all duration-200 hover:text-blue-600"
                  onClick={() => alert("down vote")}
                >
                  <ArrowBigDown strokeWidth={3} className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={() => handlePostClick(post.id)}
                className="group flex items-center gap-2 px-4 py-2 bg-zinc-200 hover:bg-zinc-300 rounded-full cursor-pointer shadow-sm transition-all duration-200"
              >
                <MessageCircle
                  strokeWidth={3}
                  className="w-4 h-4 text-muted-foreground group-hover:text-orange-600 transition-colors duration-200"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-gray-800">
                  {getCount(post.comment)}
                </span>
              </Button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, duration: 1 }}
              >
                <Button
                  onClick={() => handleShareClick(post.id)}
                  className="group flex items-center gap-2 px-4 py-2 bg-zinc-200 hover:bg-zinc-300 rounded-full cursor-pointer shadow-sm transition-all duration-200"
                >
                  <Share2
                    strokeWidth={3}
                    className="w-4 h-4 text-muted-foreground group-hover:text-orange-600 transition-colors duration-200"
                  />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-gray-800">
                    Share
                  </span>
                  {copyStatus === "Link copied!" && (
                    <span className="ml-1.5 text-xs text-green-600 animate-in fade-in">
                      Copied!
                    </span>
                  )}
                  {copyStatus === "Failed!" && (
                    <span className="ml-1.5 text-xs text-red-600 animate-in fade-in">
                      Failed
                    </span>
                  )}
                </Button>
              </motion.button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
