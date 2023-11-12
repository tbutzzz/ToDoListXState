import {createMachine, assign} from "xstate";

export const todosMachine = createMachine({
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMAFgDMFAGz2XtgOwBGLbYAcfgCsAJz+ADQgAJ6IALSOzrZaHkFa9vb+nm6eQQC+uZFCOAQknBL0pIxCbByUCgIURSKl4rQVVTJyCkrmmroa3gZIICawZmqkljYI8fa2FLYhIbbe-mH23p4hQS6RMTP+8xvLWo5a3l7LK-mFMsWiZW1S1axgAE5vqG8URgA2KgAzL4AW0ad2aYmoT0q0hY8lIvB6E30+kso3GFmG01ivk8FG27n8Hn8qRcIS0nj2iF8QQW9k8DgSIU8RIyeQKICaJUh1Uw5UgrAAwgAlACiAEFkKKAHKigDqqOG6N6U0Qjh8FBZoRWnjSO38jiCVIQIRcFG8Ll1p1S6vV7NuGHuLTBLD5bQFABFRVRRVLkAB5D3+xXGUwqrGIIJnVw7U1nemrezGrILLxkw6eTzpJIuG6c8HcziCt5gFRSaVgADusNQFAAyoRUJWpEC3sDMGQjABXZRsABi-uF2AAktKAAoAVWQgoAEuLpQBxUUekMjMMTVUzXz2TVuWxJbZBHz+E-GlzebwxlxnTbeZYk-x5rkPSjF0uqGEV6tCeuN5sw1t207Hs2DrCcACER2QVdlQ3CMEFsQ0KEyYIXEyRxfEcEJHGNVJ-Fcc5DjOFwyXcewnwLF8KDfMtPyrGt61wbhnhkdh1DqBF+EESjnRoj9GC-Bi6yYliMHhREy3UFFdDRddMVAaYdgoLDlkzc4TkCHDompLR8X8dIcjJIJ7GM1Zcw5Z9eJLWiBPon9hOYmEhFeD4vh+f5lEAl1hELV9rP4zBBPskSnJkcTFEkvo9BkpU5MmeCzjxWxr0zEILhWRYQjPdwKHOLI0uSJxHEQijHQhTgPTAX4wAC5zai4TiGksyFKuq2qwu6SLpKGUMxnDBS7ACXK-EOAI1lsIJNONHF7F07ZzncFY3HSRxSp8qjWpq0TUBcz5vj+QEQW8p0WqqrbQrEzrem62S+rggaEAZS8wmKoJ9zvBJkuTWkLS0LQj3PSadlWNaToqs72sdUVXJLCBWDrMdRWXCcxxguLNzWPE-C1IILWZTNKW0hALUvNZ9V8Fxklxu9QfKyhNshrBob2gUrFgZQVEoXAAWUd4AAoJr+gBKVhmvBtrtswZmvkgNG7vk6xEGvXTr2MtDyUQkiIiJi1nCwxLJoKt7HEfPNSHQOBLDFsBboxeKHvickFiWFY1n0zZtl2In4iCWkWTCNxViPYrTlp3yoUkC7ZFt-rFYQDDaRzckTZ2LRDm8abkvwynAjTxYs6jMOqN5fkIBj+646cEJdwZLPmWyf7jQcWkDRyc59w2ZK-CL51ym22ApZhyBy4V7ELR3exTUW3H9KzZIm5M5D1TZVYdUzHvIT48s7JkEf7bjnE3t3OYD1949TyJk3nFm3x9JvE9Fg3ot-O378ZF-JsWxBDtSG7Xs983Ekc0jhJ6T2ZCSO0WUib0l0pNRYlp-pzEyCSJ+fl3yvyEiFDoGAAEJUWOaOBF5PpOFxsaSe+F3rkncGSbImRUEUAZttXBD0fB+wpHeAIaE7zpGmpsHcWhtgWjemkbwxlQ4WR4qdCWUdB4szLrFeW+9phrF0qsbws1QjLBAS4I0l9oypxyN4RwlMMjqPZPkIAA */
    tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
    schema: {
        // events: {} as 
        // | {type: 'TODOSLOADED'; todos: string[]} 
        // | {type: 'LOADINGTODOSFAILED'; errorMessage: string},
        services: {} as {
            'loadTodos': {
                data: string[];
            };
            'saveTodo': {
                data: void;
            };
            'deleteTodo': {
                data: void;
            };
        },
        events: {} as 
        | {
            type: 'CREATENEW';
        } 
        | {
            type: 'FORMINPUTCHANGED';
            value: string;
        } 
        | {
            type: 'SUBMIT';
        } 
        | {
            type: 'DELETETODO';
            todo: string;
        } 
        | {
            type: 'SPEEDUP';
        }
    },
    context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: '',
    },
    id: 'Todo Machine',
    initial: 'Loading Todos',
    states: {
        'Loading Todos': {
            invoke: {
                src: 'loadTodos',
                onDone: [
                    {
                    target: 'Todos Loaded',
                    cond: 'Has todos',
                    actions: 'assignTodosToContext'
                },
                {
                    target: 'Creating New Todo',
                },
            ],
                onError: [
                    {
                        target: 'Loading Todos Errored',
                        actions: 'assignErrorToContext',
                    }
                ]
            },
        },
        'Todos Loaded': {
            on: {
                CREATENEW: {
                    target: 'Creating New Todo',
                },
                DELETETODO: {
                    target: 'Deleting Todo',
                },
            },

        },
        'Loading Todos Errored': {

        },
        'Creating New Todo': {
            initial: 'Showing form inputs',
            states: {
                'Showing form inputs': {
                    on: {
                        FORMINPUTCHANGED: {
                            actions: 'assignFormInputToContext',
                        },
                        SUBMIT: {
                            target: 'Saving Todo',
                        },
                    },
                },
                'Saving Todo': {
                    invoke: {
                        src: 'saveTodo',
                        onError: [
                            {
                                target: 'Showing form inputs',
                                actions: 'assignErrorToContext',
                            },
                        ],
                        onDone: [
                            {
                                target: '#Todo Machine.Loading Todos',
                            },
                        ],
                    },
                },
            },
        },
        'Deleting Todo': {
            invoke: {
                src: 'deleteTodo',
                onError: [
                    {
                        target: 'Deleting Todo Errored',
                        actions: 'assignErrorToContext',
                    },
                ],
                onDone: [
                    {
                        target: 'Loading Todos',
                        actions: 'assignTodosToContext'
                    }
                ]
            }
        },
        'Deleting Todo Errored': {
            after: {
                '2500': {
                    target: 'Loading Todos',
                },
            },
            on: {
                SPEEDUP: {
                    target: 'Loading Todos'
                }
            }
        },
    },
},
    {
        guards: {
            'Has todos': (context, event) => {
                return event.data.length > 0;
            }
        },
        actions: {
            assignTodosToContext: assign((context, event) => {
                return {
                    todos: event.data,
                }
            }),
            assignErrorToContext: assign((context, event) => {
                return {
                    errorMessage:( event.data as Error).message,
                }
            }),
            assignFormInputToContext: assign((context, event) => {
                return {
                    createNewTodoFormInput: event.value,
                }
            }),
        }
    }
);