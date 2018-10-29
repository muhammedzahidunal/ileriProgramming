class Course {
    constructor (dersCode, dersTime, dersDate, dersRooms) {
        this.dersCode = dersCode || '';
        this.dersTime = dersTime || '';
        this.dersDate = dersDate || '';
        this.dersRooms = dersRooms || [];
    }
    toString () {
        return this.dersCode+'';
    }
}

class Student {
    constructor (sId, sName, sGpa, sCourses) {
        this.sId = sId || '';
        this.sName = sName || '';
        this.sGpa = sGpa || '';
        this.sCourses = sCourses || [];
    }
    toString () {
        return this.sId+'';
	}
}

class Database {
    constructor () {
        this.courses = new Map();
        this.students = new Map();
        this.fileCoursesRead();
        this.fileStudentsRead();
    }
	
	fileCoursesRead () {
		var url = "https://maeyler.github.io/JS/data/Courses.txt"
			fetch(url)
			.then(res => res.text()) 
			.then(res => [
				this.addCourses(res)
        ])
    }

	fileStudentsRead () {
		var url = "https://maeyler.github.io/JS/data/Students.txt";
    		fetch(url) 
			.then(res => res.text())
			.then(res => [
				this.addStudents(res)
		])
	}
		
	addCourses(dosya){
		let lines= dosya.split('\n');
		
		var dersler=[];
		for (var line of lines){
		let word= line.split('\t');
			const ders= new Course (word[0],word[1],word[2],word.slice(3));
			dersler.push(ders);
		}
		for (var d in dersler){
			this.courses.set(dersler[d].dersCode,dersler[d]);			
		}
		
	}
	addStudents(dosya){
		let lines= dosya.split('\n');
		
		var ogrenciler=[]
		for (var line of lines){
		let word= line.split('\t');
			const student = new Student (word[0], word[1], word[2])
			for (var sc in word.slice(3)){
               student.sCourses.push(this.courses.get(word.slice(3)[sc]))
            }
			ogrenciler.push(student);
			
		}
		for (var o in ogrenciler){
			this.students.set(ogrenciler[o].sId, ogrenciler[o]);
			
		}
		
	}
	
	getRandomStudent(){
		const keys = Array.from(this.students.keys())
        return this.students.get(keys[Math.trunc(keys.length * Math.random())])
		
	}
	
	getStudentsFromClass(c){
		const ogrenciler=[];
		
		this.students.forEach(student => {
			student.sCourses.forEach(course => {
				course.dersCode === c.dersCode ? ogrenciler.push(student) : null
			})
		})
		
		return ogrenciler;
	}
	
	 toString () {
        return 'Courses: ' + this.courses.size + ' , Students: ' + this.students.size;
    }
	   
}