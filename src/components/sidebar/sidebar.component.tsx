import styled from 'styled-components';
import { AvatarComponent } from '../avatar/avatar.component';

//Components
import { List } from '../list.component.tsx/list.component';
import { SearchInput } from '../search/search.component';

//Styles
import { SideBarStyles } from './sidebar.styles';

const LogoStyles = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;

  padding-top: 26px;
  padding-left: 16px;
  padding-right: 16px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 17px;
`;

const WorkSpace = styled.div`
  padding: 6px 16px;

  cursor: pointer;

  display: flex;

  background-color: rgba(45, 64, 113, 1);
  align-items: center;
  gap: 8px;

  * {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
    line-height: 1;
  }
`;

const ListMenu = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: column;
  gap: 22px;

  * {
    cursor: pointer;
  }
`;

export function SideBarComponent() {
  return (
    <SideBarStyles>
      <LogoStyles>
        <img src='/images/bordio-logo.svg' alt='logotype' />
      </LogoStyles>
      <SearchInput className='padding-sidebar' />
      <MainSection>
        <WorkSpace>
          <AvatarComponent size={22} />
          <span>My workspace</span>
        </WorkSpace>
        <ListMenu>
          <List title={'Favorites'} links={['Marketing', 'Mobile App']} />
          <List
            title={'My Projects'}
            links={[
              'Marketing',
              'Landing Pages',
              'Wedding',
              'Mobile App',
              'House Construction',
            ]}
          />
        </ListMenu>
      </MainSection>
    </SideBarStyles>
  );
}
