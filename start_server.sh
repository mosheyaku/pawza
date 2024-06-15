#!/bin/bash

cd packages/backend
kill $(cat pid) || true  # Ignore errors if the process is not running
nohup pnpm run prod &
echo $! > pid
