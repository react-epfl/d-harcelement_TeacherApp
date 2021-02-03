import { matrix } from '@rn-matrix/expo';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { useObservableState } from 'observable-hooks';
import { Icon, Text, List, ListItem } from '@ui-kitten/components';

export default function ChatsScreen() {
  const chatList = useObservableState(matrix.getRooms$(true), []);
  const isReady = useObservableState(matrix.isReady$());
  const isSynced = useObservableState(matrix.isSynced$());

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name}`}
      accessoryLeft={renderItemIcon}
    />
  );

  console.log(chatList);
  
  if (!isReady || !isSynced || !chatList) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (chatList.length = 0){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <List
          data={chatList}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
