function Chair(){
    this.color='blue'
    this.numberOfChairs=100
}
Chair.prototype.canRotate=function(){
    console.log("yesssss....")
}

const chair1= new Chair()
chair1.canRotate()
const chair2= new Chair()
chair2.color
console.log(chair2.color)
const chair3= new Chair()
console.log(chair3.numberOfChairs)
