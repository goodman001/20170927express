const User = require('../models').User;
const NoteItem = require('../models').NoteItem;
const DateItem = require('../models').DateItem;
module.exports = {
  /*create user*/
  create(req, res) {
	var md5=require("md5");
	var pwd=md5(req.body.password); 
    return User
      .create({
		username:req.body.username,
		email: req.body.email,
		password: pwd,
		gender: req.body.gender,
		location: req.body.location,
		category: req.body.category,
		price: req.body.price,
		description: req.body.description,
		role:req.body.role,
      })
      .then((user) =>{return res.send({
            "code":200,
            "success":"Register sucessfull",
            "user":user
          });})
      .catch((error) => {return res.send({
            "code":404,
            "success":"Register fail"
          });});
  },
  /*find user info*/
  retrieve(req, res) {
    return User
      .findById(req.params.userid, {
        include: [
			{
              model: NoteItem ,
              as: 'noteItems',
            },
			{
		      model: DateItem ,
              as: 'dateItems',
            },
				 ],
		order: [
          [{ model: NoteItem, as: 'noteItems' }, 'createdAt', 'ASC'],
        ],
      })
      .then((user) => {
        if (!user) {
          return res.send({
            "code":404,
            "success":"User do not match"
          });
        }
		//console.log("lalaal");
        return res.send({
            "code":200,
            "success":"user find sucessfull",
            "user":user
          });
      })
      .catch((error) => {return res.send({
            "code":404,
            "success":error
          });});
  },
  /*check user and password*/
  check(req, res) {
	var md5=require("md5");
	var pwd=md5(req.body.password);
    return User
      .findOne({ where: {username: req.body.username,password: pwd} ,include: [
		  {
          model: NoteItem ,
          as: 'noteItems',
          },
		  {
		      model: DateItem ,
              as: 'dateItems',
          },
	  ],order: [
          [{ model: NoteItem, as: 'noteItems' }, 'createdAt', 'ASC'],
        ],
               })
      .then((user) => {
        if (!user) {
          return res.send({
            "code":404,
            "success":"Username password do not match"
          });
        }
        return res.send({
            "code":200,
            "success":"login sucessfull",
            "user":user
          });
      })
      .catch((error) => {return res.send({
            "code":404,
            "success":"Username password do not match"
          });});
  },
  /*update user info*/
  update(req, res) {
	var md5=require("md5");
    return User
      .findById(req.params.userid, {
        include: [{
          model: NoteItem,
          as: 'noteItems',
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .update({
			email: req.body.email || user.email,
			gender: req.body.gender || user.gender,
			location: req.body.location || user.location,
			category: req.body.category || user.category,
			price: req.body.price || user.price,
			description: req.body.description || user.description,
          })
          .then(() => {
			return res.send({
            "code":200,
            "success":"Update sucessfull",
          });
		})
          .catch((error) => {
			return res.send({
            "code":404,
            "success":"Update fail",
          });
		});
      })
      .catch((error) => {
			return res.send({
            "code":404,
            "success":"Update fail",
          });
		});
  },
  /*modify pwd*/
  updatePwd(req, res) {
	var md5=require("md5");
	var pwd=md5(req.body.password);
    return User
      .findById(req.params.userid, {
        include: [{
          model: NoteItem,
          as: 'noteItems',
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .update({
			password: pwd || user.password,
          })
          .then(() => {
			return res.send({
            "code":200,
            "success":"Update sucessfull",
          });
		})
          .catch((error) => {
			return res.send({
            "code":404,
            "success":"Update fail",
          });
		});
      })
      .catch((error) => {
			return res.send({
            "code":404,
            "success":"Update fail",
          });
		});
  },

};
