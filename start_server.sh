#!/bin/bash

cd packages/backend
ps aux | grep node | grep -v grep | awk '{print $2}' | xargs kill -9
sleep 2
nohup pnpm run prod &
