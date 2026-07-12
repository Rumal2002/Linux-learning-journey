#!/bin/bash

echo "==============================================="
echo "       Linux System Health Report       "
echo "==============================================="

echo ""
echo "Current User:"
whoami

echo ""
echo "Hostname:"
hostname

echo ""
echo "Current Date:"
date

echo ""
echo "Disk Usage:"
df -h

echo ""
echo "Memory Usage:"
free -h

echo ""
echo "System Uptime:"
uptime

echo ""
echo "=============================================="
echo "Health Check Completed Successfully!"
echo "=============================================="
