import { FactorManagementContent } from "@/components/dashboard/emmisionFactor-management-content";

export default function FactorsPage() {
  return (
    <div className="flex h-screen bg-gray-950">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <FactorManagementContent />
        </main>
      </div>
    </div>
  );
}
