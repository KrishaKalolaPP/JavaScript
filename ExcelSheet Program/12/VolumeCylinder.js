class Cylinder{
    radius=0;
    height=0

    constructor(r,h){
        this.radius=r
        this.height=h
    }

    volume(){
        let vol= (3.14*this.radius*this.radius*this.height).toFixed(4)
        return "Volume of Cylinder is: " , vol
    }
}


const c1=new Cylinder(10,10);
console.log(c1.volume())
const c2=new Cylinder(1,11);
console.log(c2.volume())
const c3=new Cylinder(2,3);
console.log(c3.volume())