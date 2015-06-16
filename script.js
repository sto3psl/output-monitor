var day = '6 16, 2015 '

var events = {
  '13:16:00': {
    'name': 'Meteor',
    'description': 'Eine Einführung in die Webentwicklung mit Javascript',
    'type': 'Workshop',
    'room': 'E064',
    'time': '13:40'
  }
}
var event = Object.keys(events)
console.log(event[0])

var date = new Date(day + event[0])
console.log(date.getHours())


var setEvent = function (event) {

  var getTime = function () {
    var now = new Date()
    var eventTime = new Date(day + event)
    console.log(now + '\n' + eventTime)
    var result = (eventTime - now) / 1000
    console.log(result)

    if (result < 0) {
      return 'Die Veranstaltung hat bereits begonnen.'
    } else {
      return 'In ' + Math.trunc(result) + ' Sekunden'
    }

  }

  document.querySelector('#name').innerHTML = events[event].name
  document.querySelector('#description').innerHTML = events[event].description
  document.querySelector('#type').innerHTML = events[event].type
  document.querySelector('#room').innerHTML = events[event].room
  document.querySelector('#time').innerHTML = getTime()

  console.log('updated event')
}

var updateEvent = setInterval(function () {
  setEvent(event[0])
}, 1000)

// Twitter Feed
var config1 = {
  'id': '603484288626073601',
  'domId': 'feed',
  'maxTweets': 5,
  'enableLinks': true
}

twitterFetcher.fetch(config1)

var updateTwitter = setInterval(function () {
  twitterFetcher.fetch(config1)
  console.log('updated')
}, 1000 * 10) // update every 10 seconds
