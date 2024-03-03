
type Props = {
    selectingId: string;
}

export default function ChatContent({selectingId}: Props) {
  return (
    <div>ChatContent: {selectingId}</div>
  )
}