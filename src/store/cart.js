import Taro from '@tarojs/taro'
import { observable } from 'mobx'

const cartStore=observable({
  totalNumber: 0, //商品总个数
  totalPrice: 0.00, //总价
  selected: false,//是否全选
  prosStatus:1, //1 购买  0 删除
  cartList:[
    {
      shop:{
        name:'生鲜果蔬',
      },
      goods:[{
        id:1,
        title:'越南红心火龙果',
        price:'6.80',
        num:1,
        stock:3,
        selected:1,
      },{
        id:2,
        title:'烟台大苹果',
        price:'18.80',
        num:5,
        stock:2,
        selected:0,
      }],
    },
    {
      shop:{
        name:'一家小店',
      },
      goods:[{
        id:3,
        title:'手工挂饰，钥匙扣',
        price:'19.90',
        num:1,
        stock:0,
        selected:1,
      },{
        id:4,
        title:'手工刺绣蒲扇',
        price:'39.90',
        num:1,
        stock:5,
        selected:0,
      }],
    },
    {
      shop:{
        name:'百年老店',
      },
      goods:[{
        id:5,
        title:'纸皮核桃，小袋包装，方便随身携带',
        price:'68.80',
        num:1,
        stock:1,
        selected:1,
      },{
        id:6,
        title:'蒸蛋糕，网红早餐糕点',
        price:'38.80',
        num:1,
        stock:0,
        selected:1,
      }],
    },
  ],
  normalList:[],//正常商品
  loseList:[],//失效商品

  //数据处理
  getData() {
    const list = this.cartList
    let normalList = [], loseList = [];

    list.forEach((item,index)=>{
      const goods=[]
      item.goods.forEach(g=>{
        g.disable = g.stock==0? true:false
        g.selected=g.disable?0:g.selected
        if(g.stock!=0){
          g.num = g.stock>=g.num? g.num:g.stock
          goods.push(g)
        } else {
          loseList.push(g)
        }
      })

      const obj={}
      obj.goods = goods,
      obj.shop = item.shop
      // normalList[index] = obj
      if(goods.length>0){
        normalList.push(obj)
      }
    })
    //商家选中状态
    normalList.forEach(item=>{
      const Index = item.goods.findIndex(g=>{
        return g.selected == 0
      })
      item.selected = Index<0?1:0
    })
    //全选 状态
    const sIndex = normalList.findIndex(item=>{
      return item.selected==0
    })
    this.selected = sIndex<0?true:false

    this.normalList = normalList
    this.loseList = loseList

    this.setTabbar()
    this.getTotalPrice()
  },
  //计算价格
  async getTotalPrice(){
    let money = 0
    this.normalList.map(item=>{
      item.goods.map(g=>{
        money += g.selected?g.num*Number(g.price):0
      })
    })
    this.totalPrice = money.toFixed(2)
  },
  //  设置角标
  setTabbar(){
    let total = 0
    this.normalList.map(item=>{
      item.goods.map(g=>{
        total += g.num
      })
    })
    this.totalNumber = total
    if(this.totalNumber==0){
      Taro.removeTabBarBadge({index:1},)
    } else {
      Taro.setTabBarBadge({index:1,text:this.totalNumber + ''})
    }
  },
  //  商品数量加一
  increase(goodsIndex,shopIndex){
    let oNum = this.normalList[shopIndex].goods[goodsIndex].num
    const sNum = this.normalList[shopIndex].goods[goodsIndex].stock
    if(oNum ==5 || sNum<=oNum){
      return Taro.showToast({
        title: oNum ==5?'最多限购5件':'库存不足',
        icon: 'none',
        duration: 2000
      })
    }
    this.normalList[shopIndex].goods[goodsIndex].num = oNum<5?oNum + 1:oNum;
    this.setTabbar()
    this.getTotalPrice()
  },
  //  商品数量减一
  reduce(goodsIndex,shopIndex){
    let oNum = this.normalList[shopIndex].goods[goodsIndex].num
    if(oNum ==1){
      return
    }
    this.normalList[shopIndex].goods[goodsIndex].num = oNum>1?oNum - 1:oNum;
    this.setTabbar()
    this.getTotalPrice()
  },
  //  选择商品
  setSelect(goodsIndex,shopIndex){
    const list = this.normalList

    if(goodsIndex=='-1'&& shopIndex=='-1'){
      // 全选
      this.selected = !this.selected
      list.map(item=>{
        item.goods.map(g=>{
          if(g.disable) return;
          g.selected = this.selected?1:0
        })
        item.selected = this.selected?1:0
      })
    }else if(goodsIndex=='-1'&& shopIndex!='-1'){
      //  选中商家
      list[shopIndex].selected = list[shopIndex].selected!=1?1:0
      list[shopIndex].goods.map(g=>{
        if(g.disable) return;
        g.selected = list[shopIndex].selected?1:0
      })
    }else {
      //  选中商品
      list[shopIndex].goods[goodsIndex].selected = list[shopIndex].goods[goodsIndex].selected!=1?1:0
      const gIndex = list[shopIndex].goods.findIndex(g=>{
        return g.selected==0
      })
      list[shopIndex].selected = gIndex<0?true:false
    }

    const sIndex = this.normalList.findIndex(item=>{
      return item.selected==0
    })
    this.selected = sIndex<0?true:false
    this.getTotalPrice()
  },
  //  删除
  delete(oVal,oId){
    let ids = '';
    let {normalList,loseList} = this

    if(oId){
      //  删除单个失效商品
      const oIndex=loseList.findIndex(item=>{
        return item.id==oId
      })
      this.loseList.splice(oIndex, 1)
      console.log('删除单个失效商品',oIndex,this.loseList.slice())
    }
    else if(oVal==2){
      //  清除失效
      this.loseList = []
      console.log('清除失效',this.loseList)
    }
    else if(oVal==1){
      //  删除
      console.log('删除')
      const newList = []
      normalList.forEach((item, index)=>{
        const goods=[]
        item.goods.forEach(g=>{
          if(!g.selected){
            goods.push(g)
          } else {
            ids += g.id+','
          }
        })
        normalList[index].goods = goods

        if(!item.selected){
          newList.push(item)
        }
      })
      normalList = newList
    }
    console.log('===ids===',ids,normalList.slice())
    this.normalList = normalList
    this.setTabbar()
    this.getTotalPrice()
  },
})
export default cartStore
