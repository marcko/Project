/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  createCategory: function(req, res){
    Category.create(req.body).exec(function (err, result){
      if(err) return res.notFound();
      return res.redirect('/');
    });
  },
  searchCategory: function(req, res){
    Category.find().populate('img').exec(function (err, result){
      if(err) return res.notFound();
      console.log(result);
      return res.view('categoria',{result:result});
    });
  }, 
  // se va a crear un metodo por cada categoria agregada example: categoria "Primaria"
  Primaria: function(req, res){
    Img.find().where({category:"primaria"}).exec(function (err, result){
      if(err) return res.notFound();
      console.log(result);
      return res.view("primaria",{result:result});
    });
  }
};