import re

def format_colloquim(textfile: str) -> str:
    'Reads a colloquim from a textfile path and formats it properly'
    colloquim = open(textfile)

    host = ''
    date = ''
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    line_no = 0
    formatted = ''
    for line in colloquim:
        if line.startswith('(Host'):
            host = line.rstrip()[1:-1]
            host = host.replace('Host', '<strong>Host</strong>')
            continue
        if line.split(', ')[0] in days:
            date = line.rstrip()
            continue
        elif line.startswith('SPEAKER'):
            line = line.replace('SPEAKER', host + '<br />\n<strong>Speaker</strong>').rstrip() + '<br />'
        elif line.startswith('UNIVERSITY'):
            line = line.replace('UNIVERSITY', '<strong>University</strong>').rstrip() + '<br />'
        elif line.startswith('TIME'):
            line = line.replace('TIME:', '<strong>Time:</strong> ' + date + ',').rstrip() + '<br />'
        elif line.startswith('LOCATION'):
            line = line.replace('LOCATION', '<strong>Location</strong>').rstrip() + '<br />'
        elif line.startswith('ABSTRACT'):
            line = '\n'
        if line.rstrip() != '':
            line_no += 1
            if line_no == 1:
                formatted += '<h3>' + line.rstrip() + '</h3>\n'
                formatted += '<p>\n'
            else:
                formatted += line.rstrip()+'\n'
                if line_no == 5:
                    formatted += '</p>\n'
                    formatted += '<p>\n'
    formatted +='</p>\n'
    formatted +='<hr />\n'
    return formatted

def link_programs(textfile: str) -> str:
    'Searches a string for a program name and replaces it with the proper <a> tags to link it'
    # (text)(?![^<]*>)
    program_list = {'Full-Time MBA': 'https://merage.uci.edu/programs/masters/full-time-mba/index.html',
                    'Fully Employed MBA': 'https://merage.uci.edu/admissions/masters-admissions/fully-employed-mba.html',
                    'Health Care Executive MBA': 'https://merage.uci.edu/programs/masters/healthcare-executive-mba/index.html',
                    'Executive MBA': 'https://merage.uci.edu/programs/masters/executive-mba/index.html',}

    text_file = open(textfile)
    text = text_file.read()

    for program in sorted(program_list, reverse=True):
        pattern = '({})(?![^<a*>]*</a>)'.format(program)
        # while the text still has program names to be replaced
        while text != re.sub(pattern, '<a href="' + program_list[program] + '">' + program + '</a>', text):

            # print(re.sub(pattern, '<a href="' + program_list[program] + '">' + program + '</a>', text))
            text = re.sub(pattern, '<a href="' + program_list[program] + '">' + program + '</a>', text)
    return text

if __name__ == '__main__':
    print(format_colloquim('C:/Users/alexanld/Desktop/rc.txt'))
    print(link_programs('text.txt'))