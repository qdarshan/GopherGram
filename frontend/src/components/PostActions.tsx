import { ArrowBigDown, ArrowBigUp, MessageCircle, Share2 } from "lucide-react";
import { getCount } from "@/utils/Utils";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface PostActionsProps {
  postId: number;
  voteCount: number;
  commentCount: number;
  hasVoted: "up" | "down" | null;
  onVote: (voteType: "up" | "down") => void;
  onCommentClick: () => void;
  onShareClick: () => void;
  copyStatus: string | null;
}

export function PostActions({
  postId,
  voteCount,
  commentCount,
  hasVoted,
  onVote,
  onCommentClick,
  onShareClick,
  copyStatus,
}: PostActionsProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Votes */}
      <div className="group flex items-center space-x-1 bg-muted hover:bg-accent rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-muted-foreground">
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`group flex items-center gap-2 px-4 py-2 group-hover:bg-accent hover:bg-accent rounded-full cursor-pointer transition-all duration-200 hover:text-orange-600 ${
            hasVoted === "up" ? "text-orange-600" : "hover:text-orange-600"
          }`}
          onClick={() => onVote("up")}
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
          {voteCount}
        </span>

        <Button
          variant={"ghost"}
          size={"icon"}
          className={`group flex items-center gap-2 px-4 py-2 group-hover:bg-accent hover:bg-accent rounded-full cursor-pointer transition-all duration-200 hover:text-orange-600 ${
            hasVoted === "down" ? "text-blue-600" : "hover:text-blue-600"
          }`}
          onClick={() => onVote("down")}
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
        onClick={onCommentClick}
        className="group flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        aria-label="View comments"
      >
        <MessageCircle
          strokeWidth={3}
          className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 transition-colors duration-200"
        />
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          {getCount(commentCount)}
        </span>
      </Button>

      {/* Share */}
      <Button
        variant="ghost"
        onClick={onShareClick}
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
  );
}