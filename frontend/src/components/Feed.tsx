import PostItem from "./Post";

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
      },
    ],
    timestamp: "2025-05-17T12:00:00Z",
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
      },
      {
        id: 3,
        content: "Any performance tips for large apps?",
        author: "dev_ninja",
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
      },
      {
        id: 6,
        content: "Flexbox is my go-to for quick prototypes.",
        author: "ui_lover",
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
      },
      {
        id: 8,
        content: "Amazing! What's the project about?",
        author: "curious_dev",
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

// export default function Feed() {
//   const navigate = useNavigate();
//   const [showCard, setShowCard] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e: React.MouseEvent) => {
//     setPosition({ x: e.clientX, y: e.clientY });
//   };

//   const handlePostClick = (postId: number) => {
//     navigate({
//       to: "/posts/$postId",
//       params: { postId: postId.toString() },
//     });
//   };

//   return (
//     <div className="space-y-6 px-4 py-6" onMouseMove={handleMouseMove}>
//       {dummyPosts.map((post) => (
//         <div
//           key={post.id}
//           className="bg-white p-6 rounded-lg shadow hover:shadow-md hover:bg-zinc-50 transition-shadow cursor-pointer"
//           onClick={() => handlePostClick(post.id)}
//         >
//           <div className="flex items-start gap-4">
//             <Avatar>
//               <AvatarImage src="https://avatar.iran.liara.run/public" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>

//             <div className="flex-1">
//               <div
//                 className="flex items-center gap-2 text-gray-600 mb-1"
//                 onClick={(e) => e.stopPropagation()}
//                 onMouseEnter={() => setShowCard(true)}
//                 onMouseLeave={() => setShowCard(false)}
//               >
//                 <div>
//                   <Link to="/$username" params={{ username: post.username }}>
//                     <span className="text-sm font-medium text-gray-800 hover:underline hover:text-red-500">
//                       {post.author}
//                     </span>
//                   </Link>
//                   <span className="text-sm text-gray-500">@{post.author}</span>
//                   <span
//                     className="text-sm text-gray-500"
//                     title={new Date(post.timestamp).toLocaleString()}
//                   >
//                     {timeAgo(post.timestamp)}
//                   </span>
//                 </div>
//                 {showCard && (
//                   <div
//                     className="absolute bg-white border border-gray-300 rounded shadow-md p-2"
//                     style={{ top: position.y + 10, left: position.x + 10 }}
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
//                           {user.avatar}
//                         </div>
//                         <div>
//                           <div className="flex items-center space-x-1">
//                             <h3 className="font-bold text-gray-900 dark:text-white">
//                               {user.displayName}
//                             </h3>
//                             {user.verified && (
//                               <svg
//                                 className="w-4 h-4 text-blue-500"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             )}
//                           </div>
//                           <p className="text-gray-500 dark:text-gray-400 text-sm">
//                             @{user.username}
//                           </p>
//                         </div>
//                       </div>
//                       <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
//                         Follow
//                       </button>
//                     </div>

//                     {/* Bio */}
//                     {user.bio && (
//                       <p className="text-gray-900 dark:text-white text-sm mb-3 leading-relaxed">
//                         {user.bio}
//                       </p>
//                     )}

//                     {/* Stats */}
//                     <div className="flex space-x-4 text-sm mb-2">
//                       <div>
//                         <span className="font-bold text-gray-900 dark:text-white">
//                           {user.following.toLocaleString()}
//                         </span>
//                         <span className="text-gray-500 dark:text-gray-400 ml-1">
//                           Following
//                         </span>
//                       </div>
//                       <div>
//                         <span className="font-bold text-gray-900 dark:text-white">
//                           {user.followers.toLocaleString()}
//                         </span>
//                         <span className="text-gray-500 dark:text-gray-400 ml-1">
//                           Followers
//                         </span>
//                       </div>
//                       <div>
//                         <span className="font-bold text-gray-900 dark:text-white">
//                           {user.posts}
//                         </span>
//                         <span className="text-gray-500 dark:text-gray-400 ml-1">
//                           Posts
//                         </span>
//                       </div>
//                     </div>

//                     {/* Join date */}
//                     <p className="text-gray-500 dark:text-gray-400 text-xs">
//                       {user.joinDate}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Title */}
//               <h2 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer">
//                 {post.title}
//               </h2>

//               {/* Body */}
//               <p className="text-gray-700 text-sm mb-4 cursor-pointer">
//                 {post.content}
//               </p>

//               {/* Actions */}
//               <div className="flex items-center gap-4 text-sm text-gray-600">
//                 {/* Vote */}
//                 <div
//                   className="flex items-center gap-1 bg-zinc-200 px-3 py-1 rounded-full hover:shadow hover:bg-zinc-300"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <ArrowBigUp
//                     className="cursor-pointer hover:text-red-500"
//                     onClick={() => {
//                       alert("up vote");
//                     }}
//                   />
//                   <span className="font-medium">{getCount(post.vote)}</span>
//                   <ArrowBigDown
//                     className="cursor-pointer hover:text-blue-500"
//                     onClick={() => {
//                       alert("down vote");
//                     }}
//                   />
//                 </div>

//                 {/* Comments */}
//                 <div onClick={(e) => e.stopPropagation()}>
//                   <button
//                     onClick={() => handlePostClick(post.id)}
//                     className="group flex items-center gap-1 bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded-full cursor-pointer"
//                   >
//                     <MessageCircle className="text-gray-500 group-hover:text-red-500 transition-colors" />
//                     <span className="font-medium text-gray-700">
//                       {getCount(post.comment)}
//                     </span>
//                   </button>
//                 </div>

//                 {/* Share */}
//                 <div onClick={(e) => e.stopPropagation()}>
//                   <button
//                     onClick={() => {
//                       alert("share");
//                     }}
//                     className="group flex items-center gap-1 bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded-full cursor-pointer"
//                   >
//                     <Share2
//                       className="text-gray-500 group-hover:text-red-500 transition-colors"
//                       onClick={() => {
//                         alert("share");
//                       }}
//                     />
//                     <span className="font-medium">Share</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
