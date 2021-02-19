import {Text} from '@ui-kitten/components';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import MessageWrapper from './MessageWrapper';
import {matrix} from '@rn-matrix/expo';
import {useObservableState} from 'observable-hooks';

export default function TextMessage(props) {
  const {
    message,
    prevSame,
    nextSame,
    isMe
  } = props;

  const content = useObservableState(message.content$);

  if (!content) return null;

  const bubbleBackground = (pressed) => {
    if (isMe) {
      return '#38ADA9'
    } else {
      return '#919bb1'
    }
  };

  return (
    <MessageWrapper {...props}>
      <Pressable
        style={({pressed}) => [
          styles.bubble,
          {backgroundColor: bubbleBackground(pressed)},
          prevSame && isMe ? {borderTopRightRadius: 6} : {},
          prevSame && !isMe ? {borderTopLeftRadius: 6} : {},
          nextSame && isMe ? {borderBottomRightRadius: 6} : {},
          nextSame && !isMe ? {borderBottomLeftRadius: 6} : {},
        ]}>
          <Text
            style={{
              fontWeight: 'bold',
              marginBottom: 3,
            }}>
            {content?.text}
          </Text>
      </Pressable>
    </MessageWrapper>
  );
}

const styles = StyleSheet.create({
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
