import { View, Text, Button } from 'react-native';
import { Appbar } from 'react-native-paper';


const Header = ({headerTitle}) => {
    const _goBack = () => console.log('Went back');

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Text>{headerTitle}</Text>
        </Appbar.Header>
    );

}

export default Header;