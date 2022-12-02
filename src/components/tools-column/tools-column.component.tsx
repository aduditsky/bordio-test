import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon.component.tsx/icon.component';

const ToolsColumnStyles = styled.div`
  background: rgba(245, 248, 250, 1);
`;

const ToolsMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  position: relative;

  cursor: pointer;

  display: flex;
  gap: 10px;
  align-items: center;

  margin: 0;
  padding: 14px;

  transition: 0.15 ease all;

  span {
    /* font-family: 'Roboto'; */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;

    color: #222222;
  }

  &.active {
    &:before {
      position: absolute;
      left: 0;
      content: '';
      width: 4px;
      height: 100%;
      background: #0094ff;
      border-radius: 0px 10px 10px 0px;
    }
    img {
      background-color: #fff;
      mask: no-repeat center;
    }
    span {
      color: #0094ff;
    }
  }
`;

const Title = styled.h3`
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  padding: 24px 16px 26px 16px;

  color: #222222;
`;

const ButtonsList = ['Roadmap', 'Schedule', 'Tasks', 'Notes', 'Files'];

export function ToolsColumnComponent() {
  const [acitve, setAcitve] = useState<string>(ButtonsList[0]);

  return (
    <ToolsColumnStyles>
      <Title>Tools</Title>
      <ToolsMenu>
        {ButtonsList.map((button, i) => (
          <MenuButton
            type='button'
            className={acitve === button ? 'active' : ''}
            key={`${button}-${i}`}
            onClick={() => setAcitve(button)}
          >
            <Icon
              name={button.toLowerCase()}
              fill={acitve === button ? '#0094FF' : ''}
            />
            {/* <img src={`/images/${button}.tool.svg`} /> */}
            <span>{button}</span>
          </MenuButton>
        ))}
      </ToolsMenu>
    </ToolsColumnStyles>
  );
}
