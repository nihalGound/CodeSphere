"use client"
import { useSubscription } from "@/hooks/useSubscription";
import { Zap } from "lucide-react";

export default function UpgradeButton() {
  const { onSubscribe, isProcessing } = useSubscription();

  return (
    <button
      disabled={isProcessing}
      onClick={onSubscribe}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </button>
  );
}
