/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	

  /**
   * `FileController.upload()`
   *
   * Upload file(s) to the server's disk.
   */
  upload: function (req, res) {
    var namefile = req.body.title+"."+req.body.format;
    // e.g.
    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    // etc.
    //
    // Node defaults to 2 minutes.
    res.setTimeout(0);

    req.file('avatar')
    .upload({

      // You can apply a file upload limit (in bytes)
      dirname:'/var/www/assets/public',
      saveAs:namefile,
      maxBytes: 1000000
      
    }, function whenDone(err, uploadedFiles) {
      if (err) return res.serverError(err);
      Img.create({

        title:req.body.title,
        author:req.body.author,
        format:req.body.format,
        price:req.body.price,
        description:req.body.description,
        uri:req.body.title+"."+req.body.format,
        category:req.body.category})
      .exec(function (err, result){
        if(err) return console.log(err);
        return res.redirect('/');
      });
     /* else return res.json({
        files: uploadedFiles,
        textParams: req.body.title,

      });
*/    console.log(uploadedFiles);
    });

  },
   /* createImg: function(req, res){
    Img.create(req.body).exec(function (err, result){
      if(err) return console.log(err);
      return res.redirect('/');
    });
  },*/

  /**
   * `FileController.s3upload()`
   *
   * Upload file(s) to an S3 bucket.
   *
   * NOTE:
   * If this is a really big file, you'll want to change
   * the TCP connection timeout.  This is demonstrated as the
   * first line of the action below.
   */
  s3upload: function (req, res) {

    // e.g.
    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    // etc.
    //
    // Node defaults to 2 minutes.
    res.setTimeout(0);

    req.file('avatar').upload({
      adapter: require('skipper-s3'),
      bucket: process.env.BUCKET,
      key: process.env.KEY,
      secret: process.env.SECRET
    }, function whenDone(err, uploadedFiles) {
      if (err) return res.serverError(err);
      else return res.json({
        files: uploadedFiles,
        textParams: req.params.all()
      });
    });
  },


  /**
   * FileController.download()
   *
   * Download a file from the server's disk.
   */
  download: function (req, res) {
    require('fs').createReadStream(req.param('path'))
    .on('error', function (err) {
      return res.serverError(err);
    })
    .pipe(res);
  }
};

