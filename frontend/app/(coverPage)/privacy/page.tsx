import { PublicHeader } from "@/components/landingPage/public-header";
import { PublicFooter } from "@/components/landingPage/public-footer";
import { PrivacyContent } from "@/components/landingPage/privacy-content";

export const metadata = {
  title: "Privacy Policy | EcoTrack",
  description:
    "Our commitment to your privacy and data security with zero third-party sharing.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
