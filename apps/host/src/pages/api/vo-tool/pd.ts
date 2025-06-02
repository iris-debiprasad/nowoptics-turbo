// import { displayIrisPosition } from "@root/host/src/utils/pd";
import { NextApiRequest, NextApiResponse } from "next";

export default async function api(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        try {
            const keyPoints = req.body.keyPoints
            const width = req.body.width
            const height = req.body.height
            const imageBase64Data = req.body.imageData
            const result =  {}
            //await displayIrisPosition(keyPoints, width, height, imageBase64Data)
            res.status(200).send({ result});
        } catch (error) {
            res.status(400).send({ error});
        }
    }
}