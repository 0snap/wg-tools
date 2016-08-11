#!/bin/sh
echo '==========================================='
echo 'LOC py-backend:'
find ./py-backend -name '*.py' -o -name '*.sh' |xargs wc -l|grep total 

echo ''
echo 'LOC react-fontend (excluding node_modules):'
find ./react-frontend/ -path ./react-frontend/node_modules -prune -o -name '*.js*' -print -o -name '*.scss' -print -o -name '*.sh' -print|xargs wc -l|grep total
echo '==========================================='