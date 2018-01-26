var on = require('sendevent');
on('/eventstream', function(ev) {
  console.log(ev);
});