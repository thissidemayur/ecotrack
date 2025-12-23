import { Car, Home, ShoppingBag, Trash2 } from "lucide-react";
import { 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaXTwitter 
} from "react-icons/fa6"; 
export const carbonCalculationSteps = [
  {
    id: 1,
    title: "Home Energy",
    icon: Home,
    description: "Track your household energy consumption",
  },
  {
    id: 2,
    title: "Transport",
    icon: Car,
    description: "Record your travel and commute patterns",
  },
  {
    id: 3,
    title: "Consumption",
    icon: ShoppingBag,
    description: "Monitor your spending habits",
  },
  {
    id: 4,
    title: "Waste & Review",
    icon: Trash2,
    description: "Log waste generation and review data before submitting",
  },
];
export const socials = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "/in/thissidemayur",
    icon: FaLinkedin, // React Icon
    link: "https://linkedin.com/in/thissidemayur",
    color: "from-blue-600 to-blue-400",
    description: "Professional network & career history",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@thissidemayur",
    icon: FaGithub, // React Icon
    link: "https://github.com/thissidemayur",
    color: "from-zinc-400 to-zinc-200",
    description: "Open source contributions & DevOps scripts",
  },
  {
    id: "x",
    label: "X (Twitter)",
    handle: "@thissidemayur",
    icon: FaXTwitter, // Modern X icon from react-icons
    link: "https://x.com/thissidemayur",
    color: "from-zinc-500 to-zinc-700",
    description: "Tech insights & project updates",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@thissidemayur",
    icon: FaInstagram, // React Icon
    link: "https://instagram.com/thissidemayur",
    color: "from-pink-500 to-rose-500",
    description: "Personal updates & design inspiration",
  },
];