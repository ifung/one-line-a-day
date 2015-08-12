$(document).ready(function() {
  
  jQuery(function() {
    var timezone = jstz.determine();
    document.cookie = 'timezone=' + timezone.name() + ';';
  });
});

