// @/components/user/user-viewProfile.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/authApi.type";
import {
  MapPin,
  Home,
  Users,
  Mail,
  Calendar,
  ShieldCheck,
  AtSign,
} from "lucide-react";

export function ViewProfileContent({ user }: { user: IUser }) {
  const getInitials = (name: string) =>
    name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2);

  // Formatting the join date nicely
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 py-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* 1. Header Section: Identity */}
      <div className="flex flex-col items-center gap-4 border-b border-zinc-900 pb-6">
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Avatar className="w-24 h-24 rounded-[2.5rem] border-2 border-zinc-800 ring-4 ring-emerald-500/5 shadow-2xl relative">
            <AvatarImage
              src={user.image}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-zinc-950 text-emerald-500 font-black text-3xl italic">
              {getInitials(user.name || "U")}
            </AvatarFallback>
          </Avatar>
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-zinc-950 p-1 rounded-lg border-4 border-zinc-950 shadow-lg">
              <ShieldCheck className="size-4" />
            </div>
          )}
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            {user.name || "Eco Explorer"}
          </h3>
          <div className="flex items-center justify-center gap-3">
            <Badge
              variant="outline"
              className="bg-emerald-500/5 text-emerald-400 border-emerald-500/20 text-[10px] font-bold py-0.5 uppercase tracking-widest"
            >
              {user.role}
            </Badge>
            
          </div>
        </div>
      </div>

      {/* 2. Detailed Info Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Contact & Username Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50 flex items-center gap-3">
            <AtSign className="size-4 text-zinc-500" />
            <div className="truncate">
              <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest leading-none mb-1">
                Handle
              </p>
              <p className="text-xs text-zinc-200 font-bold">
                @{user.username || "no_username"}
              </p>
            </div>
          </div>
          <div className="bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50 flex items-center gap-3">
            <Mail className="size-4 text-zinc-500" />
            <div className="truncate">
              <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest leading-none mb-1">
                Email Address
              </p>
              <p className="text-xs text-zinc-200 font-bold truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50 flex items-center gap-4 group hover:border-emerald-500/30 transition-all">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl">
            <MapPin className="size-5 text-emerald-500" />
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest leading-none mb-1.5">
              Primary Location
            </p>
            <p className="text-sm text-white font-bold">
              {user.location?.district
                ? `${user.location.district}, ${user.location.state}`
                : "Location not set"}
            </p>
            <p className="text-[10px] text-zinc-600 font-medium">
              Pincode: {user.location?.pincode || "------"}
            </p>
          </div>
        </div>

        {/* Home & Family Section */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Home className="size-4 text-emerald-500" />
              <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                Home Size
              </p>
            </div>
            <p className="text-xl font-black text-white italic">
              {user.home_size_sqm || 0}{" "}
              <span className="text-[10px] text-zinc-600 uppercase not-italic">
                m²
              </span>
            </p>
          </div>
          <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-emerald-500" />
              <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                Household
              </p>
            </div>
            <p className="text-xl font-black text-white italic">
              {user.household_members || 0}{" "}
              <span className="text-[10px] text-zinc-600 uppercase not-italic">
                People
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Footer: Join Date */}
      <div className="flex items-center justify-center gap-2 pt-2 opacity-40">
        <Calendar className="size-3 text-zinc-500" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          Member Since {joinDate}
        </span>
      </div>
    </div>
  );
}
