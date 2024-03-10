import './ChatRightNav.scss';

type Props = { selectingRequestId: string };

export default function ChatRightNav({ selectingRequestId }: Props) {
  return <div className='chat-right-nav'>ChatRightNav {selectingRequestId}</div>;
}
