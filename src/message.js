import { magenta, yellow, italic, blue, green, cyan } from 'chalk';

const asteriskLine = '*************************************************************';
const dashLine = '-------------------------------------------------------------';

const helpMessage = `
${magenta(asteriskLine)}
${yellow('                        HELP MD-LINKS')}
${magenta(asteriskLine)}
${italic('Use the library with the command md-links and inputting\nthe path:') +
    blue(' md-links <path-to-file>')}
${green('Example')}
${green(dashLine)}
$ md-links ./some/example.md
./some/example.md https://github.com/ GitHub 2
./some/example.md https://fabook.c/ Facebook 6
./some/example.md http://google.com/x Google 10
${green(dashLine)}

${italic('If you want to use options, you can try the command:')}
${blue('md-links <path-to-file> [options]')}

${cyan('Example option --validate: Verify if link is valid')}
${green(dashLine)}
$ md-links ./some/example.md --validate
./some/example.md https://github.com/ ok 200 GitHub 2
./some/example.md https://fabook.c/ fail noStatus Facebook 6
./some/example.md http://google.com/x fail 404 Google 10
${green(dashLine)}

${cyan('Example option --stats: Statistics')}
${green(dashLine)}
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
${green(dashLine)}

${cyan('Example option --validate --stats')}
${green(dashLine)}
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
Broken: 2
${green(dashLine)}`;

export default {
    helpMessage
};