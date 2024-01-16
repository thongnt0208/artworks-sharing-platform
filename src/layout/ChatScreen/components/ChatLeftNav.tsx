import React from 'react';
import MessageItemTemplate from '../../../components/MessageItem';
import { DataScroller } from 'primereact/datascroller';

type ChatLeftNavProps = {
  itemsList: any[]; // Update the type of itemsList with the actual type of your data
  selectingId: string;
  setSelectingId: (id: string) => void;
};

const ChatLeftNav: React.FC<ChatLeftNavProps> = (props) => {
  const { itemsList, selectingId, setSelectingId } = props;

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
          <MessageItemTemplate
            key={item.id}
            item={item}
            selectingId={selectingId}
            setSelectingId={setSelectingId}
          />
        )}
      />
      {/* Using DataScroller to lazily render items */}
    </div>
  );
};

export default ChatLeftNav;