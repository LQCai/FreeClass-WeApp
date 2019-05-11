import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './detectionCard.scss';
import { AtIcon } from 'taro-ui';

export default class DetectionCard extends Taro.Component {
    render() {
        const { name, content, images, time } = this.props;
        return (
            <View className='at-article'>
                <View>
                    <Text className='name'>
                        {name}
                    </Text>
                </View>
                <View className='content'>
                    {content}
                </View>
                <View>
                    {images.map((image, index) => (
                        <Image className='list-img' key={index} src={image} />
                    ))}
                </View>
                <View className='time'>
                    <Text className='time-text'>
                        {time}
                    </Text>
                </View>
            </View>
        );
    }
}
