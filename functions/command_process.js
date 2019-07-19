const fs = require('fs')
const image = require('./image_process')

const parseCommand = async (command, buffer, bot) =>{
    if(command.data == "resize") return;
    var file = await image.options[command.data]([buffer, command.from.id])
    sendFile(file, bot, command.from.id)
    //Immediately get rid of the file
    deleteFile(file)
}

const sendFile = (f,b,u) => b.sendDocument(u,`./files/${f}`);
const deleteFile = name => fs.unlink(`./files/${name}`, e=>{if(e) console.log(e)});


module.exports={
    parseCommand,
    sendFile,
    deleteFile,
}
