import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

import iconSelect from '../../common/icon/icon_select.png'
import iconSelected from '../../common/icon/icon_selected.png'
import iconJia from '../../common/icon/icon_jia.png'
import iconJian from '../../common/icon/icon_jian.png'
import iconClose from '../../common/icon/icon_close.png'

@inject('cartStore')
@observer
class CartList extends Component{
  config={
    navigationBarTitleText: '购物车'
  }
  constructor(props) {
    super(props)
    this.state = {
      status:1, //1 购买  2 删除
    }
  }

  componentWillMount () {
    const { cartStore } = this.props
    cartStore.getData()
  }

  componentWillReact () {
    // console.log('componentWillReact')
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  //商品加一
  increase(goodsIndex,shopIndex){
    const { cartStore } = this.props
    cartStore.increase(goodsIndex,shopIndex)
  }
  //商品减一
  reduce(goodsIndex,shopIndex){
    const { cartStore } = this.props
    cartStore.reduce(goodsIndex,shopIndex)
  }
  //选择【商品选择、店铺选择、全选】
  select(goodsIndex,shopIndex){
    const { cartStore } = this.props
    cartStore.setSelect(goodsIndex,shopIndex)
  }
  //删除【删除、单个失效商品删除、清空失效商品】
  bindDelete(oVal,oId){
    const { cartStore } = this.props
    cartStore.delete(oVal,oId)
  }
  //状态切换【购买、编辑】
  setEdit(){
    const {status} = this.state
    this.setState({
      status: status==1? 2:1,
    })
  }
  //去结算
  toPay(){
    console.log('去结算')
  }

  render () {
    const { cartStore: { normalList,loseList,totalPrice,selected } } = this.props
    const {status} = this.state
    // console.log('render==', normalList.slice(), loseList.slice() )
    return (
      <View className='index'>
        {
          normalList.slice().length>0
            ?<View className='edit'><Text className='text' onClick={this.setEdit.bind(this)}>{status==1?'编辑':'取消编辑'}</Text></View>
            :''
        }
        {
          normalList.slice().map((item,index)=>{
            return <View className='shopItem' key={index}>
              <View className='shop'>
                <View className='select' onClick={this.select.bind(this,'-1',index)}>
                  <Image className='icon' src={item.selected?iconSelected:iconSelect} mode='aspectFit' />
                </View>
                <View className='name'>
                  <Text className='text'>{item.shop.name}</Text>
                </View>
              </View>
              {
                item.goods.slice().map((g,goodsIndex)=>{
                  return<View className='goods' key={g.id}>
                    <View className='select' onClick={this.select.bind(this,goodsIndex,index)}>
                      <Image className='icon' src={g.selected?iconSelected:iconSelect} mode='aspectFit' />
                    </View>
                    <View className='proImg'>
                      <Image className='img' src={g.image} />
                    </View>
                    <View className='conInfo'>
                      <Text className='title'>{g.title}</Text>
                      <Text className='price'>￥{g.price}</Text>
                      <View className='handle'>
                        <Image className='icon' src={iconJian} mode='aspectFit' onClick={this.reduce.bind(this,goodsIndex,index)} />
                        <Text className='num'>{g.num}</Text>
                        <Image className='icon' src={iconJia} mode='aspectFit' onClick={this.increase.bind(this,goodsIndex,index)} />
                      </View>
                    </View>
                  </View>
                })
              }
            </View>
          })
        }
        {
          loseList.slice().length>0
          ?<View className='shopItem'>
              <View className='shop'>
                <View className='select'>
                  {/*<Image className='icon' src={iconSelected} />*/}
                </View>
                <View className='name'>
                  <Text className='text'>失效商品</Text>
                  <Text className='text' onClick={this.bindDelete.bind(this,2,'')}>清空失效商品</Text>
                </View>
              </View>
              {
                loseList.slice().map(item=>{
                  return<View className='goods loseGoods' key={item.id}>
                    <View className='select' onClick={this.bindDelete.bind(this,2,item.id)}>
                      <Image className='icon' src={iconClose} mode='aspectFit' />
                    </View>
                    <View className='proImg'>
                      <Image className='img' src={item.image} />
                      {
                        item.stock==0
                          ?<View className='showTips'>
                            <Text className='text'>库存不足</Text>
                          </View>
                          :''
                      }
                    </View>
                    <View className='conInfo'>
                      <Text className='title'>{item.title}</Text>
                      <Text className='price'>￥{item.price}</Text>
                    </View>
                  </View>
                })
              }
            </View>
          :''
        }
        {
          normalList.slice().length>0
          ?<View className='wrap_bottom'>
              <View className='select' onClick={this.select.bind(this,'-1','-1')}>
                <Image className='icon' src={selected?iconSelected:iconSelect} mode='aspectFit' />
                <Text className='text'>全选</Text>
              </View>
              <View className='center'>
                <View className='text'>合计<Text className='price'>{'￥'+totalPrice}</Text>元</View>
              </View>
              {
                status==1
                  ?<Button className='btn' disabled={totalPrice>0?false:true} onClick={this.toPay} >去结算</Button>
                  :<Button className='btn delete' disabled={totalPrice>0?false:true} onClick={this.bindDelete.bind(this,1,'')} >删除</Button>
              }
            </View>
          :''
        }
      </View>
    )
  }
}
export default CartList
