#!/bin/sh
find ./py-backend -name '*.py' -o -name '*.sh' |xargs wc -l|grep total & find ./react-frontend/ -path ./react-frontend/node_modules -prune -o -name '*.js*' -o -name '*.scss' -o -name '*.sh'|xargs wc -l|grep total
