import Student from "./student.js";

const students = []

const $studentsList = document.getElementById('students-list'),
  $studentsListTHALL = document.querySelectorAll('.studentsTable th'),
  invalidDate = new Date(1900, 0, 1)


let column = 'fio',
  columnDir = true,
  errors = []

function newStudentTR(student) {
  const $studentTR = document.createElement('tr'),
    $fioTD = document.createElement('td'),
    $birthDayTD = document.createElement('td'),
    $studyStartTD = document.createElement('td'),
    $facultTD = document.createElement('td')

  $fioTD.textContent = student.fio
  $birthDayTD.textContent = `${student.getBirthDateString()}(${student.getAge()} лет)`
  $studyStartTD.textContent = `${student.getStudyPeriod()}`
  $facultTD.textContent = student.facult

  $studentTR.append($fioTD)
  $studentTR.append($birthDayTD)
  $studentTR.append($studyStartTD)
  $studentTR.append($facultTD)

  return $studentTR;
}

function getSortStudents(prop, dir) {
  const studentsCopy = [...students]
  return studentsCopy.sort(function (studentA, studentB) {
    if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
      return -1;
  })
}

function getCurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy
  return today
}

function render(filtered) {
  let studentsCopy = [...students]

  studentsCopy = getSortStudents(column, columnDir)

  const fioVal = document.getElementById('fioFilter').value,
    studyVal = document.getElementById('studyfilter').value,
    birthDateVal = document.getElementById('birthdayfilter').value,
    facultVal = document.getElementById('facultfilter').value

  let newArr = [...students]

  if (fioVal !== '') newArr = filter(newArr, 'fio', fioVal)
  if (studyVal !== '') newArr = filter(newArr, 'studyStart', studyVal)
  if (birthDateVal !== '') newArr = filter(newArr, 'birthDate', birthDateVal)
  if (facultVal !== '') newArr = filter(newArr, 'facult', facultVal)


  $studentsList.innerHTML = ''

  if (filtered == true) {
    for (const student of newArr) {
      $studentsList.append(newStudentTR(student))
    }
  } else {
    for (const student of students) {
      $studentsList.append(newStudentTR(student))
    }
  }
}

function filter(arr, prop, value) {
  let result = [],
    arrCopy = [...arr]

  for (const item of arrCopy) {
    if (String(item[prop]).includes(value) == true) result.push(item)
  }

  return result
}

document.getElementById('filter').addEventListener('submit', function (event) {
  event.preventDefault()
  render(true)
})


$studentsListTHALL.forEach(e => {
  e.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir
    render(false)
  })
})

document.getElementById('add-student').addEventListener('submit', function (event) {
  event.preventDefault()

  if (String(document.getElementById('input-name').value).trim().length == 0) errors.push(`Имя\n`)
  if (String(document.getElementById('input-surname').value).trim().length == 0) errors.push(`Фамилия\n`)
  if (String(document.getElementById('input-lastname').value).trim().length == 0) errors.push(`Отчество\n`)
  if (String(Number(document.getElementById('input-studyStart').value)).trim().length == 0) errors.push(`Начало обучения\n`)
  if (!Date.parse(new Date(document.getElementById('input-birthDate').value))) errors.push(`Дата рождения\n`)
  if (String(document.getElementById('input-facult').value).trim() === '') errors.push(`Факультет\n`)
  if (new Date(document.getElementById('input-birthDate').value) < invalidDate || new Date(document.getElementById('input-birthDate').value) > getCurrentDate()) errors.push(`Дата рождения должна находиться в диапазоне от 01.01.1900 до текущей даты\n`)
  if (Number(document.getElementById('input-studyStart').value) < 2000 || Number(document.getElementById('input-studyStart').value) > getCurrentDate()) errors.push(`Год начала обучения должен находится в диапазоне от 2000-го до текущего года`)


  if (errors.length != 0) {
    alert(`Заполните поля: \n ${errors}`);
    errors = [];
  }
  else {
    students.push(new Student(
      document.getElementById('input-name').value,
      document.getElementById('input-surname').value,
      document.getElementById('input-lastname').value,
      Number(document.getElementById('input-studyStart').value),
      new Date(document.getElementById('input-birthDate').value),
      document.getElementById('input-facult').value
    ))

    render(false)
    }
})

render(false)
