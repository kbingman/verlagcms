var Verlag = {};

Verlag.Model = {};
Verlag.Collection = {};
Verlag.View = {};

Verlag.collections = {};
Verlag.views = {};
Verlag.templates = {};

// Precompile and cache a given template with Hogan.js
// compiling is the most expensive part of Mustache templates
// so we attempt to only do it once
Verlag.compile_template = function(template){
  if (Verlag.templates[template]){
    console.log('cached ' + template)
    return Verlag.templates[template];
  } else {
    Verlag.templates[template] = Hogan.compile($('#' + template).html());
    return Verlag.templates[template];
  }
};


  
