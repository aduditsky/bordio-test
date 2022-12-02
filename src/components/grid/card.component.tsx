import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';

//@ts-ignore - Пришлось заигнорить, тк у меня нет какой-нибудь библиотеки по генерации цветов
import { uniqColor } from 'random-colors-palette';
import { useCallback, useRef } from 'react';

interface ICardStyled {
  color?: string;
}

export interface ICard {
  boardType?: string;
  col?: number;
  id: number;
  index: number;
  title: string;
  time: string;
  color?: string;
  moveCard?: (dragIndex: number, hoverIndex: number, colId: number) => void;
}

const CardStyles = styled.div<ICardStyled>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  gap: 10px;

  border-radius: 8px;

  background-color: ${(p) => p.color};

  align-items: space-between;

  .title {
    /* font-family: 'Roboto'; */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #222222;
  }

  .time {
    /* font-family: 'Roboto'; */

    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;

    color: rgba(0, 0, 0, 0.45);
  }

  &.complete {
    background-color: #f0f0f0;
    * {
      text-decoration: line-through;
    }
  }
`;

//Я его нагло забрал из пакета dnd-core, можно было импортировать, но я не ставил dnd-core
export interface XYCoord {
  x: number;
  y: number;
}

export function CardComponent({
  id,
  title,
  index,
  time,
  color,
  col,
  boardType,
  moveCard,
}: ICard) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'card',

    hover(item: ICard, monitor) {
      return;

      if (!ref.current) {
        return;
      }

      if (item.col !== col) return;

      const dragIndex = item.id - 1;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      //@ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      //@ts-ignore
      moveCard(dragIndex, hoverIndex, col);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.id = hoverIndex;
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [collected, drag] = useDrag(
    () => ({
      type: 'card',
      item: { id, title, time, color, col }, //payload
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [title, time]
  );

  drag(drop(ref));

  return (
    <CardStyles
      style={{
        backgroundColor: collected.isDragging ? '#eee' : '',
        color: collected.isDragging ? 'red' : '',
      }}
      className={boardType === 'complete' ? 'complete' : ''}
      ref={ref}
      color={color}
    >
      <div className='title'>{title}</div>
      <div className='time'>{time}</div>
    </CardStyles>
  );
}
