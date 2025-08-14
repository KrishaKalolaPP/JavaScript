class WebDev{
    projectName="abc";
    projectLength=2;
    printLanguage(language){
        console.log(language)
    }
}
class Frontend extends WebDev{
    numberOfFolders= 3;
    printLanguage(){
        super.printLanguage('JavaScript');
        return "bye from frontend"
    }
}
class Backend extends WebDev{
    numberOfFolders= 10;
    printLanguage(){
        super.printLanguage('.Net');
    }
}

const obj1=new Frontend()
console.log(obj1.projectName)
obj1.printLanguage()

const obj2=new Backend()
console.log(obj2.projectLength)
obj2.printLanguage()