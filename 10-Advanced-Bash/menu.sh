#!/bin/bash

echo "CHoose an option:"
echo "1. Show Date"
echo "2. Show Current User"
echo "3. Show Current Directory"

read option

case $option in
       1)
          date
          ;;
       2)
          whoami
          ;;
       3)
          pwd
          ;;
       *)
          echo "Invalid Option!"
          ;;
esac
