import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = props => <Text style={styles.text}>{props.title}</Text>;

export default Title;

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        fontSize: 50,
        margin: 12,
        color: 'white',
        textAlign: 'center',
        opacity: 0.9
    }
});