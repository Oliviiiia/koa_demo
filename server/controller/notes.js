const NoteModel = require('../models/note')

class Note {

    //根据用户名得到所有笔记
    //请求必须有返回（return）不然会报404错误
   async getAllData(ctx){
        let username = ctx.request.query.username.toString();
        console.log("username", username);
        let notesArr = await NoteModel.find({username});
        
        ctx.response.body = {
            code:1,
            message:"请求成功",
            data:notesArr
        }
    }

    //添加笔记
   async add(ctx) {
        let {text,username} = ctx.request.body;
       
        //写到数据库
        let res = await NoteModel.create({username,text})
        return  ctx.response.body = {
            code:1,
            message:"添加成功",
            noteData:res
        }
    }

    //删除已有笔记
   async delete(ctx) {
        let id = ctx.request.body.id;//拿到id
        
        //找到对应的数据
        let text = await NoteModel.findOne({_id:id});
         
        //没有找到
        if (!text) {
            return ctx.response.body = {
                code:0,
                message:"没有对应数据"
            }
        }
        //删除数据
        NoteModel.remove({ _id: id }, function (err) {
            if (err) console.log(err,1233333);;
            // removed!
          });
        ctx.response.body = {
            code:1,
            message:"删除成功"
        }
    }

    //修改已有笔记
    async update(ctx) {
        let {_id,value} = ctx.request.body;
         //找到对应的数据
         console.log('id: ' + _id);
         let text = await NoteModel.findOne({_id:_id});
         
         //没有找到
         if (!text) {
             return ctx.response.body = {
                 code:0,
                 message:"没有对应数据"
             }
         }
         //更新数据
        let res = await NoteModel.findByIdAndUpdate({_id},{text:value},{new:true});
         ctx.response.body = {
            code: 1,
            message: "更新成功",
            data: res
        }
    }


    //搜索
   async search(ctx){
        let {words,username} = ctx.request.body;
        console.log(words);
        //找到对应的数据
        let notesArr = await NoteModel.find({text:{$regex : words},username});
        console.log("data",notesArr);
        return  ctx.response.body = {
            code:1,
            message:"请求成功",
            notesData:notesArr
        }
    }
}

module.exports = new Note();