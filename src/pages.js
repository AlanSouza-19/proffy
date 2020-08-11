const Database = require('./database/db')
const createProffy = require('./database/createProffy')
const { subjects, weekdays, getSubject, convertHoursToMinuts } = require('./utils/format')

var query = {
  queryString: ''
}

function pageLanding(request, response) {
  return response.render("index.html")
}

async function pageStudy(request, response) {
  const filters = request.query

  if (!filters.subject || !filters.weekday || !filters.time) {
    return response.render("study.html", { filters, subjects, weekdays })
  }

  // converter horas em minutos
  const timeToMinuts = convertHoursToMinuts(filters.time)

  const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS(
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = classes.id
      AND class_schedule.weekday = ${filters.weekday}
      AND class_schedule.time_from <= ${timeToMinuts}
      AND class_schedule.time_to > ${timeToMinuts}
    )
    AND classes.subject = '${filters.subject}'
  `

  // caso haja erro na hora da consulta do banco de dados
  try {
    const db = await Database
    const proffys = await db.all(query)

    proffys.map((proffy) => {
      proffy.subject = getSubject(proffy.subject)
    })

    return response.render('study.html', { proffys, subjects, filters, weekdays })
  } catch (error) {
    console.log(error)
  }
}

function pageGiveClasses(request, response) {
  return response.render("give-classes.html", { subjects, weekdays })
}

async function pageSaveClasses(request, response) {
  const proffyValue = {
    name: request.body.name,
    avatar: request.body.avatar,
    whatsapp: request.body.whatsapp,
    bio: request.body.bio
  }

  const classValue = {
    subject: request.body.subject,
    cost: request.body.cost
  }

  const classScheduleValues = request.body.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertHoursToMinuts(request.body.time_from[index]),
      time_to: convertHoursToMinuts(request.body.time_to[index])
    }
  })

  try {
    const db = await Database
    await createProffy(db, { proffyValue, classValue, classScheduleValues })

    let queryString = "?subject=" + request.body.subject
    queryString += "&weekday=" + request.body.weekday[0]
    queryString += "&time=" + request.body.time_from[0]
    query.queryString = queryString
    return response.redirect("/success")
  } catch (error) {
    console.log(error)
  }
  
}

function pageSuccess(request, response) {
  return response.render("page-success.html", { query })
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  pageSaveClasses,
  pageSuccess
}