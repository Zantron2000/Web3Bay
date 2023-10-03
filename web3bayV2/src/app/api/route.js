import { NextResponse } from "next/server";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";

const client = new SpheronClient({ token: process.env.SPHERON_TOKEN });
let running = false;
// import fs from "fs";
// import FormData from "form-data";
// import rfs from "recursive-fs";
// import basePathConverter from "base-path-converter";
// import got from "got";
// import { async } from "recursive-fs/lib/copy";
// const JWT = `Bearer ${process.env.PINATA_JWT}`;

// /**
//  *
//  * @param {NextRequest} request
//  */
// export async function GET(request) {
//   if (running) {
//     console.log(JWT);
//     return new Response("Already running", { status: 200 });
//   } else {
//     running = true;
//   }

//   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//   const src = "./build";

//   try {
//     const { dirs, files } = await rfs.read(src);
//     let data = new FormData();
//     for (const file of files) {
//       data.append(`file`, fs.createReadStream(file), {
//         filepath: basePathConverter(src, file),
//       });
//     }
//     const response = await got(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
//         Authorization: JWT,
//       },
//       body: data,
//     }).on("uploadProgress", (progress) => {
//       console.log(progress);
//     });

//     running = false;
//     return NextResponse.json({ data: JSON.parse(response.body) });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error });
//   }
// }

export async function GET() {
  if (running) {
    return NextResponse.json({ message: "IPFS being uploaded" });
  }

  running = true;
  try {
    const shell = require("shelljs");
    shell.cd("../store");

    const promise = new Promise((resolve, reject) => {
      const res1 = shell.exec("npm run build", { async: true });
      // Call each on function and print out the first parameter on the child process
      res1.on("close", (code) => {
        console.log("close");
        running = false;
        resolve("done");
      });
    });
    await promise;
    console.log("done");
    while (running) {}

    // shell.execSync("cd app && npm run build");
    // let currentlyUploaded = 0;
    // const { uploadId, bucketId, protocolLink, dynamicLinks, cid } =
    //   await client.upload("./build", {
    //     protocol: ProtocolEnum.IPFS,
    //     name: "hello world",
    //     onUploadInitiated: (uploadId) => {
    //       console.log(`Upload with id ${uploadId} started...`);
    //     },
    //     onChunkUploaded: (uploadedSize, totalSize) => {
    //       currentlyUploaded += uploadedSize;
    //       console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
    //     },
    //   });
    // console.log({
    //   uploadId,
    //   bucketId,
    //   protocolLink,
    //   dynamicLinks,
    //   cid,
    // });
    // running = false;
    // return NextResponse.json({ cid });
    return NextResponse.json({ message: res1 });
  } catch (error) {
    console.log(error.toString());

    return NextResponse.json({ error: error.toString() });
  }
}
