import { Text } from '@ui-kitten/components';
import {useObservableState} from 'observable-hooks';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {matrix, Message} from '@rn-matrix/expo';

export default function MessageWrapper({children, ...props}) {
  const {isMe, message, nextSame, prevSame, chat} = props;

  const type = useObservableState(message.type$);
  const senderName = useObservableState(message.sender.name$);
  const content = useObservableState(message.content$);
  const isDirect = useObservableState(chat.isDirect$);

  const showSenderName = !prevSame;

  return (
    <View
      style={[
        styles.wrapper,
        {
          alignItems: isMe ? 'flex-end' : 'flex-start',
          marginBottom: nextSame ? 3 : 12,
        },
      ]}>
      <View
        style={{maxWidth: '85%', flexDirection: 'row', alignItems: 'flex-end'}}>
        <View style={{maxWidth: '85%'}}>
          {showSenderName && !isMe && (
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 3,
                marginLeft: 18,
              }}>
                Anonymous
            </Text>
          )}
          {showSenderName && isMe && (
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 3,
                marginLeft: 18,
              }}>
                {senderName}
            </Text>
          )}
          {children}
        </View>
      </View>
      <View
        style={{
          maxWidth: '85%',
          marginLeft: !isMe && !isDirect ? 36 : 0,
        }}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});
