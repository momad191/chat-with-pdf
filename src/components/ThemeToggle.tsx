 "use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-900 
        transition-all shadow-md dark:shadow-lg dark:shadow-blue-500/20 shadow-gray-400/30"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        {resolvedTheme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="text-yellow-400 drop-shadow-lg" size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="text-blue-500 drop-shadow-lg" size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
