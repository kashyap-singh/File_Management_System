#!/usr/bin/env node
let inputA = process.argv.slice(2); //It takes the source location as an array
let treeobj=require("./tree"); //This module will return us the tree
let helpobj=require("./help"); //Contain Commandes to run the code
let organizeobj=require("./organize"); //This will Organize our files according to its type


let command=inputA[0]; //This will Contain the source location

switch(command)
{
    case "tree":
        treeobj.treekey(inputA[1]); //Using tree module
        break;
    case "organize":
        organizeobj.organizekey(inputA[1]); //Using organize module
        break;
    case "help":
        helpobj.helpkey(); //Using help module
        break;
    default:
        console.log("Please Enter Valid Input");
        break;
}


