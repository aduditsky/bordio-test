import styled from 'styled-components';

import { AvatarComponent } from '../avatar/avatar.component';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { Icon } from '../icon.component.tsx/icon.component';

const HeaderStyles = styled.header`
  width: 100%;
  border: 1px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 2px 4px #f0f1f2;

  min-width: 800px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ControlStyles = styled.div`
  display: flex;
  gap: 22px;

  justify-content: space-between;
  align-items: center;
`;

const ButtonsStyles = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

// Search
const SearchStyles = styled.div`
  display: flex;
  position: relative;

  width: fit-content;
`;

const SearchField = styled.input`
  border: none;
  margin: 0;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;

  padding: 12px 48px 12px 16px;

  background: #f5f8fa;
  border-radius: 50px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 16px;
  top: 15px;

  cursor: pointer;

  width: 16px;
  height: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* padding: 2px; */
  margin: 0;
  border: none;
  background: none;

  svg {
    width: 100%;
    height: 100%;
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }
`;

// Buttons
interface IButtonStyles {
  direction: 'left' | 'right';
  typeButton: string;
}
export const ButtonStyles = styled.button<IButtonStyles>`
  display: flex;
  justify-content: space-around;
  align-items: center;

  flex-direction: ${(p) => (p.direction !== 'left' ? 'row' : 'row-reverse')};
  gap: 8px;

  cursor: pointer;

  padding: 8px 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  background: none;
  border: none;

  border-radius: 50px;
  background: #f5f8fa;

  /* Type "Add" */
  ${(p) =>
    p.typeButton === 'add' ? 'background: #0094FF; color: #FFFFFF;gap: 0;' : ''}

  &.active {
    filter: brightness(90%);
  }
`;

export interface IButton {
  title: string;
  dir: 'left' | 'right';
  icon: string;
  type: 'add' | 'dropdown';
  iconSize: number;
  dropDownMenu?: { link: string; text: string }[];
}

const buttonsArr: IButton[] = [
  {
    title: 'Add new',
    dir: 'right',
    icon: 'plus',
    type: 'add',
    iconSize: 24,
  },
  {
    title: 'Kanban',
    dir: 'left',
    icon: 'chevron',
    type: 'dropdown',
    iconSize: 24,
    dropDownMenu: [
      { link: '#', text: 'Board view' },
      { link: '#', text: 'Table view' },
      { link: '#', text: 'Kanban' },
    ],
  },
  {
    title: 'Filter',
    dir: 'left',
    icon: 'chevron',
    type: 'dropdown',
    iconSize: 24,
    // dropDownMenu: [], // Если надо будет, то можно занести параметром
  },
];

interface IWrapper {
  size?: number | 24;
  isFlip?: boolean;
}
export const IconWrapper = styled.div<IWrapper>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.2s ease;

  ${(p) => (p.isFlip ? 'transform: rotate(180deg);' : '')}
`;

const Notification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Count = styled.div`
  position: absolute;

  padding: 5px 3px 5px 4px;
  right: -15px;
  top: -10px;

  font-size: 10px;
  line-height: 10px;

  background: #f21247;
  border: 1px solid #ffffff;
  color: white;
  border-radius: 4px;
`;

export function HeaderComponent() {
  return (
    <HeaderStyles>
      <ButtonsStyles>
        {buttonsArr.map((button: IButton, i: number) => {
          return button.dropDownMenu ? (
            <DropDownComponent key={i} button={button} i={i} />
          ) : (
            <ButtonStyles
              key={i}
              typeButton={button.type}
              direction={button.dir}
              type='button'
            >
              <IconWrapper size={button.iconSize}>
                <Icon
                  name={button.icon}
                  fill={button.type === 'add' ? 'white' : ''} // Немного бойлерплейта, но это потому что я темы не завел, даже на уровне ContextApi
                />
              </IconWrapper>

              <span>{button.title}</span>
            </ButtonStyles>
          );
        })}
      </ButtonsStyles>
      <ControlStyles>
        <SearchStyles>
          <SearchField type='search' placeholder='Search...' />
          <SearchButton>
            <Icon name='search' />
          </SearchButton>
        </SearchStyles>
        <Notification>
          <Icon name='bell' />
          <Count>99+</Count>
        </Notification>
        <AvatarComponent size={40} />
      </ControlStyles>
    </HeaderStyles>
  );
}
