const twilio = require("twilio");

const sendSms = async (send_to, send_from) => {
    const client = new twilio("ACc7e571480227958fc2e410b4fc2b6516", "088b738f06cf0b0b2b6d0e6a72b68b01");

    await client.messages.create({
        body: `Hey ${send_to}`,
        from: send_from,
        to: send_to
    })
        .then(message => console.log(message.sid, "message sent"))
        .catch(err => console.log(err, "error"));
};

module.exports = sendSms;






