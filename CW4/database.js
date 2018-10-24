class Course {
    constructor (name, time, date, rooms) {
        this.name = name;
        this.time = time;
        this.date = date;
        this.rooms = rooms;
    }
    toString () {
        return this.name;
    }
}
class Student {
    constructor (id, name, gpa, courses) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = courses;
    }
    toString () {
        return this.id+'';
    }
}
class Point {
    constructor (x,y) {
        this.x = x;
        this.y = y;
    }
    toString () {
        return '(' +this.x + ', ' + this.y+ ')';
    }
}
class Point3D extends Point {
    constructor (x, y, z) {
        super(x,y);
        this.z = z;
    }
    toString () {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
    }
}
class Distance {
    constructor (km = 0) {
        this.km = Math.round(km);
    }
    get miles () {
        return Math.round(this.km * 1.6);
    }
    set miles (value = 0) {
        this.km = Math.round(value / 1.6);
    }
    toString () {
        return this.km + " km"; 
    }
    static fromMiles(value) {
        let d = new Distance();
        d.miles = value;
        return d;
    }
}
class CW4 extends Menu {
    constructor () {
      	super();
		this.course=  new Course("BLM305", "15:00", new Date("2018-10-24"), ["B121"]);
		this.student=new Student(1521221031,"Muhammed Zahid Unal",2.4,this.course);
		this.distance= new Distance(200);
		this.point= new Point(4,7);
		this.point3D= new Point3D(4,7,6);
    }
}