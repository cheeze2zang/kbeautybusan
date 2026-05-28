"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChat() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      {expanded && (
        <div className="flex animate-slide-up flex-col gap-3">
          {/* KakaoTalk */}
          <a
            href="https://pf.kakao.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="rounded-lg bg-busan-secondary/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              KakaoTalk
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-2xl shadow-xl transition-transform duration-300 hover:scale-110">
              💬
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="rounded-lg bg-busan-secondary/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              WhatsApp
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-xl transition-transform duration-300 hover:scale-110">
              📱
            </span>
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex h-16 w-16 items-center justify-center rounded-full shadow-luxury-xl transition-all duration-300 ${
          expanded
            ? "rotate-0 bg-busan-secondary text-white"
            : "animate-glow-pulse bg-gradient-to-br from-amber-400 to-amber-600 text-white"
        }`}
        aria-label="Chat options"
      >
        {expanded ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
