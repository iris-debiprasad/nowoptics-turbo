// const { createCanvas, loadImage } = require('canvas');
// const  IRIS_WIDTH = 11.7 

// let ctxImage: any;

// export async function drawFH(faces: any, width: number, height: number, imageBase64Data: string) {

//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext('2d');
//     const buffer = Buffer.from(imageBase64Data.split(',')[1], 'base64');
    
//     ctxImage = ctx;
    
//     const image = await loadImage(buffer);
//     console.log("Image created ===========")
//     ctx.drawImage(image, 0, 0);
    
    
//     const irisWidth = getIrisWidth(faces, width, height)
    

//     let OS_PGR
//     let OS_BF
//     let OS_threshold
//     let OD_PGR
//     let OD_BF
//     let OD_threshold

//     {
//         let cropTopY    = faces[105].y * height
//         let cropBottomY = faces[129].y * height
//         let cropRightX  = faces[9].x * width
//         let cropLeftX   = faces[127].x * width
        
//         let startingPoint   = faces[71].x * width
//         let cropHeight      = cropBottomY - cropTopY;
//         let cropWidth       = cropRightX - cropLeftX;
//         let threshold       = (+85) / 100;
//         let rightEyeCenterY     = faces[473].y * height
//         let rightEyeCenterX     = faces[473].x * width
//         let leftEyelidBottomY   = faces[374].y * height

//         let pupilOffsetHeight   = rightEyeCenterY - cropTopY;
//         let pupilOffsetWidth    = Math.abs(rightEyeCenterX - cropRightX)
        
//         const thrCanvas = createCanvas(pupilOffsetWidth, 150);
//         const thrCanvasCtx = thrCanvas.getContext('2d');

//         const cropCanvas = createCanvas(cropWidth, cropHeight);
//         const cropCanvasCtx = cropCanvas.getContext('2d');

//         cropCanvasCtx.clearRect(0, 0, cropWidth, cropHeight);
//         cropCanvasCtx.fillStyle = "transparent";
//         cropCanvasCtx.drawImage(ctx.canvas, startingPoint, cropTopY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

//         let thresholds = computeAdaptiveThreshold(cropCanvasCtx.getImageData(0, 0, cropCanvas.width, cropCanvas.height), threshold)
//         thrCanvasCtx.putImageData(thresholds, -pupilOffsetWidth + Math.round(pupilOffsetWidth * .3), 0);

//         let imageData = thrCanvasCtx.getImageData(0, 0, thrCanvas.width, thrCanvas.height)
//         let black_pixel = 0;
//         let shp = 0;
//         for (var row = imageData.height; row > 0; row--) {
//             const col = 0
//             var pixel = imageData.data.subarray(
//                 (row * imageData.width + col) * 4,
//                 (row * imageData.width + col) * 4 + 4
//             );

//             if (pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0 && pixel[3] == 255) {
//                 black_pixel++;
//             }

//             if (black_pixel > 0 && pixel.every((p: number) => p === 255)) {
//                 shp = row - pupilOffsetHeight
//                 break;
//             }
//         }

//         let shmm = roundToOnePoint((IRIS_WIDTH / irisWidth) * shp)
//         let shbmm = roundToOnePoint((IRIS_WIDTH / irisWidth) * (shp - roundToOnePoint(irisWidth / 2)));
//         OS_PGR = roundPrecisionToNearestZeroPointFive(roundToOnePoint(shmm))
//         OS_BF = roundPrecisionToNearestZeroPointFive(roundToOnePoint(shbmm))

//         strokePoints(rightEyeCenterX, rightEyeCenterY)
//         strokePoints(faces[374].x * width, faces[374].y * height)
//         strokePoints(rightEyeCenterX, rightEyeCenterY + shp)
//         OS_threshold = thrCanvas.toDataURL()
//         console.log("First eye completed")
//     }


//     {
//         let cropTopY = faces[334].y * height;
//         let cropBottomY = faces[358].y * height;
//         let cropRightX = faces[356].x * width;
//         let cropLeftX = faces[9].x * width;

//         let cropHeight = cropBottomY - cropTopY;
//         let cropWidth = cropRightX - cropLeftX;

//         let threshold = (+85) / 100;

//         let rightEyeCenterY = faces[468].y * height;
//         let rightEyeCenterX = faces[468].x * width;
//         let leftEyelidBottomY = faces[145].y * height;
        
//         let pupilOffsetHeight = rightEyeCenterY - cropTopY;
//         let pupilOffsetWidth = Math.abs(rightEyeCenterX - cropLeftX);
        
//         let eyelidOffsetHeight = leftEyelidBottomY - cropTopY;

//         const thrCanvas = createCanvas(pupilOffsetWidth, 150);
//         const thrCanvasCtx = thrCanvas.getContext('2d');

//         const cropCanvas = createCanvas(cropWidth, cropHeight);
//         const cropCanvasCtx = cropCanvas.getContext('2d');
        
//         thrCanvas.width = pupilOffsetWidth
                
//         cropCanvasCtx.clearRect(0, 0, cropWidth, cropHeight);
//         cropCanvasCtx.fillStyle = "transparent";
//         cropCanvasCtx.drawImage(ctx.canvas, cropLeftX, cropTopY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
//         let thresholds = computeAdaptiveThreshold(cropCanvasCtx.getImageData(0, 0, cropCanvas.width, cropCanvas.height), threshold)
        
//         thrCanvasCtx.putImageData(thresholds, -pupilOffsetWidth - Math.round(pupilOffsetWidth * .3), 0);
        
//         let imageData = thrCanvasCtx.getImageData(0, 0, thrCanvas.width, thrCanvas.height)
        
//         let black_pixel = 0;
//         let shp = 0;
//         for (var row = imageData.height; row > 0; row--) {
//             const col = 0;
//             var pixel = imageData.data.subarray(
//                 (row * imageData.width + col) * 4,
//                 (row * imageData.width + col) * 4 + 4
//                 );
                
//                 if (pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0 && pixel[3] == 255) {
//                     black_pixel++;
//             }
            
//             if (black_pixel > 0 && pixel.every((p: number) => p === 255)) {
//                 shp = row - pupilOffsetHeight
//                 break;
//             }
//         }
//             strokePoints(rightEyeCenterX, rightEyeCenterY)
//             strokePoints(faces[145].x * width, faces[145].y * height)
//             strokePoints(rightEyeCenterX, rightEyeCenterY + shp)

//         let shmm = roundToOnePoint((IRIS_WIDTH / irisWidth) * shp)
//         let shbmm = roundToOnePoint((IRIS_WIDTH / irisWidth) * (shp - roundToOnePoint(irisWidth / 2)));

//         shmm = roundPrecisionToNearestZeroPointFive(roundToOnePoint(shmm))

//         OD_PGR = shmm
//         OD_BF = roundPrecisionToNearestZeroPointFive(roundToOnePoint(shbmm))
//         OD_threshold = thrCanvas.toDataURL()

//         console.log("second eye completed")
//     }
//     const fhTextForCanvas = {
//         right_Eye_FH_Bifocal: `OD FH BF: ${OD_BF}mm`,
//         right_Eye_FH_Progressive: `OD FH PGR: ${OD_PGR}mm`,
//         left_Eye_FH_Bifocal: `OS FH BF: ${OS_BF}mm`,
//         left_Eye_FH_Progressive: `OS FH PGR: ${OS_PGR}mm`
//     }

//     console.log(fhTextForCanvas)
//     ctx.font = "18px Arial";
//     ctx.fillStyle = "red";
//     let canvasHeight = canvas.height
//     let fixedValueForFormatHeight = 25
//     ctx.fillText(fhTextForCanvas.right_Eye_FH_Progressive, 10, canvasHeight - fixedValueForFormatHeight * 4);
//     ctx.fillText(fhTextForCanvas.right_Eye_FH_Bifocal, 10, canvasHeight - fixedValueForFormatHeight * 3);
//     ctx.fillText(fhTextForCanvas.left_Eye_FH_Progressive, 10, canvasHeight - fixedValueForFormatHeight * 2);
//     ctx.fillText(fhTextForCanvas.left_Eye_FH_Bifocal, 10, canvasHeight - fixedValueForFormatHeight * 1);

//     let eyeJSON = {
//         'left_eye_progressive': OS_PGR,
//         'left_eye_bifocal': OS_BF,
//         'right_eye_progressive': OD_PGR,
//         'right_eye_bifocal': OD_BF,
//         'shimg': canvas.toDataURL(),
//         'left_eye_threshold_image': OS_threshold,
//         'right_eye_threshold_image': OD_threshold
//     }
//     return eyeJSON
// }

// function buildIntegral_Gray(sourceImageData: any) {
//     var sourceData = sourceImageData.data;
//     var width = sourceImageData.width;
//     var height = sourceImageData.height;
//     // should it be Int64 Array ??
//     // Sure for big images
//     var integral = new Int32Array(width * height)
//     // ... for loop
//     var x = 0,
//         y = 0,
//         lineIndex = 0,
//         sum = 0;
//     for (x = 0; x < width; x++) {
//         sum += sourceData[x << 2];
//         integral[x] = sum;
//     }

//     for (y = 1, lineIndex = width; y < height; y++, lineIndex += width) {
//         sum = 0;
//         for (x = 0; x < width; x++) {
//             sum += sourceData[(lineIndex + x) << 2];
//             integral[lineIndex + x] = integral[lineIndex - width + x] + sum;
//         }
//     }
//     return integral;
// }

// function createImageData(width: number, height: number) {
//     const canvas = createCanvas(width, height);
//     return canvas.getContext('2d').createImageData(width, height);
// }

// function getIntegralAt(integral: any, width: number, x1: any, y1: any, x2: any, y2: any) {
//     var result = integral[x2 + y2 * width];
//     if (y1 > 0) {
//         result -= integral[x2 + (y1 - 1) * width];
//         if (x1 > 0) {
//             result += integral[(x1 - 1) + (y1 - 1) * width];
//         }
//     }
//     if (x1 > 0) {
//         result -= integral[(x1 - 1) + (y2) * width];
//     }
//     return result;
// }

// function computeAdaptiveThreshold(sourceImageData: any, ratio: any, callback?: any) {
//     var integral = buildIntegral_Gray(sourceImageData);

//     var width = sourceImageData.width;
//     var height = sourceImageData.height;
//     var s = width >> 4; // in fact it's s/2, but since we never use s...

//     var sourceData = sourceImageData.data;
//     var result = createImageData(width, height);
//     var resultData = result.data;
//     var resultData32 = new Uint32Array(resultData.buffer);

//     var x = 0,
//         y = 0,
//         lineIndex = 0;

//     for (y = 0; y < height; y++, lineIndex += width) {
//         for (x = 0; x < width; x++) {

//             var value = sourceData[(lineIndex + x) << 2];
//             var x1 = Math.max(x - s, 0);
//             var y1 = Math.max(y - s, 0);
//             var x2 = Math.min(x + s, width - 1);
//             var y2 = Math.min(y + s, height - 1);
//             var area = (x2 - x1 + 1) * (y2 - y1 + 1);
//             var localIntegral = getIntegralAt(integral, width, x1, y1, x2, y2);
//             if (value * area > localIntegral * ratio) {
//                 resultData32[lineIndex + x] = 0xFFFFFFFF;
//             } else {
//                 resultData32[lineIndex + x] = 0xFF000000;
//             }
//         }
//     }
//     return result;
// }

// function rightEyeIrisWidth468(keyPoints: any, width: any, height: any) {
//     const xRightIrisLeft = keyPoints[471].x * width
//     const yRightIrisLeft = keyPoints[471].y * height

//     strokePoints(xRightIrisLeft, yRightIrisLeft)

//     const xRightIrisRight = keyPoints[469].x * width
//     const yRightIrisRight = keyPoints[469].y * height

//     strokePoints(xRightIrisRight, yRightIrisRight)
    
//     const rightIrisLeftPoints = new Point(xRightIrisLeft, yRightIrisLeft)
//     const rightIrisRightPoints = new Point(xRightIrisRight, yRightIrisRight)
//     const irisDiameterLeft = rightIrisLeftPoints.distanceTo(rightIrisRightPoints)

//     return irisDiameterLeft
// }

// function leftEyeIrisWidth473(keyPoints: any, width: any, height: any) {
//     const xLeftIrisLeft = keyPoints[474].x * width
//     const yLeftIrisLeft = keyPoints[474].y * height

//     strokePoints(xLeftIrisLeft, yLeftIrisLeft)

//     const xLeftIrisRight = keyPoints[476].x * width
//     const yLeftIrisRight = keyPoints[476].y * height

//     strokePoints(xLeftIrisRight, yLeftIrisRight)

//     const leftIrisLeftPoints = new Point(xLeftIrisLeft, yLeftIrisLeft) as any
//     const leftIrisRightPoints = new Point(xLeftIrisRight, yLeftIrisRight)
//     const irisDiameterLeft = leftIrisLeftPoints.distanceTo(leftIrisRightPoints)

//     return irisDiameterLeft
// }

// function getIrisWidth(faces: any, width: any, height: any) {
//     return Math.max(rightEyeIrisWidth468(faces, width, height), leftEyeIrisWidth473(faces, width, height))
// }

// function strokePoints(x: number, y: number) {
//     ctxImage.beginPath();
//     ctxImage.strokeStyle = "red";
//     ctxImage.rect(x, y, 2, 2);
//     ctxImage.stroke();
// }

// class Point {
//     x: number;
//     y: number;
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
        
//     }
//     distanceTo(point: any) {
//         var distance = Math.sqrt(
//             Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2)
//         );
//         return distance;
//     };
// }

// const roundPrecisionToNearestZeroPointFive = (num: number) => Math.round(num * 2) / 2;
// const roundToOnePoint = (num: number) => Math.round(num * 10) / 10

