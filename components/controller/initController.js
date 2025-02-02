module.exports = () => {
  const start = ({ bus }, cb) => {
    const process = async message => {
      await message.complete();
      console.log(message.body);
    };

    const republishMessage = async message => {
      const { body, label, _context} = message
      const topic = _context.entityPath.split('/')[0]
      try {
        await bus.publishOnTopic(topic)(body,{ label: label})
        await message.complete();
        console.log(`Message with id: ${body.id} and label: ${label} and published on topic: ${topic} and consumed`)
      }catch (error) {
        console.error(error)
        throw error
      }
    }

    // Code to add on node_modules/systemic-azure-bus/index.js
    /*
        const publishOnTopic = topic => {
      if (!topic) throw new Error(`Topic for non found!`);
      let { sender } = sendersByPublication.find(senderByPub => senderByPub.publicationId === publicationId) || {};
      if (!sender) {
        sender = topicClientFactory.createSender(topic);
      }
      return topicApi.publish(sender);
    };

		return {
      publishOnTopic,
     */


    bus.processDlq('productUpdatedNoordhoffOrders', republishMessage);
    bus.processDlq('productUpdatedPlantynOrders', republishMessage);
    // bus.processDlq('productDeletedNoordhoffOrders', republishMessage);
    // bus.processDlq('productDeletedPlantynOrders', republishMessage);

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
