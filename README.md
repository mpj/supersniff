# supersniff

A simple function for debugging stuff like promise chains and other pipeline-like thingees. It just creates a function that console logs whatever is passed to it and then returns that value.

```javascript
const sniff = require('supersniff')

fetch(`http://myapi.com/users/${username}.json`))
  .then(response => response.json())
  .then(sniff) // Will console.log out the parsed json, and return the value,
               // effectively passing it on to the next .then
  .then(user => Promise.all(user.friends.map(friend => getFriend(friendId))))
  .then(friends => /* do even more stuff here */)
```
Yes, this is stupidly simple, but I've found myself writing this function 40000 times now so I want it on npm, OK? OK!?????

It will log to console with a [SNIFF] prefix but if you want to override it like this:

```javascript
const sniff = require('supersniff')

fetch(`http://myapi.com/users/${username}.json`))
  .then(response => response.json())
  .then(sniff.tag('MYTAG'))
```