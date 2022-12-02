import styled from 'styled-components';

const AvatarStyles = styled.div<{ size?: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  overflow: hidden;

  cursor: pointer;

  img {
    width: 100%;
  }
`;

interface IProps {
  size?: number;
}

export function AvatarComponent({ size }: IProps) {
  return (
    <AvatarStyles size={size ? size : 40}>
      <img src='/images/avatar.jpg' alt='avatar' />
    </AvatarStyles>
  );
}
