import React from 'react';
import ChatboxItemTemplate from '../../../components/ChatboxItem';
import { DataScroller } from 'primereact/datascroller';

type ChatLeftNavProps = {
  itemsList: any[]; // Update the type of itemsList with the actual type of your data
  selectingChatboxId: string;
  setSelectingChatboxId: (id: string) => void;
};

const ChatLeftNav: React.FC<ChatLeftNavProps> = (props) => {
  const { itemsList, selectingChatboxId, setSelectingChatboxId } = props;

  return (
    <div className='max-h-full'>
      <p className='text-cus-h2-bold'>Chưa đọc</p>
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
            selectingChatboxId={selectingChatboxId}
            setSelectingChatboxId={setSelectingChatboxId}
          />
        )}
      />
      {/* Using DataScroller to lazily render items */}
    </div>
  );
};

export default ChatLeftNav;
