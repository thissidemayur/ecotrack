// @/components/user/user-viewProfile.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/authApi.type";
import { MapPin, Home, Users, Mail } from "lucide-react";

export function ViewProfileContent({ user }: { user: IUser }) {
  const getInitials = (name: string) =>
    name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Big Avatar */}
      <Avatar className="w-24 h-24 rounded-[2rem] border-2 border-zinc-900 ring-4 ring-emerald-500/10">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback className="bg-zinc-950 text-emerald-500 font-bold text-3xl">
          {getInitials(user.name || "U")}
        </AvatarFallback>
      </Avatar>

      {/* Name & Email */}
      <div className="text-center space-y-1">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
          {user.name}
        </h3>
        <p className="text-xs text-zinc-500 font-medium flex items-center justify-center gap-2">
          <Mail className="size-3" /> {user.email}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 gap-3">
        {/* Location Info */}
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <MapPin className="size-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold">
              Address
            </p>
            <p className="text-xs text-white font-bold">
              {user?.location?.district}, {user?.location?.state}
            </p>
          </div>
        </div>

        {/* Home & Family Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-3">
            <Home className="size-4 text-emerald-500" />
            <div>
              <p className="text-[9px] text-zinc-500 uppercase font-bold">
                Home Size
              </p>
              <p className="text-xs text-white font-bold">
                {user.home_size_sqm} m²
              </p>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-3">
            <Users className="size-4 text-emerald-500" />
            <div>
              <p className="text-[9px] text-zinc-500 uppercase font-bold">
                Family
              </p>
              <p className="text-xs text-white font-bold">
                {user.householdSize} People
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
