#!/bin/bash

echo "Enter your age:"

read age

if [ "$age" -ge 18 ]
then
    echo "You are an adult."
else
    echo "You are under 18."
fi
