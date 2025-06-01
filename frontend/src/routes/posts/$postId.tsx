import PostItem from "@/components/PostItem";
import MainLayout from "@/components/MainLayout";
import type { Post } from "@/types/post";
import { createFileRoute } from "@tanstack/react-router";
import { timeAgo } from "@/utils/Utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { User } from "@/types/user";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params }) => {
    console.log("params", params);
    try {
      const data = await new Promise<Post>((resolve) => {
        setTimeout(() => {
          resolve({
            id: parseInt(params.postId),
            title: "First post",
            content:
              "first post!!!!!",
            vote: 5,
            comment: 2006,
            comments: [
              {
                id: 1,
                content: "This is a comment",
                author: "user1",
                timestamp: "2025-06-01T11:20:28.776Z",
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
          });
        }, 1000);
      });
      return data;
    } catch (error) {
      throw new Error("Failed to load post data");
    }
  },
  component: PostComponent,
  pendingComponent: () => (
    <MainLayout>
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading post...</div>
      </div>
    </MainLayout>
  ),
  errorComponent: ({ error }) => (
    <MainLayout>
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    </MainLayout>
  ),
});

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

function PostComponent() {
  const post = Route.useLoaderData();

  const postRightSidebar = (
    <div className="p-4 space-y-4">
      <Card className="bg-card shadow-sm">
        <CardHeader className="p-4">
          <h3 className="font-semibold text-foreground">About Author</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 mb-2 cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>
                    {post.user.displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground hover:text-orange-600">
                    {post.user.displayName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    @{post.user.username}
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            <ProfileSummary user={post.user} />
          </HoverCard>
          <p className="text-sm text-muted-foreground">{post.user.bio}</p>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm">
        <CardHeader className="p-4">
          <h3 className="font-semibold text-foreground">Related Posts</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground hover:text-orange-600 cursor-pointer transition-colors duration-200">
              Similar discussion about React
            </div>
            <div className="text-sm text-muted-foreground hover:text-orange-600 cursor-pointer transition-colors duration-200">
              TypeScript best practices
            </div>
            <div className="text-sm text-muted-foreground hover:text-orange-600 cursor-pointer transition-colors duration-200">
              Web development trends
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <MainLayout rightSidebar={postRightSidebar}>
      <div>
        <PostItem post={post} />
        <Card className="border bg-card shadow-sm mt-6">
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold text-foreground">
              Comments ({post.comment})
            </h3>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {post.comments?.map((comment) => (
              <div
                key={comment.id}
                className="bg-card rounded-lg p-4 mb-3 border shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {comment.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground hover:text-orange-600 cursor-pointer">
                    {comment.author}
                  </span>
                  <span
                    className="text-sm text-muted-foreground"
                    title={new Date(comment.timestamp).toLocaleString()}
                  >
                    {timeAgo(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}