import React from 'react';
import {matrix, Message} from '@rn-matrix/expo';
import {useObservableState} from 'observable-hooks';
import TextMessage from './Textmessage';

export default function MessageItem({
  chatId,
  messageId,
  prevMessageId,
  nextMessageId,
  ...otherProps
}) {
  const myUser = matrix.getMyUser();

  const message = matrix.getMessageById(messageId, chatId);

  if (!message || !message.type$) return null;

  const prevMessage =
    prevMessageId
      ? matrix.getMessageById(prevMessageId, chatId)
      : null;
  const nextMessage =
    nextMessageId
      ? matrix.getMessageById(nextMessageId, chatId)
      : null;
  const prevSame = isSameSender(message, prevMessage);
  const nextSame = isSameSender(message, nextMessage);
  const isMe = myUser?.id === message.sender.id;

  const props = {
    ...otherProps,
    message,
    prevSame,
    nextSame,
    isMe,
  };

  const messageType = useObservableState(message.type$);

  if (Message.isTextMessage(messageType)) {
    return <TextMessage {...props} />;
  }

  return null;
}

function isSameSender(messageA, messageB) {
  if (
    !messageA ||
    !messageB ||
    !Message.isBubbleMessage(messageA) ||
    !Message.isBubbleMessage(messageB) ||
    messageA.sender.id !== messageB.sender.id
  ) {
    return false;
  }
  return true;
}
