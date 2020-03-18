//include required modules
const jwt = require('jsonwebtoken')
const config = require('./config')
const rp = require('request-promise')
const fetch = require('node-fetch')

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
var email, userid, resp
const port = 3000

//Use the ApiKey and APISecret from config.js
const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000
}
const token = jwt.sign(payload, config.APISecret)
console.log('token: ' + token)

// Async/Await style
const main = async () => {
  email = 'masaok@gmail.com'
  const uri = 'https://api.zoom.us/v2/users/' + email

  var options = {
    // method: 'POST',
    uri,
    qs: {
      status: 'active'
    },
    auth: {
      bearer: token
    },
    headers: {
      'User-Agent': 'Zoom-api-Jwt-Request',
      'content-type': 'application/json'
    },
    json: true //Parse the JSON string in the response
  }
  console.log('OPTIONS:')
  console.log(options)

  rp(options)
    .then(function(response) {
      // POST succeeded...
      console.log('RP POST SUCCESS')
      console.log(response)
    })
    .catch(function(err) {
      // POST failed...
      console.log('RP POST ERROR')
      console.log(err)
    })

  const body = await rp(options)
  console.log('RP AWAIT POST SUCCESS')
  console.log(body)
}
main()
