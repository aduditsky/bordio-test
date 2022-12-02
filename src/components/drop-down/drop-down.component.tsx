import { useState } from 'react';
import styled from 'styled-components';
import { ButtonStyles, IButton, IconWrapper } from '../header/header.component';
import { Icon } from '../icon.component.tsx/icon.component';

interface IProps {
  button: IButton;
  i: number;
}

const DropDownWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
`;

const DropDownBody = styled.div`
  padding: 6px;
  background: #ffffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;

  bottom: -8px;
  left: 50%;
  transform: translate(-50%, 100%);

  position: absolute;

  display: grid;
  grid-template-columns: 1fr;

  button {
    display: flex;

    white-space: nowrap;
    text-decoration: none;

    border: none;
    background: none;
    margin: 0;

    min-width: 120px;
    padding: 8px 43px 8px 12px;

    /* font-family: 'Roboto'; */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #000000;

    cursor: pointer;

    &:hover {
      background: #f5f8fa;
      border-radius: 4px;
    }
  }
`;

export const DropDownComponent = ({ button, i }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropDownWrapper>
      <ButtonStyles
        key={i}
        className={open ? 'active' : ''}
        typeButton={button.type}
        direction={button.dir}
        type='button'
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        <IconWrapper size={button.iconSize} isFlip={open}>
          <Icon
            name={button.icon}
            fill={button.type === 'add' ? 'white' : ''} // Немного бойлерплейта, но это потому что я темы не завел, даже на уровне ContextApi
          />
        </IconWrapper>

        <span>{button.title}</span>
      </ButtonStyles>
      {open && (
        <DropDownBody>
          {button.dropDownMenu?.map((item, i) => (
            // Тут надо по хорошему сделать a тэг, и передеать ссылку,
            // но если делать приложение на next, то тут будет Link из next/link
            // А для заполнения сделал кнопку - мне нравятся кнопки
            <button
              type='button'
              key={i}
              onClick={() => {
                console.log('some nav actions to ' + item.link);
              }}
            >
              {item.text}
            </button>
          ))}
        </DropDownBody>
      )}
    </DropDownWrapper>
  );
};
