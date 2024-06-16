import chalk from 'chalk';
import { exit } from 'process';

export const logger = {
    log: (message) => {
        console.log(chalk.white("[LOG]: " + message));
    },
    error: (message) => {
        console.log(chalk.red("[ERROR]: " + message));
        exit(1);
    },
    success: (message) => {
        console.log(chalk.green("[SUCCESS]: " + message));
    },
    info: (message) => {
        console.log(chalk.blue("[INFO]: " + message));
    },
    debug: (message) => {
        console.log(chalk.magenta("[DEBUG]: " + message));
    },
    warn: (message) => {
        console.log(chalk.yellow("[WARN]: " + message));
    },
}
