import {matrix} from '@rn-matrix/expo';
import * as React from 'react';
import {useObservableState} from 'observable-hooks';

import { useEffect, useState } from 'react';
import { List } from '@ui-kitten/components';
import Composer from '../components/Composer';
import MessageItem from '../components/MessageItem';

export default function NewChatScreen({ navigation, route }) {
  const chat = matrix.getRoomById(route.params?.chatId);
  
  if (!chat) {
    navigation.goBack();
  }

  const messageList = useObservableState(chat.messages$);
  const [timeline, setTimeline] = useState(messageList);
  const atStart = useObservableState(chat.atStart$);
  const [isLoading, setIsLoading] = useState(false);

  const handleEndReached = async () => {
    if (!atStart && !isLoading) {
      setIsLoading(true);
      await chat.fetchPreviousMessages();
      setIsLoading(false);
    }
  };

  const renderMessageItem = ({item, index}) => {
    return (
      <MessageItem
        key={item}
        chatId={chat.id}
        chat={chat}
        messageId={item}
        prevMessageId={messageList[index + 1] ? messageList[index + 1] : null}
        nextMessageId={messageList[index - 1] ? messageList[index - 1] : null}
      />
    );
  };

  useEffect(() => {
    handleEndReached();
  }, []);
  
  useEffect(() => {
    // mark as read
    chat.sendReadReceipt();

    // We put loading and typing indicator into the Timeline to have better
    // visual effects when we swipe to top or bottom
    if (messageList) {
      const tempTimeline = [...messageList];
      if (isLoading) tempTimeline.push('loading');
      setTimeline(tempTimeline);
    }
  }, [isLoading, messageList, chat ]);

  return (
    <>
      <List
        inverted
        data={messageList}
        renderItem={renderMessageItem}
        onEndReached={handleEndReached}
      />
      <Composer chat={chat}/>
    </>
  );
}
