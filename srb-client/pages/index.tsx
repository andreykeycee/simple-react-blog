import React from 'react'
import Home from '@/components/Home'

class IndexPage extends React.Component {
  static async getInitialProps (context) {
    console.log('test', Object.keys(context))

    return {}
  }

  render() {
    return <Home/>
  }
}

export default IndexPage
