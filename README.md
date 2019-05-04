# supersniff

A simple function for debugging stuff like promise chains, streams and other pipeline-like thingees. It just creates a function that console logs whatever is passed to it and then returns that value

Example:
```javascript
const sniff = require('supersniff')

fetch(`http://myapi.com/users/${username}.json`))
  .then(response => response.json())
  .then(sniff) // Will console.log out the parsed json, and return the value,
               // effectively passing it on to the next .then
  .then(user => Promise.all(user.friends.map(friend => getFriend(friendId))))
  .then(friends => /* do even more stuff here */)
```

# Why this is useful?
Lets say that you have a promise chain that looks like this ...
```javascript
getData()
  .then(transformData)
  .then(sortData)
```
... and you are debugging an issue that makes you want to inspect what the data looks like after the transformData operation, but BEFORE the sortData operation. No matter if you want to do this by breakpoint or console.log, you need to wrap transformData in a multiline functions:
```javascript
getData()
  .then(x => {
    console.log(x) // alternatively, breakpoint on the line below
    return transformData(x)
  })
  .then(sortData)
```
It's not a huge hassle, but I found myself doing it a LOT, and with supersniff there is a lot less typing:
```javascript
getData()
  .then(transformData)
  .then(sniff)
  .then(sortData)
```
Yes, this is stupidly simple, but I've found myself writing this function 40000 times now so I want it on npm, OK? OK!?????

# Overriding prefix
supersniff will log to console with a [SNIFF] prefix but if you want to override it like this:

```javascript
const sniff = require('supersniff')

fetch(`http://myapi.com/users/${username}.json`)
  .then(response => response.json())
  .then(sniff.tag('MYTAG'))
```

# Sniffing to file
```javascript
const sniff = require('supersniff')

fetch(`http://myapi.com/users/${username}.json`)
  .then(response => response.json())
  .then(sniff.save('apioutput.json'))
```

# Loading file contents conveniently
```javascript
const sniff = require('supersniff')
/*
fetch(`http://slowexpensivethrottledapi.com/users/${username}.json`)
  .then(response => response.json())
  .then(sniff.save('apioutput.json'))*/

sniff.load('apioutput.json')
  .then(data => data.friends[0].fullName)
  .then(sniff)
```

# Memoizing expensive calls to file

```javascript
const sniff = require('supersniff')
sniff.memo('apioutput.json', () =>
  fetch(`http://slowexpensivethrottledapi.com/users/${username}.json`)
    .then(response => response.json()))
.then(data => data.friends[0].fullName)
.then(sniff)
```