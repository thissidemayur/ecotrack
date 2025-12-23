// components/form/ReviewCard.tsx
import { LucideIcon } from "lucide-react";

interface ReviewItem {
  label: string;
  value: number ;
  unit?: string;
}

export interface ReviewCardProps {
  title: string;
  icon: LucideIcon;
  colorClass: string;
  gradientFrom: string;
  items: ReviewItem[];
}

export const ReviewCard = ({
  title,
  icon: Icon,
  colorClass,
  gradientFrom,
  items,
}: ReviewCardProps) => (
  <div className="relative group">
    <div
      className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} to-transparent rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition-all`}
    />
    <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-5 border border-gray-700/50 hover:border-emerald-500/30 transition-all">
      <h4
        className={`font-semibold ${colorClass} mb-3 flex items-center gap-2 text-lg`}
      >
        <Icon className="w-5 h-5" />
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-y-2 text-sm">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between py-1 border-b border-gray-700/30 last:border-0"
          >
            <span className="text-gray-400">{item.label}:</span>
            <span className="text-white font-medium">
              {item.value} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
