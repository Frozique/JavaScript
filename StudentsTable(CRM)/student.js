export default class Student {
  constructor(name, surname, lastname, studyStart, birthDate, facult) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.studyStart = studyStart
    this.birthDate = birthDate
    this.facult = facult
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  getStudyPeriod() {
    let currentTime = new Date()
    console.log(currentTime.getMonth() + 1)
    if (((currentTime.getFullYear() - this.studyStart) > 4) || ((currentTime.getFullYear() - this.studyStart) == 4) && (currentTime.getMonth() + 1) >= 10) return `${this.studyStart}-${this.studyStart + 4}(Закончил)`
    else return `${this.studyStart}-${this.studyStart + 4}(${currentTime.getFullYear() - this.studyStart} курс)`
  }

  getBirthDateString() {
    const yyyy = this.birthDate.getFullYear();
    let mm = this.birthDate.getMonth();
    let dd = this.birthDate.getDate();
    dd = (dd > 10 ? dd : '0' + dd);
    mm = (mm > 10 ? mm : '0' + mm);
    return dd + '.' + mm + '.' + yyyy;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    let mm = today.getMonth() - this.birthDate.getMonth();
    if (mm < 0 || (mm === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }

}



