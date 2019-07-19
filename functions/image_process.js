const sharp = require('sharp');
const fetch = require('node-fetch');

let buffers = {};

const options = {
    async jpeg  (data){await sharp(data[0][0]).jpeg().toFile(`./files/${data[0][1]}.jpeg`); return `${data[0][1]}.jpeg`},
    async png   (data){await sharp(data[0][0]).png().toFile(`./files/${data[0][1]}.png`); return `${data[0][1]}.png`},
    async tiff  (data){await sharp(data[0][0]).tiff().toFile(`./files/${data[0][1]}.tiff`); return `${data[0][1]}.tiff`},
    async "webp/sticker"(data){await sharp(data[0][0]).webp().toFile(`./files/${data[0][1]}.webp`); return `${data[0][1]}.webp`},
    async resize(data){return},
}

const fetch_image = async (msg, document) =>{
    const filename = msg.photo && msg.photo[msg.photo.length-1].file_id || msg.document && msg.document.file_id;
    buffers[msg.from.id] = [await fetch(document.fileLink).then(e=>e.buffer()), filename];
}

const handleResize = async (data, buffer) =>{
    data = data.split('x')
    await sharp(buffer[0]).resize(parseInt(data[0]), parseInt(data[1] || data[0])).png().toFile(`./files/${buffer[1]}.png`);
    return `${buffer[1]}.png`
}
module.exports = {
    fetch_image,
    buffers,
    options,
    handleResize
}