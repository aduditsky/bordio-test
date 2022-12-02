import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { CardComponent, ICard } from './card.component';
import { BodyItem, IBoard } from './grid.component';

interface IProps {
  board: IBoard;
  i: number;
  onDrop: (item: any) => void;
  cardMove: any;
}
export function ColumnComponent({ board, i, onDrop, cardMove }: IProps) {
  const { items } = board;

  const [, drop] = useDrop(() => ({
    accept: board.typeBoard !== 'cr' ? 'card' : 'notyet',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const renderCard = useCallback(
    (
      card: ICard,
      index: number,
      i: number,
      boardType: string,
      moveCard: any
    ) => {
      return (
        <CardComponent
          key={index}
          {...card}
          col={i}
          boardType={boardType}
          moveCard={moveCard}
          index={index}
        />
      );
    },
    []
  );

  return (
    <BodyItem ref={drop} key={i}>
      {items.map((card, index) =>
        renderCard(card, index, i, board.typeBoard, cardMove)
      )}
    </BodyItem>
  );
}
