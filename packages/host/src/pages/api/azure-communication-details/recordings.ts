// TODO: [IR24-889] After discussing with steckholder we dont need recoeding now,
//  commenting this will add in future when recording is required
// import {
//   CallAutomationClient,
//   CallLocator,
//   RecordingStorage,
//   RecordingStorageKind,
//   StartRecordingOptions,
// } from "@azure/communication-call-automation";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "PUT") {
//     const call_id = req.query.call_id;
//     const recording_id = req.query.recording_id;
//     const callAutomationClient = new CallAutomationClient(
//       process.env.NEXT_PUBLIC_ACS_CONNECTION_STRING as string,
//     );

//     if (call_id && !recording_id) {
//       const locator: CallLocator = {
//         id: call_id as string,
//         kind: "serverCallLocator",
//       };
//       const recordingStorageKind: RecordingStorageKind =
//         "azureBlobStorage";
//       const recordingStorage: RecordingStorage = {
//         recordingStorageKind: recordingStorageKind,
//         recordingDestinationContainerUrl: process.env.NEXT_PUBLIC_ACS_RECORDING_CONTAINER as string,
//       };
 
//       var options: StartRecordingOptions = {
//         callLocator: locator,
//         recordingContent: "audioVideo",
//         recordingChannel: "mixed",
//         recordingFormat: "mp4",
//         recordingStorage: recordingStorage,
//       };
//       try {
//         const response = await callAutomationClient
//           ?.getCallRecording()
//           .start(options);
//         res.status(200).json({ recording_id: response.recordingId, response });
//       } catch (err) {
//         res.status(400).send(`oops something went wrong`);
//       }
//     } else if (recording_id && !call_id) {
//       try {
//         const response = await callAutomationClient
//           ?.getCallRecording()
//           .stop(recording_id as string);
//         res.status(200).json({ message: "Recording stopped", response });
//       } catch (err) {
//         res.status(400).end(`oops something went wrong`);
//       }
//     } else {
//       res.status(400).end(`oops something went wrong`);
//     }
//   } else {
//     // Method not allowed
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
