import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { WebView } from 'react-native';

export default class USDPerformanceScreen extends Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <WebView source={{ uri: 'https://www.finviz.com/forex_performance.ashx' }} />
                </Content>
            </Container>
        );
    }
}
