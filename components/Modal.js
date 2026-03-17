import React from "react";
import Link from "next/link";

export default function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
        </div>

        <div className="inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-white/20 bg-slate-900">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-2xl leading-6 font-bold text-white mb-4">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                    {content}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-white/10">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
            <Link
              href="/contact"
              className="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-cyan-500 text-base font-medium text-slate-950 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 