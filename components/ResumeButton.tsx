import React from "react";
import ResumeDownloadModal from "./ResumeDownloadModal";
import { useToast } from "../hooks/use-toast";

interface ResumeButtonProps {
  resumeUrl: string;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({ resumeUrl }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDownload = async (data: { name: string; reason: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(resumeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {}
  };
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <ResumeDownloadModal onDownload={handleDownload}>
      <button
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Download Resume"}
      </button>
    </ResumeDownloadModal>
  );
};

export default ResumeButton;
