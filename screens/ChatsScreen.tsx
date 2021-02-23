import { matrix } from '@rn-matrix/expo';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { useObservableState } from 'observable-hooks';
import { List } from '@ui-kitten/components';
import ChatItem from '../components/ChatItem';

export default function ChatsScreen({navigation}) {
  const chatList = useObservableState(matrix.getRoomsByType$('direct'));

  const isReady = useObservableState(matrix.isReady$());
  const isSynced = useObservableState(matrix.isSynced$());

  const renderItem = ({item, index}) => {
    return <ChatItem navigation={navigation} chat={item} index={index}/>;
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
