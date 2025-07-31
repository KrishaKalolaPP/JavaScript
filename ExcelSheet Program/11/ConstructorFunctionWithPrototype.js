function Person(name,age){
    this.name=name
    this.age=age
}

Person.prototype.eat=function (){
    console.log(this.name+" is eating....")
}

const person1=new Person('chintu',3)
person1.eat();
const person2=new Person('mintu',5)
person2.eat();