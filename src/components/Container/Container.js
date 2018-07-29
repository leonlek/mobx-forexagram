import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const Container = ({ children }) => (
    <DismissKeyboard>
    <View style={styles.container}>
        {children}
    </View>
    </DismissKeyboard>
);

Container.propTypes = {
    children: PropTypes.any,
};

export default Container;