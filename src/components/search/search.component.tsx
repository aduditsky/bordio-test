import React from 'react';
import styled from 'styled-components';
import { Icon } from '../icon.component.tsx/icon.component';

const SearchStyles = styled.div`
  display: flex;

  margin: 26px 0 19px 0;
  width: 100%;

  &.padding-sidebar {
    padding: 0 16px;
  }
`;

const Form = styled.form`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const SearchField = styled.input`
  width: 100%;

  border: none;
  background: #2d4071;
  border-radius: 4px;

  font-weight: 400;
  font-size: 14px;
  line-height: 1;

  color: white;

  margin: 0;
  padding: 9px 34px 9px 10px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;

  cursor: pointer;

  transform: translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px;
  margin: 0;

  width: 16px;
  height: 16px;

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

interface IProps {
  className?: string;
}

export function SearchInput({ className }: IProps) {
  return (
    <SearchStyles className={className ? className : ''}>
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log('Some search action');
        }}
      >
        <SearchField type='search' placeholder='Search...' />
        <SearchButton type='submit'>
          <Icon name='search' />
        </SearchButton>
      </Form>
    </SearchStyles>
  );
}
