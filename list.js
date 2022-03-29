#!/usr/local/bin/node

const alfy = require("alfy");
const {execSync} = require("child_process");
const {uniq} = require("lodash");
const hookStd = require('hook-std');

function list() {
    const result = execSync('/usr/local/bin/ykman oath accounts code')
        .toString('utf-8');
    const lines = result.split("\n");
    return lines
        .filter(it => !!it)
        .map(line => {
            const index = line.lastIndexOf(" ");
            const titleAndAccount = line.substring(0, index).trim();
            const code = line.substring(index + 1).trim();
            const [title, account] = titleAndAccount.split(":");
            return {title, account, code};
        })
}

function matchOptionsFor(app) {
    const parts = app.split(/[-_ ]/g);
    const acronym = parts.length >= 3
        ? parts.map(part => part.charAt(0)).join("")
        : undefined;

    return uniq([app, ...parts, acronym]);
}


async function run() {
    const output = list().map(({title, account, code}) => ({
            title,
            subtitle: account,
            match: [...matchOptionsFor(title), ...matchOptionsFor(account)].join(" "),
            arg: code
        })
    );
    alfy.output(output);
}


hookStd.stderr(() => {}); // remove the stderr catching from alfred, that's useless

void run();
