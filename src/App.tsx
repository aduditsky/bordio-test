import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { KanbanGrid } from './components/grid/grid.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { ToolsColumnComponent } from './components/tools-column/tools-column.component';

const AppStyles = styled.div`
  display: grid;
  grid-template-columns: 219px 154px 1fr;
  grid-auto-rows: 1fr;
  height: 100vh;
  /* height: 978px; */

  overflow: hidden; // скрыл из-за ненадобности доработки
`;

const MainStyles = styled.main`
  width: 100%;
`;

function App() {
  return (
    <AppStyles>
      <SideBarComponent />
      <ToolsColumnComponent />
      <MainStyles>
        <HeaderComponent />
        <DndProvider backend={HTML5Backend}>
          <KanbanGrid />
        </DndProvider>
      </MainStyles>
    </AppStyles>
  );
}

export default App;
