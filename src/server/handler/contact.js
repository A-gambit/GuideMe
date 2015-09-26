import Contact from '../models/contact'

class ContactHandler {
  init(req, res, next) {
    req.validation = {}
    next()
  }

  checkName(req, res, next) {
    req.validation.name = req.body.name.trim().length > 0 || 'Name is required'
    next()
  }

  checkEmail(req, res, next) {
    let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    req.validation.email = regex.test(req.body.email) || 'Email is incorrect'
    next()
  }

  checkMessage(req, res, next) {
    req.validation.message = req.body.message.trim().length > 6 || 'Message must be >6 characters'
    next()
  }

  checkValidation(req, res, next) {
    let {validation} = req
    if (validation.name == true && validation.email == true && validation.message == true) {
      return next()
    }
    res.status(400).send({success: false, validation})
  }

  setData(req, res, next) {
    let {validation} = req
    Contact.addValue(req.body, (err, contact) => {
      res.status(200).send({success: true, validation})
    })
  }

  getData(req, res, next) {
    Contact.getValues((contacts) => res.status(200).send({contacts}))
  }
}

export default ContactHandler
