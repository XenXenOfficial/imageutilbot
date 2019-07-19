const TeleBot = require('telebot');
const keys = require('./api_keys/api_key.json.js');
const buttons = require('./functions/button_selection')
const image = require('./functions/image_process')
const commands = require('./functions/command_process')

const bot = new TeleBot(keys.telegram_api_key)

bot.on('/start', (msg)=>msg.reply.text("Please send a file you want to work with!"))

bot.on('callbackQuery', msg => buttons.reset_buttons(bot, msg, image.buffers[msg.from.id]));

bot.on('photo', async (doc)=>{image.fetch_image(doc, await bot.getFile(doc.photo[doc.photo.length - 1].file_id));
    buttons.sendEmbed(doc.from.id,"What do you want to do?", bot)
})

bot.on('document', async (doc)=>{image.fetch_image(doc, await bot.getFile(doc.document.file_id));
    buttons.sendEmbed(doc.from.id,"What do you want to do?", bot)
})

bot.on(/\d+x\d+|\d+/, async (msg)=>{
    if(image.buffers[msg.from.id]){
        const file = await image.handleResize(msg.text, image.buffers[msg.from.id]);
        commands.sendFile(file,bot,msg.from.id)
        commands.deleteFile(file);
    }
})

process.on('unhandledRejection', error => {
});
  
bot.start()

