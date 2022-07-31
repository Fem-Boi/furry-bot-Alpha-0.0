import Promise from 'bluebird';


function escapeMessage(client, evt, suffix) {
  let input = suffix || '\u{d83e}\u{dd14}';
  let result = '';
  for (var i in input) {
    result += `\\u{${input.charCodeAt(i).toString(16)}}`;
  }
  return Promise.resolve(evt.message.channel.sendMessage('**Escaped output for ' + input + '**\n```js\n' + result + '\n```'))
  .catch(err => {
    let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong: ${err}` };
    return evt.message.channel.sendMessage('', false, embed);
  });
}

export default {
  escape: escapeMessage
};
