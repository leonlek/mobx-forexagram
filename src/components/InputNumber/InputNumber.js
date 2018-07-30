import React from 'react';
import { Input } from 'native-base';

const InputNumber = ({ placehoder, value, onChangeText }) => (
    <Input  style={{ width: 120, textAlign: 'right' }}
            clearButtonMode='while-editing'
            keyboardType='decimal-pad'
            placeholder={placehoder}
            value={value}
            onChangeText={onChangeText}
    />
);

export default InputNumber;