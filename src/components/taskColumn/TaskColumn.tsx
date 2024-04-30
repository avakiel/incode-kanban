import React, { useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from 'src/Redux/hooks'
import { selectIssues, selectIssuesLoader, selectSessionIssue } from 'src/Redux/issuesReducer'
import { TaskCard } from '../card/TaskCard'
import {
  reorder,
  setTodo,
  dragAndDropIssue,
  selectTodoColunm,
  selectDoneColunm,
  selectInProgressColunm,
  setSession,
} from 'src/Redux/columnsReducer'

const boxes = ['ToDo', 'In Progress', 'Done']

export const TaskColumn = () => {
  const dispatch = useAppDispatch()
  const issues = useAppSelector(selectIssues)
  const issuesLoader = useAppSelector(selectIssuesLoader)
  const todoColumn = useAppSelector(selectTodoColunm)
  const doneColumn = useAppSelector(selectDoneColunm)
  const progressColumn = useAppSelector(selectInProgressColunm)
  const sessionIssues = useAppSelector(selectSessionIssue)

  useEffect(() => {
    dispatch(setTodo(issues))
  }, [issuesLoader])

  useEffect(() => {
    const storedData = sessionStorage.getItem(sessionIssues as string);
    if (storedData) {
      const { todo, done, inProgress } = JSON.parse(storedData);

      dispatch(setSession({ todo, done, inProgress }));
    }
  }, [sessionIssues]);
  
  useEffect(() => {
    const repoURL = todoColumn[0]?.repoURL || doneColumn[0]?.repoURL || progressColumn[0]?.repoURL || '';
  
    if (!repoURL) return;
  
    const splitURL = repoURL.split('/');
    const owner = splitURL[4];
    const repo = splitURL[5];
    const sessionKey = `${owner}/${repo}`;
  
    const columnsState = {
      todo: todoColumn,
      done: doneColumn,
      inProgress: progressColumn,
    };
  
    sessionStorage.setItem(sessionKey, JSON.stringify(columnsState));
  }, [todoColumn, doneColumn, progressColumn]);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const columnMap: { [key: string]: string } = {
      ToDo: 'todoColumn',
      'In Progress': 'inProgressColumn',
      Done: 'doneColumn',
    }

    const issue = issues.find((e) => e.id.toString() === draggableId)
    if (!issue) {
      return
    }

    const sourceColumn = columnMap[source.droppableId]
    const destinationColumn = columnMap[destination.droppableId]

    dispatch(dragAndDropIssue({ issue, column: sourceColumn }))
    dispatch(
      reorder({ issue, column: destinationColumn, index: destination.index })
    )
  }

  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      gap="5%"
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        {boxes.map((element) => (
          <Box
            key={element}
            marginTop="20px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="20px"
          >
            <Text fontSize="25px" fontWeight="700">
              {element}
            </Text>
            <Droppable droppableId={element}>
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  display="flex"
                  flexDirection="column"
                  border="1px"
                  borderColor="gray.200"
                  padding="10px"
                  gap="5px"
                  height="60vh"
                  overflowY="auto"
                  width="450px"
                  overflowX="hidden"
                >
                  {element === 'ToDo' &&
                    todoColumn.map((e, index) => (
                      <Draggable
                        key={e.id}
                        draggableId={e.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard key={e.id} data={e} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {element === 'In Progress' &&
                    progressColumn.map((e, index) => (
                      <Draggable
                        key={e.id}
                        draggableId={e.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard key={e.id} data={e} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {element === 'Done' &&
                    doneColumn.map((e, index) => (
                      <Draggable
                        key={e.id}
                        draggableId={e.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard key={e.id} data={e} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        ))}
      </DragDropContext>
    </Flex>
  )
}
