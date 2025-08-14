function square(number){
    return function(){
        const sqr=number*number
        document.writeln("Square of entered number is "+ sqr)
        console.log(sqr);   
    }
}

let ans=Number(prompt("enter the number"))

let innerfunction=square(ans)
innerfunction()



