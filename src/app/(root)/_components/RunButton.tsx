"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from 'lucide-react';
import { api } from "../../../../convex/_generated/api";
import { useCallback } from "react";

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = useCallback(async () => {
    try {
      await runCode();
      const result = getExecutionResult();

      if (user && result) {
        await saveExecution({
          language,
          code: result.code,
          output: result.output || undefined,
          error: result.error || undefined,
        });
      }
    } catch (error) {
      console.error("Failed to run code:", error);
      // Optionally, you could update the UI to show an error message
    }
  }, [runCode, user, language, saveExecution]);

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-2.5 px-5  py-2.5 max-md:p-2.5
        disabled:cursor-not-allowed disabled:opacity-70
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]
        rounded-xl 
      `}
      aria-label={isRunning ? "Code is executing" : "Run code"}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" 
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative" aria-hidden="true">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium text-white/90 max-md:hidden">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center" aria-hidden="true">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white max-md:hidden">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}

export default RunButton;

