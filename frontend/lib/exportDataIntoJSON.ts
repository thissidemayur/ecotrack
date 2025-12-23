import { toast } from "sonner";

export const exportDataToJSON = (data: any[]) => {
  if (data.length === 0) {
    toast.error("No data available to export.");
    return;
  }

  // 1. Convert the JavaScript object to a formatted JSON string
  const jsonString = JSON.stringify(data, null, 2);

  // 2. Create a Blob (a file-like object) with the data
  const blob = new Blob([jsonString], { type: "application/json" });

  // 3. Create a temporary URL for the blob
  const url = URL.createObjectURL(blob);

  // 4. Create a hidden 'a' tag to trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.download = `eco-track-history-${
    new Date().toISOString().split("T")[0]
  }.json`;

  // 5. Append to body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 6. Clean up the URL object
  URL.revokeObjectURL(url);

  toast.success("History exported successfully!");
};
