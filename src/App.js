import './App.css';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

const itemFromBackend = [
  { id: uuid(), content: 'Learn React.js' },
  { id: uuid(), content: 'Learn Css' },
  { id: uuid(), content: 'Walk for 1 hour' },
  { id: uuid(), content: 'Finish the unread book ' },
];

const columnsFromBackend = {
  [uuid()]: {
    name: 'Todo',
    items: itemFromBackend,
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
  },
  [uuid()]: {
    name: 'Done',
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className='App'>
      {/* <List>
        <ListSubheader>Currently Pending</ListSubheader>
        <ListItem>
          <ListItemText>This is the First Task</ListItemText>
          <button>Delete</button>
        </ListItem>
      </List> */}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className='container'>
          {Object.entries(columns).map(([id, column]) => {
            {
              /* <div
              className='container'
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }} 
            > */
            }
            return (
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      className='task-board'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? 'lightblue'
                          : 'white',
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      <h2 className='task-heading'>{column.name}</h2>
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className='task-item'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: 'none',
                                    padding: 8,
                                    margin: '8px 0 8px 0',
                                    minHeight: '50px',
                                    backgroundColor: snapshot.isDragging
                                      ? '#263B4A'
                                      : '#456C86',
                                    color: 'white',
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.content}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
