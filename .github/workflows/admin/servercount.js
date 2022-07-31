import Promise from 'bluebird';
import R from 'ramda';

import { getShardsCmdResults } from '../../redis';

let argv = require('minimist')(process.argv.slice(2));


function servercount(client, evt, suffix, lang, json) {
  const server_count = {guilds: client.Guilds.length, channels: client.Channels.length, users: client.Users.length};

  if (argv.shardmode && !isNaN(argv.shardid) && !isNaN(argv.shardcount) && !json) {
    return getShardsCmdResults('servers')
      .then(R.append({results: server_count}))
      .then(R.pluck('results'))
      .filter(results => !R.isEmpty(results))
      .reduce((sum, res) => R.zipObj(R.keys(res), R.map(key => sum[key] + res[key], R.keys(res))))
      .then(res => `Connected to ${res.guilds} servers, ${res.channels} channels and ${res.users} users.`);
  }

  if (json) return Promise.resolve(server_count);
  return Promise.resolve(`Connected to ${server_count.guilds} servers, ${server_count.channels} channels and ${server_count.users} users.`);
}

export default {
  servercount
};
