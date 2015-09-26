import {Route, DefaultRoute, NotFoundRoute} from "react-router"
import React from "react"
import Contact from './contact'
import Index from './index'
import Post from './post'
import App from './app'

export default (
  <Route handler={App}>
    <Route name='contact' handler={Contact} />
    <Post name='post' path='/post/:id' handler={Post} />
    <DefaultRoute name='index'handler={Index} />
  </Route>
)