"use client";

import { useState } from "react";

// User photo with the first letter of the name underneath.
// The letter shows while the photo loads, and stays if the photo link is broken.
export default function Avatar({
  name,
  image,
  className = "w-10",
  textClassName = "text-base",
}: {
  name: string;
  image?: string | null;
  className?: string;
  textClassName?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const initial = name?.trim().charAt(0).toUpperCase() || "?";
  const showImage = !!image && image !== failedSrc;

  return (
    <div className={`relative aspect-square overflow-hidden rounded-full ${className}`}>
      <span
        className={`absolute inset-0 grid place-items-center bg-primary font-semibold text-primary-content ${textClassName}`}
        aria-hidden={showImage}
      >
        {initial}
      </span>
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailedSrc(image)}
        />
      )}
    </div>
  );
}
