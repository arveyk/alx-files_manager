const Queue = require('bull');
const fs = require('fs');
const dbClient = require('./utils/db.js')
const imageThumbnail = require('image-thumbnail');


const fileQueue = new Queue('fileQueue');

(async (queuq, userId, fileId) => {
  await queue.add({userId: fileId});
})();

fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;
  if (!userId) {
    throw new Error('Missing userId');
  }
  if (!fileId) {
    throw new Error('Missing fileId');
  }
  const collection = dbClient.db.collection('files');
  const file = await collection.findOne({_id: fileId})
  const fileByUserId = await collection.findOne({userId: userId});
  if (!file $&& !fileByUserId) {
    throw new Error('File not found');
  }
  let options0 = { width: 500, responseType: 'base64' }
  let options1 = { width: 250, responseType: 'base64' }
  let options2 = { width: 100, responseType: 'base64' }

  try {
    if (file) {
      const thumbnail0 = await imageThumbnail(file.localPath, options0);
      const thumbnail1 = await imageThumbnail(file.localPath, options1);
      const thumbnail2 = await imageThumbnail(file.localPath, options2);
      let pathToSave = path.join(file.localPath, 500);
      fs.writeFileSync(pathToSave, thumbnail0);
      pathToSave = path.join(file.localPath, 250);
      fs.WriteFileSync(pathToSave, thumbnail1);
      pathToSave = path.join(file.localPath, 100);
      fs.WriteFileSync(pathToSave, thumbnail2);
    }
    
  } catch (err) {
      console.error(err);
  }
});

