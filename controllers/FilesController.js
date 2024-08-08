const dbClient = require('../utils/db.js');
const redisClient = require('../utils/redis.js');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime');
const Queue = require('bull');



const imageQueue = new Queue('image transcoding')'

function postUpload(request, response) {
  const token = request.headers.X-Token;
  const payload = request.body;
  const isPublic = payload.isPublic || null;
  const parentId = payload.parentId;

  if (!token) {
    return response.send({'error': 'Missing token'});
  }
  const collection = dbClient.db.collection.('users');
  const user_id = redis.get(`auth_${token}`);
  const user = collection.findOne({_id: user_id});
  if (!user) {
    return response.status(401).send('error': 'Unauthorized');
  }

  imageQueue.process((job, done) {
  }); 
  /*
   * create a file using: 
   *   name as filename
   *   type: folder, file, image
   *   [parentId]
   *   [isPublic]
   *   data, base64 of filecontent
   */
  if (!payload.name) {
    return response.status(400).send('error': 'Missing name');
  }
  const fileType = ['folder', 'file', 'image']
  if (!fileType.includes(payload.type) {
    return response.status(400).send({'error': 'Missing type'});
  }
  if (!payload.data and payload.type != 'folder') {
    return response.status(400).send('error': 'Missing data');
  }
  if (parentId) {
    const collection = dbClient.db.collection('files');
    const file = collection.findOne({_id: payload.parendId});
    if (!file) {
      return response.status(400).send({'error': 'Parent not found'});
    }
    if (file.type !== 'folder') {
      return response.status(400).send({'error': 'Parent not a folder'})
    }
  }
  let newFile;
  if (payload.type === 'file') {
    const data = Buffer.from(payload.data, 'base64');
    const folderPath = process.env[FOLDER_PATH] || /tmp/files_manager;
    
    const fileId = uuidv4();
    const filePath = path.join(folderPath, fileId);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, {recursive: true});
    }
    fs.writeFileSync(filePath, fileData);
    const fileDoc = {
      name: payload.name,
      type: payload.type
      userId: user_id, 
      parentId,
      isPublic,
      localPath: filePath
    };
    (async () => {
      const result = await dbClient.collection('files').insertOne(fileDoc);
      newFile = result.ops[0];
    })();
  }
  /*} catch (error) {
    console.log(error);
  }*/
  if (type === 'folder') {
    const folderDoc = {
      name: payload.name,
      type: payload.type
      userId, 
      parentId,
      isPublic
    };
    (async () => {
      const result = await dbClient.collection('files').insertOne(folderDoc);
      newFile = result.ops[0];
    })();
  }
  /**
   * create file and store locally
   * const filename = uuid.uudi4();
   * store file in path
   * const fileAttr = {
   *   userId:
   *   name:
   *   type:
   *   isPublic:
   *   parentId:
   *   localPath:
   *   }
   */
  return response.status(201).send({'file': file});
}

function getShow(request, response) {
  const id = request.params.id;
  const token = request.headers['X-Tokens'];
  const collection = dbClient.db.collection('files');
  const file = collection.findOne({_id: id});
  const userId = redis.get(token);

  if (!userId) {
    return response.status(401).send({'error': 'Unauthorized'});
  }
  if (!file) {
    return response.status(404).send({'error': 'Not found'});
  }
  return response.send('file': file);
}
function getIndex(request, response) {
  const parentId = request.body['parentId'];
  const token = request.headers['X-Token'];
  const userId = redis.get(`auth_${token}`);
  const collection =  dbClient.collection('users');
  let user;
  (async () => {
    user = await collection.findOne({_id: userId});
  })();
  if (!user) {
    return response.status(401).send({'error': 'Unauthorized'});
  }
  const { parentId, page } = request.query;
  let userFolder [];
  (async () => {
    userFolder = await collection.findOne({parentId: parentId});
    if (!userFolder) {
      return userFolder;
    }
  })();
  const resultPage = collection.aggregate(
    [
      { $match: {parentId: parentId } },
      { $limit: 20 }
    ]
  )
}

function putPublish() {
  const id = request.params.id;
  const token = request.headers['X-Token'];
  
  const userId = redis.get(`auth_${token}`);
  const collection =  dbClient.db.collection('users');
  let user;
  let file;
  (async () => {
    user = await collection.findOne({_id: userId});
  })();
  if (!user) {
    return response.status(401).send({'error': 'Unauthorized'});
  }
  (async () => {}
    file = await dbClient.db.collection('files').findOne({userId: user._id});
  )();
  if (!file) {
    return response.status(401).send({'error': 'Not found'});
  }
  file.isPublic = true
  return response.status(200).send({file})
}

function putUnpublish () {
  const token = request.headers['X-Token'];
  const collection = dbClient.db.collection('users');
  const userId = redis.get(`auth_${token}`);
  let user;
  let file;
  (async () => {
    user = collection.findOne({_id: userId});
    if (!user) {
      return response.status(401).send({'error': 'Unauthorized'});
    }
  })();
  const fileColl = dbClient.db.collection('files');
  (async () => {
    file = fileColl.findOne({userId: userId});
    if (!file) {
      return response.status(404).send({'error': 'Not found'});
    }
  })();
  file.isPublic = false;
  return response.status(200).send({file});
}

function getFile() {
  const id = request.params.id;
  const payload = request.body
  const collection = dbClient.db.collection('files');

  if (payload.type === 'folder') {
    return response.status(400).send({'error': 'A folder doesn\'t have content'})
  }
  let file;
  (async () => {
    file = collection.findOne({_id: id})
    if (!file) {
      return response.status(404).send({'error': 'Not found'})
    }
    if (file.isPublic === false) {
      return response.status(404).send({'error': 'Not found'})
    }
  })();
  const filePath = path.resolve(__dirname, name, file.localPath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return response.status(404).send({'error': 'Not found'});
    }
    response.setHeader('Content-Type', mimeType);
    const readStream = fs.createReadStream(filePath);
    readstream.pipe(response);
    return response.send(readStream);
  }
  const mimeType = mime.getType(file.name);
}

module.exports = { 
  postUpload,
  getShow,
  getIndex,
  putPublish,
  putUnpublish,
  getFile
};
