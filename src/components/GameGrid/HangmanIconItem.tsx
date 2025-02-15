interface HangmanIconItemProps {
  readonly url: string;
}

const HangmanIconItem = ({ url }: HangmanIconItemProps) => {
  return <img src={url} style={{ width: "40%" }} />;
};

export default HangmanIconItem;
