#!/bin/bash

greet(){
     echo "================================="
     echo "Welcome to My Devops Journey!"
     echo "================================="
}

system_info(){
      echo "Current User : $(whoami)"
      echo "Hostname     : $(hostname)"
      echo "Date         : $(date)"
}

greet
echo ""
system_info

