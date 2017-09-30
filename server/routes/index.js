//const todosController = require('../controllers').todos;
//const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const noteItemsController = require('../controllers').noteItems;

module.exports = (app) => {
  app.get('/', (req, res) => res.sendFile(`../view/index.html`));
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the NOTE SYSTEM API!',
  }));
  app.post('/api/users', usersController.create);//create user
  app.post('/api/users/check', usersController.check);//check user pwd
  app.get('/api/users/:userid', usersController.retrieve);//get user info
  app.post('/api/users/:userid', usersController.update);//update user
  app.post('/api/users/pwd/:userid', usersController.updatePwd);//update pwd
	
  app.post('/api/notes/:userid', noteItemsController.create);//create note
  app.post('/api/notes/:userid/items/:noteid', noteItemsController.update);//update note
  app.get('/api/notes/:userid/items/:noteid', noteItemsController.destroy);//get note
};
