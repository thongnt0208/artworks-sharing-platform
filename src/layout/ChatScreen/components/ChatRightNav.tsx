import './ChatRightNav.scss';

type Props = { selectingId: string };

export default function ChatRightNav({ selectingId }: Props) {
  return <div className='chat-right-nav'>ChatRightNav {selectingId}</div>;
}
