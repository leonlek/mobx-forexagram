import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native';
import { Container, Content } from 'native-base';

export default class NewsScreen extends Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <WebView source={{ uri: 'https://www.investing.com/analysis/forex' }} />
                </Content>
            </Container>
        );
    }
}