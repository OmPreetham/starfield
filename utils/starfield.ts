export class Star {
  x: number
  y: number
  z: number
  pz: number

  constructor(width: number, height: number, maxDepth: number) {
    this.x = Math.random() * width - width / 2
    this.y = Math.random() * height - height / 2
    this.z = Math.random() * maxDepth
    this.pz = this.z
  }

  update(width: number, height: number, speed: number, maxDepth: number) {
    this.z = this.z - speed
    if (this.z < 1) {
      this.z = maxDepth
      this.x = Math.random() * width - width / 2
      this.y = Math.random() * height - height / 2
      this.pz = this.z
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    maxDepth: number,
    mouseX: number,
    mouseY: number,
    mouseInfluence: number,
    starColor: string,
    minSize: number,
    maxSize: number,
  ) {
    ctx.save()
    ctx.translate(width / 2, height / 2)

    const sx = this.map(this.x / this.z, 0, 1, 0, width) + (mouseX * mouseInfluence * (maxDepth - this.z)) / maxDepth
    const sy = this.map(this.y / this.z, 0, 1, 0, height) + (mouseY * mouseInfluence * (maxDepth - this.z)) / maxDepth

    const size = this.map(this.z, 0, maxDepth, maxSize, minSize)

    ctx.beginPath()
    ctx.fillStyle = starColor
    ctx.arc(sx, sy, size, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore()
  }

  map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
  }
}

export function createStarfield(width: number, height: number, starCount: number, maxDepth: number): Star[] {
  return Array.from({ length: starCount }, () => new Star(width, height, maxDepth))
}

export function drawBitmapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  const characters = {
    A: [
      [0, 1, 0],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
    ],
    B: [
      [1, 1, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 1],
      [1, 1, 0],
    ],
    C: [
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [0, 1, 1],
    ],
    D: [
      [1, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
    E: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    F: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
    ],
    G: [
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
    ],
    H: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
    ],
    I: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    J: [
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
    ],
    K: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
    ],
    L: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    M: [
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
    ],
    N: [
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
    ],
    O: [
      [0, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
    ],
    P: [
      [1, 1, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
    ],
    Q: [
      [0, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
    ],
    R: [
      [1, 1, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
    ],
    S: [
      [0, 1, 1],
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 0],
    ],
    T: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    U: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
    ],
    V: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
    ],
    W: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
    ],
    X: [
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
    ],
    Y: [
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    Z: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    " ": [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  }

  ctx.fillStyle = color
  let currentX = x

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase()
    const bitmap = characters[char] || characters[" "]

    for (let row = 0; row < bitmap.length; row++) {
      for (let col = 0; col < bitmap[row].length; col++) {
        if (bitmap[row][col]) {
          ctx.fillRect(currentX + col * size, y + row * size, size, size)
        }
      }
    }

    currentX += (bitmap[0].length + 1) * size
  }
}

