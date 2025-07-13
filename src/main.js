import { Client, Databases, Users } from "node-appwrite"

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }: any) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"] ?? "");
return res.json({ver:123})
};
