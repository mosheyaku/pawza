#!/bin/bash

cd packages/backend
kill $(cat pid) > /dev/null || true  # Ignore errors if the process is not running
nohup pnpm run prod &
echo $! > pid