import React from 'react'
import Router from 'react-router'
import routes from './pages/routes'

Router.run(routes, Handler => React.render(<Handler />, document.body))