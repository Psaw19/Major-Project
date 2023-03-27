
export function drawSegment(ctx, [endingX, endingY], [startingX, startingY], color) {
    ctx.beginPath()
    ctx.moveTo(endingX, endingY)
    ctx.lineTo(startingX, startingY)
    ctx.lineWidth = 3
    ctx.strokeStyle = color
    ctx.stroke()
}

export function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}