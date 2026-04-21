"use client";
import React, { useState } from "react";

export default function ImageLoader({ src, alt, className, containerClassName }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // If there's an error loading the image, we can just return a broken image placeholder or null to hide it completely
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${containerClassName || className}`}>
        <span className="text-gray-400 text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName || ""}`}>
      {/* Loading Skeleton */}
      {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
