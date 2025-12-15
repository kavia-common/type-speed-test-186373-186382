#!/bin/bash
cd /home/kavia/workspace/code-generation/type-speed-test-186373-186382/frontend_type_speed_checker
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

