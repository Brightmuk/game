var dateTime = require('node-datetime')
var dt = dateTime.create();
var formatted = dt.format('m/d/Y H:M:S');
console.log(formatted);


console.log(dt._created)