import {Route, DefaultRoute, NotFoundRoute} from "react-router"
import React from "react"
import Contact from './contact'
import Index from './index'
import Post from './post'
import NotFound from './404'
import ContactResult from './contact_result'
import App from './app'

export default (
  <Route handler={App}>
    <Route name='contact' handler={Contact} />
    <Route name='contact_result' path='/contact_result/:id' handler={ContactResult} />
    <Route name='post' path='/post/:id' handler={Post} />
    <NotFoundRoute handler={NotFound} />
    <DefaultRoute name='index'handler={Index} />
  </Route>
)

