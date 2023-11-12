import logo from './logo.svg';
import './App.css';
import { useMachine } from '@xstate/react';
import { myMachine } from './machines/myFirstMachine.ts';
import { todosMachine } from './machines/todoAppMachine.ts';
import React from 'react';

const todos: Set<string> = new Set([])

function App() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput); 
      },
      deleteTodo: async (context, event) => {
        todos.delete(event.todo);
      },
    }
  });

  // test comment

  return (
    <div>
      <pre> {JSON.stringify(state.value)} </pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches('Todos Loaded') && (
          <>
            {state.context.todos.map((todo) => (
          <div key={todo} style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <p>{todo}</p>
            <button onClick={() => {
              send({
                type: 'DELETETODO',
                todo,
              })
            }}>
              Delete
            </button>
          </div>    
        ))}
          </>
        )}
        {state.matches('Deleting Todo Errored') && (
          <>
            <p>Something went wrong: {state.context.errorMessage}</p>
            <button onClick={() => {
              send ({
                type: 'SPEEDUP',
              })
            }}>Go back to list</button>
          </>
        )}
        {state.matches('Todos Loaded') && 
        <button
          onClick={() => {
            send({
              type: 'CREATENEW'
            })
          }}
        >
          Created new
        </button>
        }
        {state.matches('Creating New Todo.Showing form inputs') && (
          <form onSubmit={(e) => {
            e.preventDefault();
            send({
              type: 'SUBMIT'
            })
          }}>
            <input 
            type='text'
            onChange={(e) => {
            send({
              type: 'FORMINPUTCHANGED',
              value: e.target.value,
            })
          }}>
          </input>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
