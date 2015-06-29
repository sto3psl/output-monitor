/*
 * Author: Fabian Gündel
 * Github: https://github.com/sto3psl
 * File: script.js
 */

/*
 * =================
 * GLOBALE VARIABLEN
 * =================
 */

// heute
var today = new Date()
var day = (today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate())

// events enthält alle Veranstaltungen aus events.json
var events = []
// nextEvent enthält alle Events die als nächstes stattfinden
var nextEvent = []
// Zählvariable um durch alle Veranstaltungen von nextEvent zu rotieren
var j = 0

/*
 * ======================
 * CONFIG FÜR TWITTERFEED
 * ======================
 */

// id enthält die ID des Twitter Widgets
var config1 = {
  'id': '612537302854844416',
  'domId': 'feed',
  'maxTweets': 5,
  'enableLinks': true
}

// Twitterfeed beim Laden der Seite mitladen
twitterFetcher.fetch(config1)

/*
 * ========================================================
 * FUNKTIONEN ZUR DARSTELLUNG DER RICHTIGEN VERANSTALTUNGEN
 * ========================================================
 */

/*
 * setEvent schreibt die Informationen der kommenden
 * Veranstaltung in die DOM
 */
var setEvent = function (event) {
  /*
   * getTime vergleicht die aktuelle Uhrzeit mit der Startzeit
   * der kommenden Veranstaltung
   */
  var getTime = function () {
    var now = new Date()
    var eventTime = new Date(day + ' ' + event.time)
    // Zeit bis zur Veranstaltung in Minuten
    var result = (eventTime - now) / 60000

    if (result <= 0) {
      return 'Die Veranstaltung hat bereits begonnen.'
    } else if (result < 1) {
      return 'In weniger als einer Minute'
    } else {
      return 'In ' + Math.round(result) + ' Minuten'
    }
  }

  /*
   * checkString überprüft die Länge des Veranstaltungsnamen
   * und passt gegebenenfalls die Schriftgröße an
   */
  var checkString = function (string) {
    if (string.length < 20) {
      document.querySelector('h1').style.fontSize = '2.6em'
      return string
    } else if(string.length > 20 && string.length < 30) {
      document.querySelector('h1').style.fontSize = '2em'
      return string
    } else if (string.length > 30) {
      document.querySelector('h1').style.fontSize = '1.7em'
      return string
    }
    return string
  }

  // stellt Hintergrundfarbe entsprechend des Veranstaltungstyps ein
  switch (event.type) {
    case 'ACADEMIC':
      document.querySelector('body').style.background = '#FFCC00'
      break
    case 'VORTRAG':
      document.querySelector('body').style.background = '#97BF0D'
      break
    case 'WORKSHOP':
      document.querySelector('body').style.background = '#6D1F80'
      break
  }
  // fadeIn der "neuen" Veranstaltung
  document.querySelector('#information').className = 'animated fadeIn'
  document.querySelector('#type').className = 'animated fadeIn'

  // Informationen werden in der DOM geändert
  document.querySelector('#name').innerHTML = checkString(event.name)
  document.querySelector('#description').innerHTML = event.description
  document.querySelector('#people').innerHTML = event.people
  document.querySelector('#type').innerHTML = event.type
  document.querySelector('#room').innerHTML = event.room
  document.querySelector('#time').innerHTML = getTime()
}

/*
 * timeCheck pusht alle kommenden Veranstaltungen in ein Array
 */
var timeCheck = function (event) {
  var now = new Date()
  var mostRecent = []
  // irgendeine große Zahl, sehr große Zahl
  var d = 1000 * 10 ^ 1000000000

  for (var i = 0; i < event.length; i++) {
    var eventTime = new Date(day + ' ' + event[i].time)
    var diff = eventTime - now
    d = (d > diff && diff > 0) ? diff : d

    if (diff > 0 && diff <= d) {
      mostRecent.push(event[i])
    }
  }
  return mostRecent
}

/*
 * ======================
 * ABLAUF DER APPLIKATION
 * ======================
 */

/*
 * Update des Twitterfeed
 */
setInterval(function () {
  twitterFetcher.fetch(config1)
  console.log('twitter updated')
}, 1000 * 10)
var xhr = new window.XMLHttpRequest()

// starte App wenn Veranstaltungen geladen sind
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    events = JSON.parse(xhr.responseText)
    nextEvent = timeCheck(events)
    setEvent(nextEvent[0])

    var displayDuration = 1000 * 10
    /*
     * Timer um kommende Veranstaltungen zu rotieren
     */
    setInterval(function () {
      if (j === nextEvent.length) {
        j = 0
      }
      setEvent(nextEvent[j])
      // fadeOut der "alten" Veranstaltung nach 9s | 1000ms * 9 = 9s
      if (nextEvent.length >= 2) {
        setTimeout(function () {
          document.querySelector('#information').className = 'animated fadeOut'
          document.querySelector('#type').className = 'animated fadeOut'
        }, displayDuration - 1000)
      }
      j++

    // aktualisiert alle 10 Sekunden | 1000ms * 10 = 10s
    }, displayDuration)

    /*
     * Timer um Twitterfeed zu aktualisieren und kommende
     * Veranstaltungen zu rotieren
     */
    setInterval(function () {
      nextEvent = timeCheck(events)
      console.log('Aufkommende Veranstaltungen aktualisiert.')
      console.log('Anzahl paralleler Veranstaltungen: ' + nextEvent.length)
      setEvent(nextEvent[0])
    // aktualisiert jede Minuten | 1000ms * 60 * 1 = 1min
    }, 1000 * 60 * 1)
  }
}

// lade Veranstaltungen
xhr.open('GET', 'events.json', true)
xhr.send()

// blockiere scrollen auf mobilen Geräten
document.addEventListener('touchmove', function (e) {
  e.preventDefault()
}, false)
