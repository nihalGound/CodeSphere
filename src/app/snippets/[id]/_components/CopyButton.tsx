"use client";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

type Props = {
  code: string;
};

function CopyButton({ code }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <button
      className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
      onClick={copyToClipboard}
      type="button"
    >
      {copied ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className="size-4 text-gray-400 group-hover:text-gray-300" />
      )}
    </button>
  );
}

export default CopyButton;
