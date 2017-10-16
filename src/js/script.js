var tplStr = '\
<div> {{ a }} </div>\
';

var tpl = Handlebars.compile(tplStr);
var res = tpl({
    a: 'abc'
});

console.log(res);