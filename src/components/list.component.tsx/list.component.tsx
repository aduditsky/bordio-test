import styled from 'styled-components';

const ListStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  * {
    cursor: pointer;
  }

  .title {
    margin: 0;
    padding: 0;

    background: none;
    border: none;

    display: flex;
    align-items: center;
    gap: 8px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;

    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #8c939f;
    color: rgba(140, 147, 159, 1);
  }
`;

interface IProps {
  title: string;
  links: string[];
}

export function List({ title, links }: IProps) {
  return (
    <ListStyles>
      <button className='title'>
        <img src='/images/chevron.svg' alt='' />
        <span>{title}</span>
      </button>
      <ul className='list'>
        {links.map((link, i) => (
          <li key={link + i}>{link}</li>
        ))}
      </ul>
    </ListStyles>
  );
}
