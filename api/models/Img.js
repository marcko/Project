/**
* Img.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title:{
      type:'string',
      required:true,
      unique:true,
      index:true
    },
    author:{
      type:'string',
      required:true,
      index:true
    },
    format:{
      type:'string',
      required:true,
      index:true
    },
    price:{
      type:'integer',
      required:true
    },
    description:{
      type:'text',
      required:true
    },
    uri:{
      type:'string'
    },
    category:{
      model:'Category'
    },

//lifecycle callbacks
}

};
