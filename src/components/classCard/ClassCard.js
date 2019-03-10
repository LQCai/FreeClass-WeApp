import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtCard, AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import './ClassCard.scss';

import { open } from '../../actions/classMenu';
import { isTeacher, isStudent } from '../../actions/judgeRole';

@connect(({ classMenu, judgeRole }) => ({
  classMenu: classMenu.isOpen,
  judgeRole: judgeRole.actions,
}), (dispatch) => bindActionCreators({
  open,
  isStudent,
  isTeacher,
}, dispatch))



export default class ClassCard extends Taro.Component {

  menu = (role) => {
    const { open, isTeacher, isStudent } = this.props;
    open();
    switch(role) {
      case 1:
      isTeacher(role);
      break;
      case 2:
      isStudent(role);
      break;
      default:
      break;
    }
  }


  render() {
    let { role, teacherName, name, peopleCount, code } = this.props;

    let roleName = '学生';
    switch (role) {
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
          note={peopleCount + '人'}
          title={name}
        >
          {'角色: ' + roleName + teacherName}
        </AtCard>
        <Text className='code'>
          {code}
        </Text>
        <View className='menu' onClick={this.menu.bind(this, role)} >
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
