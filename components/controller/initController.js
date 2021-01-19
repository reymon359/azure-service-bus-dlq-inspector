module.exports = () => {
  const start = ({ bus }, cb) => {
    const process = async message => {
      console.log(message);
      const publishMessage = await bus.publish('productUpdated')
      console.log(publishMessage);
      await publishMessage(message.body,{label: 'noordhoff'})
      // await bus.publish('productUpdated')
      await message.complete();
      console.log(message.body);
    };




    bus.processDlq('default', process);

    const api = {};
    cb(null, api);
  };

  return { start };
};


// Telekosmos code
//
// module.exports = () => {
//   const start = async ({ bus }, cb) => {
//     const process = async message => {
//       // await message.complete();
//       console.log(message.body);
//     };
//     /*
//     const processMsg = msg => {
//       console.log('[DLQ.Inspector] Processing message: ', msg.body);
//       return true;
//     };
//     // bus.processDlq('default', process);
//     const subscribe = bus.subscribe(console.error);
//     subscribe('orderConfirmed', processMsg);
//     */
//     const processDLQ = async () => {
//       console.log('Processing DLQ for productIngestion');
//       let counter = 1;
//       const handler = async msg => {
//         const { body, messageId } = msg;
//         await msg.complete();
//         console.log(`DLQ Message ${counter} completed ${messageId}`);
//         counter++;
//       };
//       // await bus.processDlq('productTransformed', handler);
//       await bus.processDlq('productIngestion', handler); // maybe peekDlq in this case!!!
//     };
//     await processDLQ();
//     // console.log('Wiping out DLQ for productTransformed');
//     // await bus.emptyDlq('productIngestion'); // actually not working
//     console.log('END');
//     /*
//     const processFn = () => {
//       let counter = 1;
//       const handler = async msg => {
//         const { body, messageId } = msg;
//         await msg.complete();
//         counter++;
//         console.log(`Message ${counter} completed ${messageId}`);
//       };
//       // bus.processDlq('productIngestion', handler);
//       const subscribe = bus.subscribe(console.error);
//       subscribe('productTransformed', handler);
//     };
//     processFn();
//     */
//     const api = {};
//     // cb(null, api);
//     return api;
//   };
//   return { start };
// };
