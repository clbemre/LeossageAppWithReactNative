
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Leossage App</Text>
                </View >
                <View style={{ paddingBottom: 20 }}>
                    <Text style={{ color: 'white', fontWeight: '200' }}>Powered by cLB</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9FC5E8',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'white'
    },
    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    }
})