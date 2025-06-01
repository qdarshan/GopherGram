import type { Post } from "@/types/post";
import PostItem from "./PostItem";

const dummyPosts: Post[] = [
  {
    id: 1,
    title: "First post",
    content:
      "This is my first post! lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam illum expedita commodi iste porro neque adipisci inventore voluptatum sequi, maiores et, fuga aperiam. Tempora veritatis mollitia corporis aperiam enim amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto sed tempora nisi accusantium sint esse reprehenderit nostrum, rem molestias voluptates obcaecati, praesentium repellat inventore eaque perferendis quo harum dolore hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, itaque consequuntur fugiat animi amet at consequatur eaque cumque magni officiis debitis dicta, nihil odit accusamus, eos vero maxime ex! Autem.",
    vote: 5,
    comment: 2006,
    comments: [
      {
        id: 1,
        content: "This is a comment",
        author: "user1",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
    ],
    timestamp: "2025-05-31T11:20:28.776Z",
    user: {
      username: "user2",
      displayName: "John Doe",
      bio: "Software developer passionate about React and TypeScript. Building cool stuff on the web.",
      followers: 1234,
      following: 567,
      posts: 89,
      joinDate: "Joined March 2023",
      verified: true,
      avatar: "https://avatar.iran.liara.run/public",
    },
  },
  {
    id: 2,
    title: "Exploring the New Framework",
    content:
      "Just tried out the new JavaScript framework everyone's talking about! It's super intuitive and makes state management a breeze. Here's a quick snippet: `useState` feels like magic! 😄 Has anyone else played with it yet? Share your thoughts! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    vote: 42,
    comment: 128,
    comments: [
      {
        id: 2,
        content: "Loving it too! The hooks are a game-changer.",
        author: "coder_guru",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
      {
        id: 3,
        content: "Any performance tips for large apps?",
        author: "dev_ninja",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
    ],
    timestamp: "2025-05-18T09:30:00Z",
    user: {
      username: "techie123",
      displayName: "Alice Smith",
      bio: "Frontend dev | JavaScript enthusiast | Sharing tips and tricks for modern web dev",
      followers: 890,
      following: 234,
      posts: 45,
      joinDate: "Joined July 2022",
      verified: false,
      avatar: "https://avatar.iran.liara.run/public?username=techie123",
    },
  },
  {
    id: 3,
    title: "Why I Switched to TypeScript",
    content:
      "After years of vanilla JS, I finally made the switch to TypeScript, and wow, what a difference! The type safety and IntelliSense support have saved me so many bugs. Here's a quick example of how interfaces make my code cleaner: ```interface User { id: number; name: string; }```. Anyone else made the jump? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    vote: 87,
    comment: 305,
    comments: [
      {
        id: 4,
        content: "TypeScript is a lifesaver! No more runtime surprises.",
        author: "ts_fan",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
    ],
    timestamp: "2025-05-19T15:45:00Z",
    user: {
      username: "code_master",
      displayName: "Mike Johnson",
      bio: "Full-stack developer | TypeScript advocate | Building scalable apps",
      followers: 2500,
      following: 180,
      posts: 120,
      joinDate: "Joined January 2021",
      verified: true,
      avatar: "https://avatar.iran.liara.run/public?username=code_master",
    },
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    content:
      "Been diving deep into CSS layouts lately, and I'm torn between Grid and Flexbox for my next project. Grid feels more powerful for complex layouts, but Flexbox is so intuitive for simpler designs. Here's a quick comparison I wrote up: [link to blog]. What do you all prefer? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    vote: 23,
    comment: 89,
    comments: [
      {
        id: 5,
        content: "Grid for 2D layouts, Flexbox for 1D. That's my rule!",
        author: "design_pro",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
      {
        id: 6,
        content: "Flexbox is my go-to for quick prototypes.",
        author: "ui_lover",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
    ],
    timestamp: "2025-05-20T11:20:00Z",
    user: {
      username: "style_guru",
      displayName: "Emma Brown",
      bio: "UI/UX designer | CSS wizard | Creating beautiful web experiences",
      followers: 670,
      following: 412,
      posts: 67,
      joinDate: "Joined September 2023",
      verified: false,
      avatar: "https://avatar.iran.liara.run/public?username=style_guru",
    },
  },
  {
    id: 5,
    title: "My Open Source Journey",
    content:
      "Just contributed to my first open-source project on GitHub! It was daunting at first, but the community was so welcoming. If you're hesitating to contribute, just go for it! Here's the repo I worked on: [link to repo]. Any tips for finding great OSS projects? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
    vote: 65,
    comment: 412,
    comments: [
      {
        id: 7,
        content: "Congrats! Check out 'good first issue' tags on GitHub.",
        author: "oss_enthusiast",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
      {
        id: 8,
        content: "Amazing! What's the project about?",
        author: "curious_dev",
        timestamp: "2025-05-31T11:20:28.776Z",
      },
    ],
    timestamp: "2025-05-21T18:10:00Z",
    user: {
      username: "newbie_coder",
      displayName: "Sarah Lee",
      bio: "Learning to code | Open source newbie | Excited to contribute",
      followers: 320,
      following: 150,
      posts: 12,
      joinDate: "Joined April 2024",
      verified: false,
      avatar: "https://avatar.iran.liara.run/public?username=newbie_coder",
    },
  },
];

export default function Feed() {
  return (
    <div className="space-y-6 px-4 py-6">
      {dummyPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}