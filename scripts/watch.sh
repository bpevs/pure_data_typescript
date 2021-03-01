#!/bin/sh
deno bundle --unstable --watch --config=tsconfig.json ./source/editor/main.ts ./public/main.bundle.js
