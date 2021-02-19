import { Button, Icon, ListItem } from '@ui-kitten/components';
import { useObservableState } from 'observable-hooks';
import React from 'react';

export default function ChatListItem({navigation, chat, index}) {
  const snippet: string | undefined = useObservableState(chat.snippet$);
  const readState = useObservableState(chat.readState$);

  const renderItemAccessory = ( props, chat ) => (
    <Button appearance='ghost' status='info' accessoryLeft={evaProps => <Icon {...evaProps} name='arrow-ios-forward-outline'/>}       
        onPress={ () => {
            navigation.navigate('NewChatScreen', {
              chatId: chat.id,
              chatName: chat.name$.getValue(),
            });
        }}
    />
  );

  return (
    <ListItem
      title={'Anonymous ' + `${index + 1}`}
      //description={snippet?.content?.trim()}
      accessoryLeft={evaProps =><Icon {...evaProps} name='person'/>}
      accessoryRight={props => renderItemAccessory(props, chat)}
    />
  );
}
