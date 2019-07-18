const QRCode = require('qrcode');

module.exports = async data => {
    try {
        if(!data){
            throw new Error('Data is not defined!');
        }
        return await QRCode.toDataURL(data);
    } catch (error) {
        throw new Error(error.message);   
    }
};