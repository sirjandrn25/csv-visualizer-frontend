import { CommonUtils } from "@/lib/common.utils";
import { Upload } from "@aws-sdk/lib-storage";
import { NextResponse } from "next/server";
const { S3Client } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRETE_KEY,
    },
});

export const POST = async (req: any) => {
    const data = await req.formData();
    const file = await data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileStream = Readable.from(buffer);

    const params = {
        Bucket: "csv-visualizer",
        Key:
            file.name?.split(" ").join("-") +
            "-" +
            CommonUtils.randomFourDigit(),
        Body: fileStream,
        AccessControlPolicy: { Grants: [] },
    };
    const upload = new Upload({
        client: s3Client,
        params,
    });
    upload.on("httpUploadProgress", (progress: any) => {
        console.log("progress", progress);
    });
    const filedata = await upload.done();

    return NextResponse.json({ file: filedata.Location });
};

// export const generateFiles = async (files: any = []) => {
//     let newFiles: any[] = [];

//     for (let file of files) {
//         try {
//             const dataUri = (await getFileContent(file)).content;
//             const upload = await cloudinary.uploader.upload(dataUri);
//             newFiles.push(upload.url);
//         } catch (error) {
//             // console.log({ error })
//         }
//     }

//     return newFiles;
// };

// const getFileContent = async (file: any) => {
//     const bytes = await file.arrayBuffer();

//     const buffer = Buffer.from(bytes);

//     const data = await getDataUri(file, buffer);

//     return data;
// };

// function getDataUri(file: any, buffer: any) {
//     const parser = new DataUriParser();

//     const extName = path.extname(file.name).toString();

//     return parser.format(extName, buffer);
// }
