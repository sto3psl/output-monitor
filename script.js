// Twitter Feed
var config1 = {
  'id': '612537302854844416',
  'domId': 'feed',
  'maxTweets': 5,
  'enableLinks': true
}

twitterFetcher.fetch(config1)

// setInterval(function () {
//   twitterFetcher.fetch(config1)
//   console.log('updated')
// }, 1000 * 10) // update every 10 seconds

var day = '2015/06/21'

var events = {
  '15:00:00': {
    'name': 'Codegolf',
    'description': 'weniger ist mehr',
    'people': 'Daniel Langner, Johannes Mey',
    'type': 'Workshop',
    'room': 'E064'
  },
  '15:10:00': {
    'name': '3D-Modellierung',
    'description': 'Grundlagen mit Blender',
    'people': 'Andreas Peetz',
    'type': 'Workshop',
    'room': 'E064'
  },
  '15:20:00': {
    'name': 'Der Mehrwert von Informationsvisualisierungen',
    'description': ' ',
    'people': 'Bettina Kirchner, Martin Herrmann, Jan Wojdziak',
    'type': 'Vortrag',
    'room': 'E064'
  },
  '15:30:00': {
    'name': 'Efficient Database Query Processing in Heterogeneous Environments',
    'description': ' ',
    'people': 'Tomas Karnagel',
    'type': 'Vortrag',
    'room': 'E064'
  },
  '15:40:00': {
    'name': 'Mehr als die Summe seiner Teile:',
    'description': 'Entwicklung selbst-adaptiver Anwendungen für Gemischte Interaktion',
    'people': 'Maria Piechnick und Christian Piechnick',
    'type': 'Vortrag',
    'room': 'E064'
  }
}

var event = Object.keys(events)
console.log(event[0])

var setEvent = function (event) {
  var getTime = function () {
    var now = new Date()
    var eventTime = new Date(day + ' ' + event)
    console.log(now + '\n' + eventTime)
    var result = (eventTime - now) / 60000
    console.log(result)

    if (result <= 0) {
      return 'Die Veranstaltung hat bereits begonnen.'
    } else {
      return 'In ' + Math.trunc(result) + ' Minuten'
    }
  }

  var checkString = function (string) {
    console.log('Length: ' + string.length)
    if (string.length > 20 && string.length < 30) {
      document.querySelector('h1').style.fontSize = '1.8em'
      return string
    } else if (string.length > 30) {
      document.querySelector('h1').style.fontSize = '1.6em'
      return string
    }
    return string
  }

  document.querySelector('#name').innerHTML = checkString(events[event].name)
  document.querySelector('#description').innerHTML = events[event].description
  document.querySelector('#people').innerHTML = events[event].people
  document.querySelector('#type').innerHTML = events[event].type
  document.querySelector('#room').innerHTML = events[event].room
  document.querySelector('#time').innerHTML = getTime()

  console.log('updated event')
}

// setInterval(function () {
//   setEvent(event[1])
// }, 1000 * 5)

setEvent(event[4])
