#!/bin/sh
deno bundle --config=tsconfig.json --no-check ./source/main.ts ./public/main.bundle.js
