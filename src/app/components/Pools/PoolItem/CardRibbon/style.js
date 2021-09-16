import styled from 'styled-components'

export const StyledCardRibbon = styled.div`
  z-index: 1;
  background-color: rgb(189, 194, 196);
  color: white;
  margin: 0;
  padding: 0;
  padding: 6px 0;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;
  width: 96px;

  &:before,
  &:after {
    background-color: rgb(189, 194, 196);
    content: "";
    height: 100%;
    margin: 0 -1px; /* Removes tiny gap */
    position: absolute;
    top: 0;
    width: 100%;
  }

  &:before {
    right: 100%;
  }

  &:after {
    left: 100%;
  }

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 96px;
  }
`;
