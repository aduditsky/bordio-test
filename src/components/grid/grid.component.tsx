import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import styled from 'styled-components';
import { ICard } from './card.component';
import { Icon } from '../icon.component.tsx/icon.component';
import { ColumnComponent } from './column.component';

const GridWrapper = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 154px - 219px);
  height: calc(100vh - 86px);
`;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 290px) 377px;
  grid-template-rows: 52px 1fr;
`;

const HeadItem = styled.div`
  display: flex;
  padding: 13px;

  align-content: flex-end;

  align-items: center;
  justify-content: center;

  gap: 10px;

  span {
    /* font-family: 'Roboto'; */
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    display: flex;

    align-items: center;
    justify-content: center;

    color: #222222;
  }

  div {
    background: #e8ebef;
    border-radius: 100px;
    padding: 2px 9px;

    /* font-family: 'Roboto'; */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: right;

    color: #8c939f;
  }
`;

export const BodyItem = styled.div`
  background-color: white;
  border: 1px solid #f3f3f3;
  padding: 10px;

  display: flex;
  flex-direction: column;
  /* height: fit-content; */
  gap: 10px;
`;

export interface IBoard {
  id: number;
  title: string;
  typeBoard: string;
  isActive: boolean;
  items: ICard[];
}

export function KanbanGrid() {
  const [boards, setBoards] = useState<IBoard[]>([
    {
      id: 0,
      isActive: true,
      title: 'New task',
      typeBoard: 'in-queue',
      items: [
        {
          id: 1,
          title: 'Test Title',
          index: 0,
          time: '5.00am',
          color: '#ABE9CE',
        },
        {
          id: 2,
          title: 'Compare PPC agencies and make a report for Steven',
          index: 1,
          time: '3.00am',
          color: '#abb2e9',
        },
        {
          id: 3,
          title: 'Meeting with Amanda (PR department)',
          index: 2,
          time: '5.00am',
          color: '#abb2e9',
        },
        {
          id: 4,
          title: 'Check email',
          index: 3,
          time: '10.00am',
          color: '#e5abe9',
        },
      ],
    },
    {
      id: 1,
      isActive: true,
      title: 'Scheduled',
      typeBoard: 'in-queue',
      items: [
        {
          id: 8,
          title: 'Check phone',
          index: 7,
          time: '10.00am',
          color: '#5bbaed',
        },
        {
          id: 9,
          title: 'Learn DnD',
          index: 8,
          time: '3.30am',
          color: '#c8e0ec',
        },
      ],
    },
    {
      id: 2,
      isActive: true,
      title: 'In progress',
      typeBoard: 'in-queue',
      items: [
        {
          id: 5,
          title: 'Check email',
          index: 4,
          time: '10.00am',
          color: '#dde9ab',
        },
        {
          id: 6,
          title: 'Write a blogpost "7 best strategies for SEO in 2020"',
          index: 5,
          time: '11.00am',
          color: '#7bebe7',
        },
      ],
    },
    {
      id: 3,
      isActive: true,
      title: 'Completed',
      typeBoard: 'complete',
      items: [
        {
          id: 7,
          title: 'Checked email',
          index: 6,
          time: '10.00am',
          color: '#e3af62',
        },
      ],
    },
    {
      id: 4,
      isActive: false,
      title: 'Create status',
      typeBoard: 'cr',
      items: [],
    },
  ]);

  const handleDrop = useCallback(
    (index: number, item: ICard) => {
      const { title, col, id, color } = item;

      if (col === index) return;

      //index - это номер борды, item - это пейлод карточки из хука useDrag()
      setBoards((prevBoard) => {
        let containBoard: IBoard = prevBoard.filter(
          (board) => board.id === col
        )[0];
        let currentBoard: IBoard = prevBoard.filter(
          (board) => board.id === index
        )[0];
        let notUsedBoards: IBoard[] = prevBoard.filter(
          (board) =>
            board.id !== containBoard.id && board.id !== currentBoard.id
        );

        containBoard.items = containBoard.items.filter(
          (item) => item.id !== id
        );

        currentBoard.items.push(item);

        let pre = [...notUsedBoards, { ...containBoard }, { ...currentBoard }];
        pre = pre.sort((a, b) => a.id - b.id);

        return pre;
      });
    },
    [boards]
  );

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number, colId: number) => {
      setBoards((prevBoard) => {
        console.log({
          prev: prevBoard[colId].items,
          data: { dragIndex, hoverIndex, colId },
        });
        const next = update(prevBoard, {
          [colId]: {
            items: {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevBoard[colId].items[dragIndex] as ICard],
              ],
            },
          },
        });
        console.log({ next: next[colId].items });
        return next; // тут неправильная мутация со стейтомя
        return prevBoard;
      });
    },
    []
  );

  return (
    <GridWrapper>
      <GridContainer>
        {boards.map((head, i) => (
          <HeadItem key={i}>
            <span>
              {head.typeBoard === 'cr' && (
                <>
                  <Icon name='plus' />{' '}
                </>
              )}
              {head.title}
            </span>
            {head.typeBoard !== 'cr' && <div>{head.items.length}</div>}
          </HeadItem>
        ))}

        {boards.map((board, i) => (
          <ColumnComponent
            key={i}
            i={i}
            board={board}
            cardMove={moveCard}
            onDrop={(item) => {
              handleDrop(board.id, item);
            }}
          />
        ))}
      </GridContainer>
    </GridWrapper>
  );
}
