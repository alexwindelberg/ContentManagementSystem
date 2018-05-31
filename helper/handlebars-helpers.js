module.exports = {


  select: function(selected, options){
    // The options paramater is an object you can pass back to
    // handle bars that handlebars can then use inside the select_object
    // function/area this funcionallity is not exclusive to handlebars
    // from what I can tell yet but basically pass data back to the front-end
    // so that it can be manipulated by the front-end framework in which in our
    // case is handlebars
    return options.fn(this).replace(new RegExp('value=\"'+ selected +'\"'), '$&selected="selected"');

  }





}
