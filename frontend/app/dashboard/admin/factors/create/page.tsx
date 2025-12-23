import { CreateFactorContent } from "@/components/form/create-factor-content";

export default function CreateFactorPage() {
  return (
    <div className="flex h-screen bg-zinc-950">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <CreateFactorContent />
        </main>
      </div>
    </div>
  );
}
