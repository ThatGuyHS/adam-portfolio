import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "@constants/data";

export default function Hero() {
  const colors = ["#F59E0B", "#84CC16", "#10B981", "#3B82F6"];
  const roles = ["Frontend Developer", "QA Engineer", "Tournament Organizer", "Copywriter"];
  const [showAnnotation, setShowAnnotation] = useState(false);

  useEffect(() => {
    const ric =
      typeof window !== "undefined" && window.requestIdleCallback
        ? window.requestIdleCallback
        : (cb) => setTimeout(cb, 600);
    const cancel =
      typeof window !== "undefined" && window.cancelIdleCallback
        ? window.cancelIdleCallback
        : clearTimeout;
    const handle = ric(() => setShowAnnotation(true));
    return () => cancel(handle);
  }, []);

  return (
    <div className="flex flex-row justify-center items-start overflow-hidden">
      {/* Text container */}
      <div className="w-full md:w-1/2 mx-auto text-center md:text-left lg:p-20">
        <RoughNotationGroup show={showAnnotation}>
          <RainbowHighlight color={colors[0]}>
            <h1 className="text-4xl md:text-7xl font-bold text-gray-700 dark:text-gray-200 my-2">
              Adam Peleback.
            </h1>
          </RainbowHighlight>
          <p className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mt-4">
            Frontend Developer in Stockholm.
          </p>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1 mt-3 text-base md:text-lg text-gray-500 dark:text-gray-400">
            {roles.slice(1).map((role, idx) => (
              <li key={role} className="flex items-center">
                {idx > 0 && <span className="mr-3 text-gray-300 dark:text-gray-600">·</span>}
                <span>{role}</span>
              </li>
            ))}
          </ul>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mt-8 leading-relaxed max-w-xl mx-auto md:mx-0">
            Stockholm-based frontend developer with 7+ years building web
            applications and esports platforms with React, Next.js, and
            TypeScript. Previously at G-Loot and Zaver, currently System Tester
            at Decerno. Available for freelance and contract engagements in
            frontend development, QA engineering, and tournament operations.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
            <Link
              href="/services"
              className="px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold transition"
            >
              View services
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-md bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 text-gray-700 text-base font-semibold shadow transition"
            >
              Get in touch
            </Link>
          </div>
        </RoughNotationGroup>
      </div>
      {/* Image container */}
      <div className="hidden lg:block relative w-full md:w-1/2 -mr-40 mt-20">
        <div className="w-3/4 ">
          <Image
            src={userData.avatarUrl}
            alt="Portrait of Adam Peleback"
            width={700}
            height={700}
            priority
            className="shadow"
          />
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-row space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-90deg-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
                />
              </svg>
              <p className="font-mono">That&apos;s me</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
