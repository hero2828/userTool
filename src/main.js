import { Client, Databases, Users } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const users = new Users(client);
  const db = new Databases(client);

  const data = req.bodyJson;
  const user = await db.getDocument(
    process.env.DB_ID,
    process.env.COLLECTION_ID,
    data.$id,
  );
  if (user) {
    return res.json({ msg: '用户已存在' }, 200, {
      'Access-Control-Allow-Origin': '*',
    });
  }
  await db.createDocument(
    process.env.DB_ID,
    process.env.COLLECTION_ID,
    data.$id,
    {
      name: data.name,
      create: new Date().toLocaleString(),
    },
  );
  return res.json({ msg: '用户创建成功' }, 200, {
    'Access-Control-Allow-Origin': '*',
  });
};
