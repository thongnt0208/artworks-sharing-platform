import React from 'react';
import ChatboxItemTemplate from '../../../components/ChatboxItem';
import { DataScroller } from 'primereact/datascroller';
import { ChatboxItemType } from '../ChatRelatedTypes';

type ChatLeftNavProps = {
  itemsList: ChatboxItemType[];
  selectingChatbox: ChatboxItemType;
};

const ChatLeftNav: React.FC<ChatLeftNavProps> = (props) => {
  const { itemsList, selectingChatbox } = props;

  return (
    <div className='max-h-full w-full'>
      <p className='text-cus-h2-bold'>Tin nhắn</p>
      {!itemsList && <p>Không có yêu cầu nào</p>}
      <DataScroller
        value={itemsList}
        rows={8}
        buffer={0.4}
        inline
        lazy={true}
        scrollHeight='80vh'
        itemTemplate={(item) => (
          <ChatboxItemTemplate
            key={item.id}
            item={item}
            selectingChatbox={selectingChatbox}
          />
        )}
      />
      {/* Using DataScroller to lazily render items */}
    </div>
  );
};

export default ChatLeftNav;
