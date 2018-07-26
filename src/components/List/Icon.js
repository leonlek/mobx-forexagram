import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, } from 'react-native';

import styles from './styles';

const Icon = ({ checkmark, visible, iconBackground }) => {
    const iconStyle = [styles.icon];
    if (visible) {
        iconStyle.push(styles.iconVisible)
    }    

    if (iconBackground) {
        iconStyle.push({ backgroundColor: iconBackground });
    }
    return (
        <View style={iconStyle}>
            {checkmark ? <Image resizeMode='contain' style={styles.checkedIcon} source={require('./images/check.png')} /> : null }
        </View>
    );
};

Icon.propTypes = {
    checkmark: PropTypes.bool,
    visible: PropTypes.bool,
    iconBackground: PropTypes.string,
}

export default Icon;