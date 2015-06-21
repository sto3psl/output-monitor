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

  document.querySelector('#name').innerHTML = events[event].name
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

setEvent(event[1])

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
