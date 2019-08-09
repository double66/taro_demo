import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtAvatar,AtImagePicker,AtButton  } from 'taro-ui'
import api from '../../service/api'
import navigate from '../../service/navigate'
import {uploadImg} from '../../service/upload'

import './index.scss'


@inject('counterStore','cartStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props) {
    super(props)
    this.state = {
      files:[],
    }
  }

  async componentWillMount () {
    // const res = await api.get('api地址','',false)

    const { cartStore } = this.props
    cartStore.getData()
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  //图片上传
  async onChange (files) {
    const data = await uploadImg(files[0].url,files[0].file.type)
    console.log(data)
    this.setState({
      files
    })
  }
  bindWxparse(){
    navigate.jumpUrl('/pages/wxParse/index',{method: 'navigateTo'})
  }

  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <AtAvatar circle text='凹凸实验室'></AtAvatar>
        <AtImagePicker
          files={this.state.files}
          onChange={this.onChange.bind(this)}
        />
        <AtButton type='secondary' onClick={this.bindWxparse.bind(this)}>查看富文本demo</AtButton>
    </View>
    )
  }
}

export default Index
