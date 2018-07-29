import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import color from 'color';

import styles from './styles';

const InputWithButton = (props) => {
    const { onPress, buttonText, editable } = props;
    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);
    const containerStyle = [styles.container];

    if (editable === false) {
        containerStyle.push(styles.containerDisable);
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor={underlayColor}
                style={styles.buttonContainer}
                onPress={onPress}>
                <Text style={styles.buttonText}>{buttonText}</Text>    
            </TouchableHighlight>
            <View style={styles.border} />
            <TextInput style={styles.input} 
                        underlineColorAndroid='transparent' {...props} 
                        clearButtonMode='always'
            />
        </View>
    );
};

InputWithButton.propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    editable: PropTypes.bool,
};

export default InputWithButton;