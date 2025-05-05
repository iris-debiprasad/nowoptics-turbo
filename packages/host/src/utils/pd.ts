// import { createCanvas, loadImage } from "canvas";

// const  IRIS_WIDTH = 11.7;

// class Point {
//     x: any;
//     y: any;
//     constructor(x: any, y: any) {
//         this.x = x;
//         this.y = y;
//         /* A function that calculates the distance between two points. */
        
//     }

//     distanceTo(point: any) {
//         var distance = Math.sqrt(
//             Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2)
//         );
//         return distance;
//     };
// }

// const roundToNearest50 = (num: number) => Math.round(num / 50) * 50;

// const getIrisWidth = (keyPoints: any, width: number, height: number) => {
//     // iris left
//     const xLeftIrisLeft = keyPoints[474].x * width
//     const yLeftIrisLeft = keyPoints[474].y * height
//     const xLeftIrisRight = keyPoints[476].x * width
//     const yLeftIrisRight = keyPoints[476].y * height

//     // iris right
//     const xRightIrisLeft = keyPoints[471].x * width
//     const yRightIrisLeft = keyPoints[471].y * height
//     const xRightIrisRight = keyPoints[469].x * width
//     const yRightIrisRight = keyPoints[469].y * height

//     const leftIrisLeftPoints = new Point(xLeftIrisLeft, yLeftIrisLeft)
//     const leftIrisRightPoints = new Point(xLeftIrisRight, yLeftIrisRight)
//     const rightIrisLeftPoints = new Point(xRightIrisLeft, yRightIrisLeft)
//     const rightIrisRightPoints = new Point(xRightIrisRight, yRightIrisRight)
//     const irisDiameterLeft = leftIrisLeftPoints.distanceTo(leftIrisRightPoints)
//     const irisDiameterRight = rightIrisLeftPoints.distanceTo(rightIrisRightPoints)

//     return Math.min(irisDiameterLeft, irisDiameterRight)
// }

// export async function displayIrisPosition(keyPoints: any, width: number, height: number, imageBase64Data: string) {
//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext('2d');
//     const buffer = Buffer.from(imageBase64Data.split(',')[1], 'base64');
    
    
//     const image = await loadImage(buffer);
//     ctx.drawImage(image, 0, 0);
    
//     const midX = (keyPoints[193].x * width + keyPoints[417].x * width) / 2
//     const midY = (keyPoints[473].y * height + keyPoints[468].y * height) / 2
//     const leftEyeCenterX = keyPoints[468].x * width
//     const leftEyeCenterY = keyPoints[468].y * height
//     const rightEyeCenterX = keyPoints[473].x * width
//     const rightEyeCenterY = keyPoints[473].y * height
//     const leftEyePoint = new Point(leftEyeCenterX, leftEyeCenterY)
//     const rightEyePoint = new Point(rightEyeCenterX, rightEyeCenterY)
//     const midPoint = new Point(midX, midY)
//     const leftEyePdInDistance = midPoint.distanceTo(leftEyePoint)
//     const rightEyePdInDistance = midPoint.distanceTo(rightEyePoint)
    
//     ctx.lineWidth = 3
//     ctx.strokeStyle = 'green'
//     ctx.beginPath()
//     ctx.moveTo(leftEyeCenterX, leftEyeCenterY)
//     ctx.lineTo(midX, midY)
//     ctx.stroke()

//     ctx.strokeStyle = 'blue'
//     ctx.beginPath()
//     ctx.moveTo(rightEyeCenterX, rightEyeCenterY)
//     ctx.lineTo(midX, midY)
//     ctx.stroke()

//     const irisWidth = getIrisWidth(keyPoints, width, height)
    
//     const LeftEyePD = (IRIS_WIDTH / irisWidth) * leftEyePdInDistance
//     const RightEyePD = (IRIS_WIDTH / irisWidth) * rightEyePdInDistance
//     const leftRoundedPD = roundToNearest50(LeftEyePD * 100) / 100
//     const rightRoundedPD = roundToNearest50(RightEyePD * 100) / 100

//     let canvasSize = canvas.height
//     const fixedChanges = 25
//     ctx.font = "20px Arial";
//     ctx.fillStyle = "red"
//     ctx.fillText(`OU PD: ${leftRoundedPD + rightRoundedPD}`, 10, canvasSize - fixedChanges * 3)
//     ctx.fillText(`OS PD: ${leftRoundedPD}`, 10, canvasSize - fixedChanges * 2)
//     ctx.fillText(`OD PD: ${rightRoundedPD}`, 10, canvasSize - fixedChanges * 1)
    
//     const eyeJSON = {
//         'OU_PD': leftRoundedPD + rightRoundedPD,
//         'OS_PD': leftRoundedPD,
//         'OD_PD': rightRoundedPD,
//         'image': canvas.toDataURL()
//         }
//     return eyeJSON
// }

