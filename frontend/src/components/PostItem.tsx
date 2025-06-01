import { ArrowBigDown, ArrowBigUp, MessageCircle, Share2 } from "lucide-react";
import { getCount, timeAgo } from "@/utils/Utils";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { motion } from "motion/react";
import { useState } from "react";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

interface PostItemProps {
  post: Post;
  onVote?: (postId: number, voteType: "up" | "down") => void;
}

function ProfileSummary({ user }: { user: User }) {
  return (
    <HoverCardContent className="w-80 p-4 bg-background shadow-md border">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.displayName?.slice(0, 2).toUpperCase() || "VC"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-bold text-foreground">
              {user.displayName}
            </div>
            <div className="text-sm text-muted-foreground">
              @{user.username}
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {user.bio || "No bio available"}
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            <span className="text-sm font-semibold">{user.following || 0}</span>
            <span className="text-sm text-muted-foreground">Following</span>
          </div>
          <div className="flex gap-1">
            <span className="text-sm font-semibold">{user.followers || 0}</span>
            <span className="text-sm text-muted-foreground">Followers</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
}

export default function PostItem({ post, onVote }: PostItemProps) {
  const navigate = useNavigate();
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [localVoteCount, setLocalVoteCount] = useState(post.vote);
  const [hasVoted, setHasVoted] = useState<"up" | "down" | null>(null);

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
      setCopyStatus("Failed!");
    }
  };

  const handleUpvote = () => {
    if (hasVoted === "up") {
      setLocalVoteCount((prev) => prev - 1);
      setHasVoted(null);
      onVote?.(post.id, "up");
    } else {
      setLocalVoteCount((prev) => (hasVoted === "down" ? prev + 2 : prev + 1));
      setHasVoted("up");
      onVote?.(post.id, "up");
    }
  };

  const handleDownvote = () => {
    if (hasVoted === "down") {
      setLocalVoteCount((prev) => prev + 1);
      setHasVoted(null);
      onVote?.(post.id, "down");
    } else {
      setLocalVoteCount((prev) => (hasVoted === "up" ? prev - 2 : prev - 1));
      setHasVoted("down");
      onVote?.(post.id, "down");
    }
  };

  return (
    <Card className="border bg-card shadow-sm">
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HoverCard>
                <div>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>
                          {post.user.displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-foreground hover:text-orange-600">
                        {post.user.displayName}
                      </span>
                    </div>
                  </HoverCardTrigger>
                  <ProfileSummary user={post.user} />
                </div>
              </HoverCard>
              <span>@{post.user.username}</span>
              <span title={new Date(post.timestamp).toLocaleString()}>
                {timeAgo(post.timestamp)}
              </span>
            </div>
          </CardHeader>

          <CardContent
            className="p-0 pt-2 cursor-pointer"
            onClick={() => handlePostClick(post.id)}
            aria-label={`View post: ${post.title}`}
          >
            <h2 className="text-md font-semibold text-foreground mb-2">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-sm mb-4">{post.content}</p>
          </CardContent>

          <CardFooter className="p-0">
            <div className="flex items-center gap-4 text-sm">
              {/* Votes */}
              <div className="group flex items-center space-x-1 bg-muted hover:bg-accent rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-muted-foreground">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className={`group flex items-center gap-2 px-4 py-2 group-hover:bg-accent hover:bg-accent rounded-full cursor-pointer transition-all duration-200 hover:text-orange-600 ${
                    hasVoted === "up"
                      ? "text-orange-600"
                      : "hover:text-orange-600"
                  }`}
                  onClick={handleUpvote}
                  aria-label="Upvote post"
                >
                  <motion.button whileTap={{ scale: 0.9 }}>
                    <ArrowBigUp strokeWidth={3} />
                  </motion.button>
                </Button>
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    hasVoted === "up"
                      ? "text-orange-600"
                      : hasVoted === "down"
                        ? "text-blue-600"
                        : "text-muted-foreground group-hover:text-accent-foreground"
                  }`}
                >
                  {localVoteCount}
                </span>

                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className={`group flex items-center gap-2 px-4 py-2 group-hover:bg-accent hover:bg-accent rounded-full cursor-pointer transition-all duration-200 hover:text-orange-600 ${
                    hasVoted === "down"
                      ? "text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                  onClick={handleDownvote}
                  aria-label="DownVote post"
                >
                  <motion.button whileTap={{ scale: 0.9 }}>
                    <ArrowBigDown strokeWidth={3} />
                  </motion.button>
                </Button>
              </div>

              {/* Comments */}
              <Button
                variant="ghost"
                onClick={() => handlePostClick(post.id)}
                className="group flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="View comments"
              >
                <MessageCircle
                  strokeWidth={3}
                  className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 transition-colors duration-200"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  {getCount(post.comment)}
                </span>
              </Button>

              {/* Share */}
              <Button
                variant="ghost"
                onClick={() => handleShareClick(post.id)}
                className="group flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-full shadow-sm hover:shadow-md transition-all duration-200 h-9"
                aria-label="Share post link"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    duration: 0.2,
                  }}
                  className="flex items-center gap-2"
                >
                  <Share2
                    strokeWidth={3}
                    className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 transition-colors duration-200"
                  />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
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
                </motion.div>
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
