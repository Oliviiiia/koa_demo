const mongoose = require('mongoose');

const path = "mongodb://localhost:27017/flomo";

mongoose.connect(path);

mongoose.connection.on('error', function () {
    throw new Error('链接失败');
    process.exit();
})
mongoose.connection.on('open', async () => {
    console.log('连接数据库成功');
})