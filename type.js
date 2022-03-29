#!/usr/local/bin/node
const process = require("child_process");
const alfy = require("alfy");
const toType = JSON.parse(alfy.input);

process.execSync(`echo 'tell application "System Events" to keystroke "${toType}"' | osascript`)


