import { HoverCardContent } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types/user";

export function ProfileSummary({ user }: { user: User }) {
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