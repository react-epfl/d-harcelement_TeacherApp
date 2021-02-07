import { matrix } from '@rn-matrix/expo';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { useObservableState } from 'observable-hooks';
import { List } from '@ui-kitten/components';
import ChatItem from '../constants/ChatItem';

export default function ChatsScreen() {
  const chatList = useObservableState(matrix.getRoomsByType$('direct'));

  const isReady = useObservableState(matrix.isReady$());
  const isSynced = useObservableState(matrix.isSynced$());

  const renderItem = ({item}) => {
    return <ChatItem key={item.id} chat={item} />;
  };
  
  if (!isReady || !isSynced ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View>
        <List
          data={chatList}
          renderItem={renderItem}
        />
      </View>
    );
  }
}