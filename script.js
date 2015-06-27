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

// Tag an dem die Veranstaltung stattfindet
var day = '2015/06/27'

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
    } else {
      return 'In ' + Math.round(result) + ' Minuten'
    }
  }

  /*
   * checkString überprüft die Länge des Veranstaltungsnamen
   * und passt gegebenenfalls die Schriftgröße an
   */
  var checkString = function (string) {
    if (string.length > 20 && string.length < 30) {
      document.querySelector('h1').style.fontSize = '1.8em'
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

  // Informationen werden in der DOM geändert
  document.querySelector('#name').innerHTML = checkString(event.name)
  document.querySelector('#description').innerHTML = event.description
  document.querySelector('#people').innerHTML = event.people
  document.querySelector('#type').innerHTML = event.type
  document.querySelector('#room').innerHTML = 'Raum ' + event.room
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
var xhr = new window.XMLHttpRequest()

// starte App wenn Veranstaltungen geladen sind
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    events = JSON.parse(xhr.responseText)
    nextEvent = timeCheck(events)
    setEvent(nextEvent[0])

    /*
     * Timer um Twitterfeed zu aktualisieren und kommende
     * Veranstaltungen zu rotieren
     */
    setInterval(function () {
      twitterFetcher.fetch(config1)

      if (j === nextEvent.length) {
        j = 0
      }
      setEvent(nextEvent[j])
      j++
    // aktualisiert alle 5 Sekunden | 1000ms * 5 = 5s
    }, 1000 * 5)

    /*
     * Timer um Twitterfeed zu aktualisieren und kommende
     * Veranstaltungen zu rotieren
     */
    setInterval(function () {
      nextEvent = timeCheck(events)
      console.log('Aufkommende Veranstaltungen aktualisiert.')
      console.log('Anzahl paralleler Veranstaltungen: ' + events.length)
      setEvent(nextEvent[0])
    // aktualisiert alle 5 Minuten | 1000ms * 60 * 5 = 5min
    }, 1000 * 60 * 5)
  }
}

// lade Veranstaltungen
xhr.open('GET', 'events.json', true)
xhr.send()
