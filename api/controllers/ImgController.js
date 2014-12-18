/**
 * ImgController
 *
 * @description :: Server-side logic for managing imgs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res){
    return res.view('homepage',{title:"welcome"});
  },
  // se suben datos de la imagen hacia la bd desde un form
  
  //mostrar imagenes en una vista como el index 
  getImg: function(req, res){
    Img.find(req.body).exec(function (err, res){
      if(err) return res.notFound();
    });
  },
  //busqueda imagenes de manera global
 postAll: function(req, res){
  Img.find().where({title:req.body}).exec(function (err, result){
    if(err) return console.log(err);
    console.log(result);
    return res.view('imagenes',{result:result});
  });
 },
 account: function(req, res){
  return res.view('auth/account');
 }
};