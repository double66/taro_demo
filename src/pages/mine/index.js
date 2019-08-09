import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.scss'

class Mine extends Component{
  config={
    navigationBarTitleText: '我的'
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>

      </View>
    )
  }
}
export default Mine
