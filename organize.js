let fs=require("fs"); //This module enables us to perform CRUD operations. 
let path =require("path"); //It extracts the file name from the path.

//This is an object and according to this we will organize our files 
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    Images:["jpg","bip","png","gif","raw","tif"]
}

function organizefn(dir)
{
    let destination;
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
            //Setting the Destination Path
            destination=path.join(dir,"organize_file"); //Use to store the Organized file.
            //If the destination folder is already there then no need to make a new folder.
            if(fs.existsSync(destination) == false)
            {
                fs.mkdirSync(destination);
            }
        }
        organize_helper(dir,destination); //Organizes the files according to its Category.
    }
}




function organize_helper(src,dst)
{
    let ChildName=fs.readdirSync(src); //Stores all the files of src.
    //console.log(ChildName);
    for(let i=0;i<ChildName.length;i++)
    {
        let address=path.join(src,ChildName[i]); //Setting up the path.
        let isFile=fs.lstatSync(address).isFile();
        if(isFile)
        {
            let category=getCategory(ChildName[i]); //Stores the Category in which the file lis.
            //console.log(ChildName[i],"  --->>  ",category);
            SendFiles(address,dst,category); //Sends Files to the destination.
        }
    }
} 

//Returns the Category On the basis of extension.
function getCategory(Child_name) {
    let ext = path.extname(Child_name); //Storing all the extension present in an unorganized folder in (.mp4) format in array.
    ext = ext.slice(1); //Deleting the (.) from all the extension present in ext.

    //Traversing to all the object of types to find the extension.
    for (let type in types) {
        //Firstly Traverse at index 0 i.e media and then so on.
        let category = types[type];
        //Traversing to find the Category.
        for (let i = 0; i < category.length; i++) {
            if (ext == category[i]) {
                return type;
            }
        }
    }
    //If Category Doesn't Exist Classify it to others.
    return "others";
}

//Copies the files to the destination
function SendFiles(src,dest,category)
{
    let category_path = path.join(dest,category);
    //If the Category folder is already there then no need to create new one.
    if(!fs.existsSync(category_path))
    {
        fs.mkdirSync(category_path);
    }
    let FileName=path.basename(src); //Extracts File name from src
    let DestFileName=path.join(category_path,FileName); //Setting up the destination path
    fs.copyFileSync(src,DestFileName); //Copying the files to the destination path from the source path.
    fs.unlinkSync(src); //Deletes the files from Unorganized folder(source).
}

//Helps us to import this file to other files so that we can access its functionality.
module.exports={
    organizekey:organizefn
}