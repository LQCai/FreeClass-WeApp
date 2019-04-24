import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './homeworkDetail.scss'
import homework from '../../reducers/homework';
import { AtForm, AtInput, AtTextarea, AtImagePicker, AtButton } from 'taro-ui';


export default class HomeworkDetail extends Taro.Component {
    config = {
        navigationBarTitleText: '作业'
    }

    constructor() {
        super(...arguments);
        this.state = {
            homeworkList: [],
            homeworkDetail: {
                id: '',
                name: '',
                introduction: '',
                deadline: '',
                annexUrl: ''
            },
            userId: '',
            classId: '',
            submitAnnex: []
        };
    }

    componentDidShow() {
        const params = this.$router.params;

        this.setState({
            homeworkDetail: {
                id: params.id,
                name: params.name,
                introduction: params.introduction,
                deadline: params.deadline,
                annexUrl: params.annexUrl
            },
            userId: params.userId,
            classId: params.classId
        });
    }

    onFileChange(files) {

    }

    submitHomework() {
        
    }

    render() {
        const role = this.$router.params.role;

        return (
            <View>
                {homeworkList.length > 0
                    ?
                    <View></View>
                    :
                    <View>
                        <View>
                            <Text>作业标题:</Text>
                            <Text>{this.state.homeworkDetail.name}</Text>
                        </View>
                        <View>
                            <Text>作业内容:</Text>
                            <Text>{this.state.homeworkDetail.introduction}</Text>
                        </View>
                        <View>
                            <Text>截至:</Text>
                            <Text>{this.state.homeworkDetail.deadline}</Text>
                        </View>
                        <View>
                            <Text>附件:</Text>
                            <Image
                                src={this.state.homeworkDetail.annexUrl}
                                style='width: 100px;height: 100px;background: #fff;'
                            />
                        </View>
                        <View>
                            <AtForm
                            onSubmit={this.submitHomework}
                            >
                                <AtTextarea
                                    placeholder='请输入作业留言...'
                                >
                                </AtTextarea>
                                <AtImagePicker
                                    count={1}
                                    // showAddBtn={this.state.fileButton}
                                    files={this.state.submitAnnex}
                                    onChange={this.onFileChange.bind(this)}
                                />
                                <AtButton type='primary' formType='reset'>提交</AtButton>
                            </AtForm>
                        </View>
                    </View>
                }
            </View>
        );
    }
}
