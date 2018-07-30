import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';

export default class WatchListsScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Headers>
                    <Text>Watch List</Text>
                    </Headers>
                </Content>
            </Container>
        );
    }
}