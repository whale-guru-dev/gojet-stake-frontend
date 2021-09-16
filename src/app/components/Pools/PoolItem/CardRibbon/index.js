import { StyledCardRibbon } from "./style";

const CardRibbon = (props) => {
  const { title } = props;
  return (
    <StyledCardRibbon {...props}>
      <div title={title}>{title}</div>
    </StyledCardRibbon>
  )
};

export default CardRibbon;
