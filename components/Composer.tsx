import { Button, Icon, Input } from '@ui-kitten/components';
import React, { useState } from 'react';

type Props = {
  chat: any;
};

export default function Composer({ chat }: Props) {
  const [value, setValue] = useState('');

  const sendMessage = () => {
    chat.sendMessage(value, 'm.text');
    setValue('');
  };

  const renderIcon = (props) => (
    <Button appearance='ghost' status='info' accessoryLeft={evaProps => <Icon {...evaProps} name='paper-plane-outline'/>}       
      onPress={sendMessage}
    />
  );

  return (
    <Input
      placeholder='New Message'
      accessoryRight={renderIcon}
      value={value}
      onChangeText={setValue}
    />
  );
}