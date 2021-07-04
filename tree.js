
let fs=require("fs"); //This module enables us to perform CRUD operations. 
let path =require("path"); //It extracts the file name from the path.
function treefn(dir)
{
    //Checks Whether the directory path is defined or not
    if(dir==undefined)
    {
        console.log("Kindly Enter the Directory Path");
        return;
    }
    else
    {
        let Exist = fs.existsSync(dir); //Checks whether the given directory is there or not
        if(!Exist)
        {
            console.log("Kindly Check Your Directory");
            return;
        }
        else
        {
            treeHelper(dir,""); //Calling treeHelper() function.
        }
    }

}

function treeHelper(dirPath, indent) 
{
    let isFile = fs.lstatSync(dirPath).isFile(); //Returns the status of the file
    if (isFile == true) {
        let fileName = path.basename(dirPath); //Extracts File name from dirPath 
        console.log(indent + "├──" + fileName); //Represents Folders
    } else {
        let dirName = path.basename(dirPath) //Extracts File name from dirPath 
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath); //Stores the files of dirPath in a form of an array
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);  
            treeHelper(childPath, indent + "\t"); //Using Recursion
        }
    }
}

//Helps us to import this file to other files so that we can access its functionality.
module.exports={
    treekey:treefn
}