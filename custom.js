function rescol() {
  var colloquim = document.getElementById('rescol').value;

  var host = '';
  var date = '';
  var output = '';
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var lines = colloquim.split('\n');

  for (i=0; i<lines.length; i++) {
    if (lines[i].startsWith('(Host')) {
      host = '<strong>Host(s)</strong>: ' + lines[i].split(': ')[1].slice(0, -1);
      lines[i] = ''
    } else if (days.includes(lines[i].split(', ')[0])) {
      date = lines[i];
      lines[i] = ''
    } else if (lines[i].startsWith('SPEAKER')) {
      lines[i] = lines[i].replace('SPEAKER', host + '<br />\n<strong>Speaker(s)</strong>') + '<br />'
    } else if (lines[i].startsWith('UNIVERSITY')) {
      lines[i] = lines[i].replace('UNIVERSITY', '<strong>University</strong>') + '<br />'
    } else if (lines[i].startsWith('TIME')) {
      lines[i] = lines[i].replace('TIME:', '<strong>Time</strong>: ' + date + ',') + '<br />'
    } else if (lines[i].startsWith('LOCATION')) {
      lines[i] = lines[i].replace('LOCATION', '<strong>Location</strong>') + '<br />\n</p>'
    } else if (lines[i].startsWith('ABSTRACT')) {
      lines[i] = ''
    } else if (i == lines.length - 1) {
      lines = lines.filter(function(x){ return x.length > 2})
      for (i=0; i<lines.length; i++) {
        if (i > 4 && i != 0) {
          lines[i] = '<p>' + lines[i] + '</p>'
          if (i == lines.length - 1) { lines[i] = lines[i] + '<hr />'}
        } else {
          lines[0] = '<h3>' + lines[0] + '<h3>' + '\n<p>'
        }
        output = output + lines[i] + '\n';
      }
    }
  }; //
  document.getElementById('col_result').value = output;
};;

function linker() {
  var program_list = {'Full-Time MBA': 'https://merage.uci.edu/programs/masters/full-time-mba/index.html',
                      'Fully Employed MBA': 'https://merage.uci.edu/admissions/masters-admissions/fully-employed-mba.html',
                      'Health Care Executive MBA': 'https://merage.uci.edu/programs/masters/healthcare-executive-mba/index.html',
                      'Executive MBA': 'https://merage.uci.edu/programs/masters/executive-mba/index.html',};

  var str = document.getElementById('linker').value;

  for (var key in program_list) {
    var re = new RegExp(`(${key})(?![^<a.+>]*<\/a>)`);
    while (str !== str.replace(re, '<a href="' + program_list[key] + '">' + key + '</a>')) {
      str = str.replace(re, '<a href="' + program_list[key] + '">' + key + '</a>')
    }
  }

  document.getElementById('link_result').value = str;
};;
