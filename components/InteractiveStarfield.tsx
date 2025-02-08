"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { type Star, createStarfield as createStarfieldUtil, drawBitmapText } from "../utils/starfield"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

const InteractiveStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()

  const mouseRef = useRef({ x: 0, y: 0 })

  // Customization state
  const [starCount, setStarCount] = useState(450)
  const [speed, setSpeed] = useState(5)
  const [maxDepth, setMaxDepth] = useState(1000)
  const [mouseInfluence, setMouseInfluence] = useState(0.1)
  const [starColor, setStarColor] = useState("#ffffff")
  const [minSize, setMinSize] = useState(0.1)
  const [maxSize, setMaxSize] = useState(2)
  const [showControls, setShowControls] = useState(false)

  const createStarfield = useCallback(
    (width: number, height: number) => {
      return createStarfieldUtil(width, height, starCount, maxDepth)
    },
    [starCount, maxDepth],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    starsRef.current = createStarfield(width, height)

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, width, height)

      starsRef.current.forEach((star) => {
        star.update(width, height, speed, maxDepth)
        star.draw(
          ctx,
          width,
          height,
          maxDepth,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseInfluence,
          starColor,
          minSize,
          maxSize,
        )
      })

      // Draw bitmap text for the title
      drawBitmapText(ctx, "STARFIELD", 20, 20, 4, "#ffffff")
      drawBitmapText(ctx, "by Om Preetham", 75, 50, 1.5, "#ffffff")

      // Draw bitmap text for the customize/close button
      const buttonText = showControls ? "" : "CUSTOMIZE"
      drawBitmapText(ctx, buttonText, width - 90, height - 30, 2, "#ffffff")

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = createStarfield(canvas.width, canvas.height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createStarfield, speed, maxDepth, mouseInfluence, starColor, minSize, maxSize, showControls])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left - canvas.width / 2,
      y: e.clientY - rect.top - canvas.height / 2,
    }
  }

  const handleReset = () => {
    setStarCount(450)
    setSpeed(5)
    setMaxDepth(1000)
    setMouseInfluence(0.1)
    setStarColor("#ffffff")
    setMinSize(0.1)
    setMaxSize(2)
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  return (
    <div className="relative w-full h-screen">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-4 right-4">
        <a href="https://github.com/OmPreetham/starfield" target="_blank" rel="noopener noreferrer">
          <Github className="w-8 h-8 text-white hover:text-gray-300 transition-colors" />
        </a>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="bg-black bg-opacity-50 text-white p-4 cursor-pointer" onClick={toggleControls}>
          {/* The text for this button is drawn on the canvas */}
        </div>
        {showControls && (
          <div className="bg-black bg-opacity-75 text-white p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="starCount">Star Count</Label>
                <Input
                  id="starCount"
                  type="number"
                  value={starCount}
                  onChange={(e) => setStarCount(Number(e.target.value))}
                  min={100}
                  max={10000}
                  className="bg-gray-800 text-white"
                />
              </div>
              <div>
                <Label htmlFor="speed">Speed</Label>
                <Slider
                  id="speed"
                  min={1}
                  max={20}
                  step={0.1}
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="maxDepth">Max Depth</Label>
                <Slider
                  id="maxDepth"
                  min={500}
                  max={5000}
                  step={100}
                  value={[maxDepth]}
                  onValueChange={(value) => setMaxDepth(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="mouseInfluence">Mouse Influence</Label>
                <Slider
                  id="mouseInfluence"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[mouseInfluence]}
                  onValueChange={(value) => setMouseInfluence(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="starColor">Star Color</Label>
                <Input
                  id="starColor"
                  type="color"
                  value={starColor}
                  onChange={(e) => setStarColor(e.target.value)}
                  className="bg-gray-800 text-white"
                />
              </div>
              <div>
                <Label htmlFor="minSize">Min Size</Label>
                <Slider
                  id="minSize"
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={[minSize]}
                  onValueChange={(value) => setMinSize(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="maxSize">Max Size</Label>
                <Slider
                  id="maxSize"
                  min={1}
                  max={10}
                  step={0.1}
                  value={[maxSize]}
                  onValueChange={(value) => setMaxSize(value[0])}
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={handleReset} variant="outline" className="bg-gray-800 text-white">
                  Reset
                </Button>
                <Button onClick={toggleControls} variant="outline" className="bg-gray-800 text-white">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InteractiveStarfield

