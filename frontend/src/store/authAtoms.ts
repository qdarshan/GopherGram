import type { Post } from "@/types/post";
import { atom } from "jotai";

export const fetchedPostsAtom = atom<Post[]>([]);
export const selectedPostAtom = atom<Post | null>(null);