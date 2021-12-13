const fs = require('fs');
const path = require('path');


let notesPath = path.join(__dirname, '../data/text.json');
let notesData = JSON.parse(fs.readFileSync(notesPath, 'utf8'));

class Note {

    //根据用户名得到所有笔记
    //请求必须有返回（return）不然会报404错误
    getData(ctx){
    
        let username = ctx.request.query.username;
    
        let notesArr = notesData.filter((text) => text.username == username);

        console.log(notesArr);
        return  ctx.response.body = {
            code:1,
            message:"请求成功",
            notesData:notesArr
        }
    }
    //添加笔记
    add(ctx) {
        let {text,timestamp,username} = ctx.request.body;
        console.log('username',username);
        //写到数据库
        notesData.push({ text, timestamp,username});
        fs.writeFileSync(notesPath, JSON.stringify(notesData));
        return  ctx.response.body = {
            code:1,
            message:"添加成功",
            noteData:{
                text, timestamp
            }
        }
    }
    //删除笔记
    delete(ctx) {
        let id = ctx.request.body.id;//拿到id
        console.log('id',id);
        //找到对应的数据
        let textIdx = notesData.findIndex((text) => text.timestamp == id);
         
        //没有找到
        if (textIdx == -1) {
            return ctx.response.body = {
                code:0,
                message:"没有对应数据"
            }
        }
        //删除数据
        notesData.splice(textIdx, 1);
      
        fs.writeFileSync(notesPath, JSON.stringify(notesData));
        return ctx.response.body = {
            code:1,
            message:"删除"
        }
    }
    //搜索
    search(ctx){
        let {words,username} = ctx.request.body;
        console.log('words', words);
        //找到对应的数据
        let notesArr = notesData.filter((note) => note.text.includes(words) && note.username == username );
        console.log("data",notesArr);
        return  ctx.response.body = {
            code:1,
            message:"请求成功",
            notesData:notesArr
        }
    }
}

module.exports = new Note();