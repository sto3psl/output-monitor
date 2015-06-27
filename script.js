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

var day = '2015/06/27'

var event = [
  {
    'time': '12:00:00',
    'name': 'Codegolf',
    'description': 'weniger ist mehr',
    'people': 'Daniel Langner, Johannes Mey',
    'type': 'Workshop',
    'room': 'E064'
  },
  {
    'time': '12:00:00',
    'name': '3D-Modellierung',
    'description': 'Grundlagen mit Blender',
    'people': 'Andreas Peetz',
    'type': 'Workshop',
    'room': 'E064'
  },
  {
    'time': '12:00:00',
    'name': 'Der Mehrwert von Informationsvisualisierungen',
    'description': ' ',
    'people': 'Bettina Kirchner, Martin Herrmann, Jan Wojdziak',
    'type': 'Vortrag',
    'room': 'E064'
  },
  {
    'time': '12:00:00',
    'name': 'Efficient Database Query Processing in Heterogeneous Environments',
    'description': ' ',
    'people': 'Tomas Karnagel',
    'type': 'Vortrag',
    'room': 'E064'
  },
  {
    'time': '12:01:00',
    'name': 'Mehr als die Summe seiner Teile:',
    'description': 'Entwicklung selbst-adaptiver Anwendungen für Gemischte Interaktion',
    'people': 'Maria Piechnick und Christian Piechnick',
    'type': 'Vortrag',
    'room': 'E064'
  }
]

var nextEvent = []
var j = 0

console.log(event[0])

// setEvent(timeCheck(event))


var setEvent = function (event) {
  var getTime = function () {
    var now = new Date()
    var eventTime = new Date(day + ' ' + event.time)
    // console.log(now + '\n' + eventTime)
    var result = (eventTime - now) / 1000
    // console.log(result)

    if (result <= 0) {
      return 'Die Veranstaltung hat bereits begonnen.'
    } else {
      return 'In ' + Math.round(result) + ' Sekunden'
    }
  }

  var checkString = function (string) {
    // console.log('Length: ' + string.length)
    if (string.length > 20 && string.length < 30) {
      document.querySelector('h1').style.fontSize = '1.8em'
      return string
    } else if (string.length > 30) {
      document.querySelector('h1').style.fontSize = '1.7em'
      return string
    }
    return string
  }

  document.querySelector('#name').innerHTML = checkString(event.name)
  document.querySelector('#description').innerHTML = event.description
  document.querySelector('#people').innerHTML = event.people
  document.querySelector('#type').innerHTML = event.type
  document.querySelector('#room').innerHTML = event.room
  document.querySelector('#time').innerHTML = getTime()
}

var timeCheck = function (event) {
  var now = new Date()
  var mostRecent = []
  var d = 1000 * 10 ^ 1000000000

  for (var i = 0; i < event.length; i++) {
    var eventTime = new Date(day + ' ' + event[i].time)
    var diff = eventTime - now
    d = (d > diff && diff > 0) ? diff : d

    if (diff > 0 && diff <= d) {
      mostRecent.push(event[i])
    }
  }

  console.log(mostRecent[0].name)
  return mostRecent
}

nextEvent = timeCheck(event)
setEvent(nextEvent[0])

setInterval(function () {
  if (j === nextEvent.length) {
    j = 0
  }
  setEvent(nextEvent[j])
  j++
  console.log(j)
}, 1000 * 5)

setInterval(function () {

  nextEvent = timeCheck(event)
  console.log(nextEvent)
  setEvent(nextEvent[0])
}, 1000 * 30)
