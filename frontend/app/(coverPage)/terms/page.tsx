import { PublicHeader } from "@/components/landingPage/public-header";
import { PublicFooter } from "@/components/landingPage/public-footer";
import { TermsContent } from "@/components/landingPage/terms-content";

export const metadata = {
  title: "Terms of Service | EcoTrack",
  description:
    "Terms and conditions for using EcoTrack with transparency and user rights.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col dark">
      <main className="flex-1">
        <TermsContent />
      </main>
    </div>
  );
}
