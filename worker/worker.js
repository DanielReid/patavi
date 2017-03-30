'use strict';
var amqp = require('amqplib/callback_api');
var fs = require('fs');
var program = require('commander');

function quitIfError(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}

program
  .version('0.0.1')
  .option('-m, --method [name]', 'R method to execute')
  .parse(process.argv);

var method = program.method;
if (!method) {
  console.error('missing argument -m / --method');
  process.exit(1);
}
amqp.connect('amqp://' + process.env.PATAVI_BROKER_HOST, function(err, conn) {
  quitIfError(err);
  console.log('amqp connected');
  conn.createChannel(function(err, ch) {
    quitIfError(err);
    console.log('channel created');
    ch.prefetch(1);

    ch.assertExchange('rpc_status', 'topic', { durable: false }); // status update topic
    console.log('status topic exchange done');

    console.log('method: ' + method);

    ch.assertQueue(method);
    ch.consume(method, function reply(msg) {
      var requestBody = new Buffer(parseInt(JSON.stringify(msg.content.toString(), null, 2)));
      console.log('send to opencpu ' + requestBody);
      ch.sendToQueue(msg.properties.replyTo,
        new Buffer('reply message'), { correlationId: msg.properties.correlationId });
      ch.ack(msg);
    });
  });
});
