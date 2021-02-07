import { Icon, ListItem } from '@ui-kitten/components';
import { useObservableState } from 'observable-hooks';
import React from 'react';

export default function ChatListItem({chat}) {
  const snippet: string | undefined = useObservableState(chat.snippet$);
  const readState = useObservableState(chat.readState$);

  return (
    <ListItem
      title='Anonymous'
      description={snippet?.content?.trim()}
      accessoryLeft={evaProps =><Icon {...evaProps} name='person'/>}
    />
  );
}
