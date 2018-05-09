function updateAction(action) {
  actions = { rescol: ['Research Colloquia', 'rescol()'], linker: ['Program Linker', 'linker()'], EventTable: ['Event Table', 'eventTable()']}
  document.getElementById('input').value = '';
  document.getElementById('input').setAttribute( "onkeyup", actions[action][1] );
  document.getElementById('tool-name').innerHTML = actions[action][0]
}

function rescol() {
  var colloquim = document.getElementById('input').value;

  var host = '';
  var date = '';
  var output = '';
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var lines = breakLine(colloquim);

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
  document.getElementById('result').value = output;
  document.getElementById('result').select();
};;

function linker() {
  var program_list = {'Full-Time MBA': 'https://merage.uci.edu/programs/masters/full-time-mba/index.html',
                      'Fully Employed MBA': 'https://merage.uci.edu/admissions/masters-admissions/fully-employed-mba.html',
                      'Health Care Executive MBA': 'https://merage.uci.edu/programs/masters/healthcare-executive-mba/index.html',
                      'Executive MBA': 'https://merage.uci.edu/programs/masters/executive-mba/index.html',};

  var str = document.getElementById('input').value;

  for (var key in program_list) {
    var re = new RegExp(`(${key})(?![^<a.+>]*<\/a>)`);
    while (str !== str.replace(re, '<a href="' + program_list[key] + '">' + key + '</a>')) {
      str = str.replace(re, '<a href="' + program_list[key] + '">' + key + '</a>')
    }
  }

  document.getElementById('result').value = str;
  document.getElementById('result').select();
};;

function eventTable() {
  var schedule = breakLine(document.getElementById('input').value);
  var time = [];
  var info = [];
  for (i=0; i<schedule.length; i++) {
    var parse = schedule[i].split(' ');
    var index = 0;
    for (x=0; x<parse.length; x++) {
      if (parse[x].match(/[0-9](am)/g) || parse[x].match(/[0-9](pm)/g)) {
        index = schedule[i].indexOf(parse[x]) + parse[x].length;
      }
    }
    time.push(schedule[i].substring(0, index));
    info.push(schedule[i].substring(index + 1));
  };
  document.getElementById('result').value = scheduleTable(time, info)
  document.getElementById('result').select();
};;

function breakLine(str) {
  return str.split('\n')
};;

function scheduleTable(time, info) {
  var table = ['<table align="center" class="table-striped table" style="width: 100%;">', '<tbody>', '</tbody>', '</table>']
  for (i=0; i<time.length; i++) {
    table.splice(-2, 0, '<tr>\n<td style="text-align: right;" width="25%">'+time[i]+'</td>\n<td>'+info[i]+'</td>\n</tr>')
  }
  var tableOutput = formatHTML(table);
  return tableOutput
};;

function formatHTML(arr) {
  var output = '';
  for (i=0; i<arr.length; i++) {
    output = output + arr[i] + '\n'
  }
  return output
}
