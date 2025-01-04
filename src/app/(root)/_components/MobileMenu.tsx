"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, Sparkles, X } from 'lucide-react';
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

interface MobileMenuProps {
  isPro: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isPro }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="w-6 h-6 text-gray-400" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 bg-black/50 "
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0, delay: 0, ease: "backInOut" }}
              className="fixed right-0 top-0 h-[100dvh]  max-w-sm bg-[#1e1e2e]/100 z-[10000] shadow-xl shadow-[#252625] overflow-y-auto"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-6">
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-700/50 transition-colors border "
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <nav className="space-y-6">
                  <div className="space-y-4">
                    <ThemeSelector />
                    <LanguageSelector hasAccess={Boolean(isPro)} />
                  </div>

                  {!isPro && (
                    <Link
                      href="/pricing"
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                      to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                      transition-all duration-300"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                      <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                        Upgrade to Pro
                      </span>
                    </Link>
                  )}

                  <div className="pt-4 border-t border-gray-700">
                    <HeaderProfileBtn />
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;

