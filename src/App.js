import "./App.css";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { useState } from "react";

const itemFromBackend = [
  { id: uuid(), content: "First Task" },
  { id: uuid(), content: "Second Task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Todo",
    items: itemFromBackend,
  },
};

function App() {
  const [columns, setCloumns] = useState(columnsFromBackend);
  return (
    <div className='App'>
      {/* <List>
        <ListSubheader>Currently Pending</ListSubheader>
        <ListItem>
          <ListItemText>This is the First Task</ListItemText>
          <button>Delete</button>
        </ListItem>
      </List> */}
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Droppable droppableId={uuid()}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  ></div>
                );
              }}
            </Droppable>
          );
        })}
        <div className='container-test'>
          <div className='task-board'>
            <h4 className='task-heading'>Pending</h4>
            <div className='task-item'>This is item 1</div>
            <div className='task-item'>This is item 2</div>
            <div className='task-item'>This is item 3</div>
            <div className='task-item'>This is item 3</div>
            <div className='task-item'>This is item 3</div>
            <div className='task-item'>This is item 3</div>
            <div className='task-item'>This is item 3</div>
            <div className='task-item'>This is item 3</div>
            <div className='task-item'>This is item 3</div>
          </div>

          <div className='task-board'>
            <h4 className='task-heading'>Done</h4>
            <div className='task-item'>This is item 1</div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
