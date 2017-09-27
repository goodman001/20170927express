const NoteItem = require('../models').NoteItem;

module.exports = {
  create(req, res) {
	var currdatetime = new Date();
    return NoteItem
      .create({
		    title: req.body.title,
        content: req.body.content,
		    builddate:currdatetime,
		    noteId: req.params.userid,
      })
      .then((noteItem) => {
        if (!noteItem) {
          return res.send({
            "code":404,
            "success":"Note build fail!"
          });
        }
        return res.send({
            "code":200,
            "success":"Note build success"
          });
      })
      .catch(error => {
		return res.send({
			"code":404,
			"success":"Note build fail!"
		  });
	});
  },

  update(req, res) {
    return NoteItem
      .find({
        where: {
          id: req.params.noteid,
          noteId: req.params.userid,
        },
      })
      .then(noteItem => {
        if (!noteItem) {
          return res.send({
            "code":404,
            "success":"Note Edit fail!"
          });
        }

        return noteItem
          .update({
            title: req.body.title || noteItem.title,
            content: req.body.content || noteItem.content,
          })
          .then(updatedNoteItem => {
			if (!updatedNoteItem) {
			  return res.send({
				"code":404,
				"success":"Note update fail!"
			  });
			}
			return res.send({
				"code":200,
				"success":"Note update success"
			  });
		})
          .catch(error => {
				return res.send({
					"code":404,
					"success":"Note build fail!"
				  });
			});
      })
      .catch(error => {
				return res.send({
					"code":404,
					"success":"Note build fail!"
				  });
			});
  },

  destroy(req, res) {
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
