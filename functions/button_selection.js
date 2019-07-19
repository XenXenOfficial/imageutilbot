const commands = require('./command_process')
const buttons = [ "jpeg", "png", "tiff", "webp/sticker","resize"]

const splitArr = (arr) =>{let newArr = [];
    while(arr.length>0){newArr.push(arr.splice(0,2));}
    return newArr
}

const reset_buttons = (bot, msg, buffer) =>{
    commands.parseCommand(msg, buffer, bot)
    bot.answerCallbackQuery(msg.id);
    const [chatId, messageId] = [msg.from.id, msg.message.message_id];
    const replyMarkup = {force_reply:true};
    bot.editMessageReplyMarkup({chatId,messageId},{replyMarkup});
    bot.editMessageText({chatId,messageId}, msg.data == "resize" ? "Please send the dimensions you wish to resize the image to in this format: ###x### or ###. Example: 200x500" : "Please wait...");    
}

let sendEmbed = (messageFromID, message, bot) =>{
    const replyMarkup = create_buttons(bot); 
    return bot.sendMessage(messageFromID, message, {replyMarkup});
}

const create_buttons = (bot, arr = buttons) =>{
    return bot.inlineKeyboard(splitArr(arr.map(e=>bot.inlineButton(e,{callback:e}))));
}

module.exports={
    reset_buttons,
    create_buttons,
    sendEmbed,
    buttons
}