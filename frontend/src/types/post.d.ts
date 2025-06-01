import type { Comment } from "./comment";
import type { User } from "./user";

export interface Post {
  id: number;
  title: string;
  content: string;
  vote: number;
  comment: number;
  comments? : Comment[];
  timestamp: string;
  user: User;
};