import { styled } from "styled-components";

export const Button = styled.button`
  border-radius: 10em;
  border: none;
  width: 10em;
  height: 3em;
  font-size: inherit;
  font-family: inherit;
  font-weight: 700;
  pointer-events: all;
  filter: drop-shadow(0 1em 1rem #000000b2);
  &:hover {
    cursor: pointer;
  }
`;
