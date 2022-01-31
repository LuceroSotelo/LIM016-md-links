import * as api from './mdLinks';
import * as process from 'process';
import * as color from 'chalk';
import * as commandOptions from './options';
import * as stats from './stats';
import * as helpMessage from './message.js'

const argv = process.argv;

function cliMdLinks(argv) {
    const [, , path, ...allOptions] = argv;
    if (path === '--help') return console.log(helpMessage);
    const options = commandOptions(allOptions);
    api.mdlinks(path, options)
        .then(links => {
            if (options.stats) {
                const totalLinks = links.length;
                console.log(color.cyanBright('Total: ', totalLinks) + '\n' + color.green('Unique: ', stats.uniqueLinks(links)));
                if (options.validate) {
                    console.log(color.red('Broken: ', stats.brokenLinks(links)) + '\n' + color.redBright('Links without status: ', stats.noStatusLinks(links)));
                }
            } else {
                links.forEach((link) => {
                    console.log(color.magenta(link.file), color.cyan(link.href),
                        (options.validate) ? ((link.ok) ? color.green('ok', link.status) : color.red('fail', link.status)) : '',
                        link.text, link.line);
                });
            }
        })
        .catch(error => console.log(color.bgred(error)));
}

cliMdLinks(argv);
