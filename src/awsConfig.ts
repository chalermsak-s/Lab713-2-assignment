import { S3Client } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
  endpoint: '',
  region: '',
  forcePathStyle: true,
})
export default s3Client