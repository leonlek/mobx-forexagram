import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'mobx-react';

import Navigator from './src/config/routes';
import stores from './src/stores';

EStyleSheet.build({
    $primaryBlue: '#4F6D7A',
    $primaryOrange: '#D57A66',
    $primaryGreen: '#00BD9D',
    $primaryPurple: '#9E76BF',
    $white: '#fff',
    $border: '#E2E2E2',
    $inputText: '#797979',
    $lightGray: '#F0F0F0',
    $darkText: '#343434', 
});

export default () => (
    <Provider {...stores}>
        <Navigator />
    </Provider>
);