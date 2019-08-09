import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import DescRichText from '../../components/DescRichText'

import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: 'wxParse'
  }
  constructor(props) {
    super(props)
    this.state = {
      detail: '<div>我是div内容</div>'
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
    const {detail} =this.state
    return (
      <View className='index'>
        {
          process.env.TARO_ENV === "weapp"
          ?<DescRichText desc={detail}></DescRichText>
          :<View>只在小程序里支持</View>
        }
      </View>
  )
  }
}

export default Index
