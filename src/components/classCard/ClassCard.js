import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtCard, AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import './ClassCard.scss';

import { open } from '../../actions/classMenu';

@connect(({ classMenu }) => ({
  classMenu,
}), (dispatch) => bindActionCreators({
  open,
}, dispatch))

export default class ClassCard extends Taro.Component {


  render() {

    let roleName = '学生';
    switch (this.props.role) {
      case 1:
        roleName = '教师';
        break;
      case 2:
        roleName = '学生';
        break;
      default:
        break;
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
        <View className='menu' onClick={this.props.open} >
          <AtIcon value='menu' />
        </View>
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
