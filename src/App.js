import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const initialBoards = [
  {
    id: 'board-1',
    title: 'To Do',
    cards: [
      { id: 'card-1', text: 'Fix login bug' },
      { id: 'card-2', text: 'Update documentation' },
    ],
  },
  {
    id: 'board-2',
    title: 'In Progress',
    cards: [{ id: 'card-3', text: 'Implement new feature' }],
  },
];

function App() {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('kanban');
    return saved ? JSON.parse(saved) : initialBoards;
  });
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(boards));
  }, [boards]);

  const addBoard = () => {
    const title = prompt('Enter board title:');
    if (title) {
      setBoards([...boards, {
        id: uuidv4(),
        title,
        cards: []
      }]);
    }
  };

  const addCard = (boardId) => {
    const text = prompt('Enter card text:');
    if (text) {
      setBoards(boards.map(board => 
        board.id === boardId
          ? { ...board, cards: [...board.cards, { id: uuidv4(), text }] }
          : board
      ));
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newBoards = [...boards];
    const sourceBoard = newBoards.find(board => 
      board.id === source.droppableId
    );
    const destBoard = newBoards.find(board => 
      board.id === destination.droppableId
    );
    const [movedCard] = sourceBoard.cards.splice(source.index, 1);
    
    destBoard.cards.splice(destination.index, 0, movedCard);
    setBoards(newBoards);
  };

  const editCard = (boardId, cardId, newText) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: board.cards.map(card =>
            card.id === cardId ? { ...card, text: newText } : card
          )
        };
      }
      return board;
    }));
    setEditingCard(null);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Kanban Board</h1>
        <button className="add-board-btn" onClick={addBoard}>
          Add Board
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="boards-container">
          {boards.map((board) => (
            <Droppable key={board.id} droppableId={board.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="board"
                >
                  <div className="board-header">
                    <h2>{board.title}</h2>
                    <button 
                      className="add-card-btn"
                      onClick={() => addCard(board.id)}
                    >
                      +
                    </button>
                  </div>

                  {board.cards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card"
                        >
                          {editingCard === card.id ? (
                            <input
                              type="text"
                              value={card.text}
                              autoFocus
                              onChange={(e) => editCard(board.id, card.id, e.target.value)}
                              onBlur={() => setEditingCard(null)}
                              className="card-edit-input"
                            />
                          ) : (
                            <div className="card-content">
                              {card.text}
                              <button 
                                className="edit-btn"
                                onClick={() => setEditingCard(card.id)}
                              >
                                ✏️
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;