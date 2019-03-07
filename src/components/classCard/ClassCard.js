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
  
    const teacherActions = ['编辑班级', '删除班级', '归档班级'];

    return (
      <View className='class-card'>
        <AtCard
          note={this.props.peopleCount + '人'}
          title={this.props.name}
        >
          {'角色: ' + this.props.role + this.props.teacherName}
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
          {teacherActions.map((menu, index) => (
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
  peopleCount: '0',
  name: 'loading...',
  role: '0人',
  teacherName: '',
  code: '',
}
