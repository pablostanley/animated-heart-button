"use client"
// hello mitchy mitch

import { useState } from "react"
import { Heart } from "lucide-react"

export default function Component() {
  const [isActive, setIsActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (isActive) {
      // When turning off, just deactivate without animation
      setIsActive(false)
    } else {
      // When turning on, trigger animation
      setIsAnimating(true)
      setIsActive(true)

      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-600">
      <button
        onClick={handleClick}
        className={`
          relative w-12 h-12 rounded-lg flex items-center justify-center
          bg-opacity-70 transition-colors duration-200
          bg-transparent hover:bg-zinc-800
        `}
        aria-label={isActive ? "Deactivate heart" : "Activate heart"}
      >
        <div className="relative">
          <Heart
            className={`
              w-6 h-6 transition-all duration-300
              ${isActive ? "fill-current stroke-current" : "stroke-current"}
              ${isActive ? "text-transparent" : "text-gray-200"}
            `}
            style={{
              backgroundImage: isActive
                ? "linear-gradient(45deg, #9400d3, #ff0000, #ff7f00, #ffff00, #6535fc, #00ff00, #0000ff, #4b0082, #9400d3)"
                : "none",
              backgroundSize: "200% 200%",
              backgroundPosition: isAnimating ? "100% 50%" : "0% 50%",
              backgroundClip: isActive ? "text" : "unset",
              WebkitBackgroundClip: isActive ? "text" : "unset",
              animation: isAnimating ? "rainbow 1s linear forwards" : "none",
            }}
          />

          {/* Rainbow overlay for the heart when active */}
          {isActive && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #9400d3, #ff0000, #ff7f00, #ffff00, #6b3ffc, #00ff00, #0000ff, #4b0082, #9400d3)",
                backgroundSize: "200% 200%",
                backgroundPosition: isAnimating ? "100% 50%" : "0% 50%",
                animation: isAnimating ? "rainbow 1s linear forwards" : "none",
                mask: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E\") center/contain no-repeat",
                WebkitMask:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E\") center/contain no-repeat",
              }}
            />
          )}
        </div>

        {/* Sparks animation */}
        {isAnimating && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: `hsl(${i * 30}, 100%, 60%)`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: `spark-${i} 1s ease-out forwards`,
                }}
              />
            ))}
          </>
        )}
      </button>

      <style jsx>{`
        @keyframes rainbow {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        ${[...Array(12)]
          .map(
            (_, i) => `
          @keyframes spark-${i} {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            20% {
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 1;
            }
            40% {
              transform: translate(-50%, -50%) 
                        translate(${Math.cos((i * 30 * Math.PI) / 180) * 8}px, ${Math.sin((i * 30 * Math.PI) / 180) * 8}px) 
                        scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) 
                        translate(${Math.cos((i * 30 * Math.PI) / 180) * 40}px, ${Math.sin((i * 30 * Math.PI) / 180) * 40}px) 
                        scale(0);
              opacity: 0;
            }
          }
        `,
          )
          .join("")}
      `}</style>
    </div>
  )
}
