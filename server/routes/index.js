const router = require('koa-router')();

const userController = require('../controller/user');
const notesController = require('../controller/notes');

//注册登录
router.post('/users/register', userController.register)
      .post('/users/login', userController.login);

//笔记管理
router.get('/users/notes', notesController.getAllData)
      .post('/users/notes/add', notesController.add)
      .post('/users/notes/delete', notesController.delete)
      .post('/users/notes/update',notesController.update)
      .post('/users/notes/search', notesController.search)


module.exports = router;
