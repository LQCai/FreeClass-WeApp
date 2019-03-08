import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtCard, AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui';

import './ClassCard.scss';

export default class ClassCard extends Taro.Component {

  constructor() {
    super(...arguments)
    this.state = {
      isOpened: false,
    }
  }


  sheetOpen = () => {
    this.setState({
      isOpened: true,
    })
  }

  sheetClose = () => {
    this.setState({
      isOpened: false,
    })
  }


  render() {
  
    let roleName = '学生';
    switch(this.props.role) {
      case 1 :
      roleName = '教师';
      break;
      case 2 :
      roleName = '学生';
      break;
      default:
      break;
    }

    let actions = ['退出教室'];
    if(this.props.role == 1){
      actions=['编辑班级', '删除班级', '归档班级']
    }

    return (
      <View className='class-card'>
        <AtCard
          note={this.props.peopleCount + '人'}
          title={this.props.name}
        >
          {'角色: ' + roleName + this.props.teacherName}
        </AtCard>
        <Text className='code'>
          {this.props.code}
        </Text>
        <View className='menu' >
          <AtIcon value='menu' onClick={this.sheetOpen} />
        </View>
        
        <AtActionSheet
          isOpened={isOpened}
          cancelText='取消'
          onCancel={this.sheetClose}
          onClose={this.sheetClose}>
          {actions.map((menu, index) => (
            <AtActionSheetItem key={index}>
              {menu}
            </AtActionSheetItem>
          ))}
        </AtActionSheet>
      </View>
    );
  }
}

ClassCard.defaultProps = {
  peopleCount: '0人',
  name: 'loading...',
  role: '',
  teacherName: '',
  code: '',
}
