import React from "react";

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

interface ResumeDownloadModalProps {
  onDownload: (data: { name: string; reason: string }) => void;
  children: React.ReactNode;
}

const ResumeDownloadModal: React.FC<ResumeDownloadModalProps> = ({
  onDownload,
  children,
}) => {
  const [name, setName] = React.useState("");
  const [reason, setReason] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDownload({ name, reason });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Why would you like to download my resume?"
          value={reason}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReason(e.target.value)
          }
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Download Resume
      </Button>
    </form>
  );
};

export default ResumeDownloadModal;
