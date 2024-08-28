const { createClient } = require('redis');

async function get(key) {
  const value = await client.get(key);
  return value;
}

async function set(key, value, duration) {
  await client.set(key, value, {EX: duration});
}

(async () => {
  let client;
  client = await createClient().on('error', (err) => console.log(err)).connect();
    console.log(client.isReady);
    console.log(await client.get('myKey'));
    await client.set('myKey', 12, {EX: 5});
    console.log(await client.get('myKey'));

    setTimeout(async () => {
        console.log(await client.get('myKey'));
    }, 1000*10)
})();

