import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Image, ActivityIndicator, Text, FlatList, StyleSheet } from 'react-native';
import Input from '../common/Input';
import { fetchMessages, addNewMessage } from '../../actions/MessagesAction';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Home extends Component {

    state = {
        text: ""
    }
    componentDidMount() {
        this.props.fetchMessages();
    }

    addMessage = () => {
        const { text } = this.state
        const { messages, addNewMessage } = this.props
        if (text.length > 0) {
            addNewMessage({
                id: messages.messages.length,
                user: {
                    id: 3,
                    name: this.props.username,
                    avatarUrl: "https://media.licdn.com/dms/image/C4D03AQHzcj-JGhGR7g/profile-displayphoto-shrink_200_200/0?e=1573084800&v=beta&t=Mqerd6CaMHrXDb6D5M3I8BLVwKUz7pznBZ7PGJopmrA"
                },
                text,
                timestamp: new Date().getTime()
            })
            this.setState({ text: "" })
            setTimeout(() => this.myFlatListRef.scrollToEnd({ animated: true }), 200)
        } 
    };

    renderTheItemReceivedMessage = ({ item }) => {
        if (item.user.id != 3) {
            return (
                <View style={{ flexDirection: 'row', filex: '1' }}>
                    <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: item.user.avatarUrl }} resizeMode="contain" />
                    <View style={styles.receivedMessageContainer}>
                        <Text style={{ color: 'white' }}>{item.text}</Text>
                    </View >
                </View>
            );
        } else {
            return (
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', flex: 1 }}>
                    <View style={styles.sendMessageContainer}>
                        <Text style={{ color: 'white' }}>{item.text}</Text>
                    </View >
                    <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: item.user.avatarUrl }} resizeMode="contain" />
                </View>
            );
        }
    }

    render() {

        const { messages, isFetching } = this.props;
        const scrollIndex = messages.length - 1

        if (isFetching) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        style={{ marginTop: 12 }}
                        animating={true}
                        size='large'
                        color='#3498db' />
                </View>
            )
        } else {
            return (
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.flatList}>
                        <FlatList
                            style={{ width: '100%', padding: 8, flex: 1 }}
                            ref={(ref) => { this.myFlatListRef = ref }}
                            onContentSizeChange={() => { setTimeout(() => this.myFlatListRef.scrollToEnd({ animated: true }), 200) }}
                            onLayout={() => { setTimeout(() => this.myFlatListRef.scrollToEnd({ animated: true }), 200) }}
                            data={messages.messages}
                            keyExtractor={item => item.id.toString()}
                            renderItem={this.renderTheItemReceivedMessage}
                        />
                        <View style={styles.inputContainer}>
                            <Input
                                ref={(ref) => { this.inputMessage = ref }}
                                placeholder="Enter the message"
                                returnKeyType='send'
                                value={this.state.text}
                                onChange={text => this.setState({ text })}
                                onSubmitEditing={() => this.addMessage()} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatList: {
        flex: 1,
        paddingTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    inputContainer: {
        marginBottom: 12
    },
    receivedMessageContainerWrapper: {
        flex: 1,
        minHeight: 40,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    receivedMessageContainer: {
        marginStart: 14,
        backgroundColor: '#7f9db9',
        padding: 10,
        maxWidth: 200,
        marginBottom: 10,
        borderRadius: 10
    },
    sendMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#ffa500',
        marginEnd: 14,
        maxHeight: 100,
        maxWidth: 200,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10
    }
})

function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

export default connect(
    mapStateToProps,
    { fetchMessages, addNewMessage }
)(Home);