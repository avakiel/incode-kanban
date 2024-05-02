import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from 'src/Redux/hooks'
import { selectActiveRepo, selectSessionIssue } from 'src/Redux/issuesReducer'
import { TaskCard } from '../card/TaskCard'
import {
  reorder,
  dragAndDropIssue,
  selectTodoColunm,
  selectDoneColunm,
  selectInProgressColunm,
  setSession,
  fetchExtraIssues,
  selectLoading,
} from 'src/Redux/columnsReducer'
import { setTerminalData } from 'src/Redux/terminalReducer'
import { Loader } from '../Loader'

const boxes = ['ToDo', 'In Progress', 'Done']

export const TaskColumn = () => {
  const dispatch = useAppDispatch()
  const todoColumn = useAppSelector(selectTodoColunm)
  const doneColumn = useAppSelector(selectDoneColunm)
  const progressColumn = useAppSelector(selectInProgressColunm)
  const sessionIssues = useAppSelector(selectSessionIssue)
  const activeRepo = useAppSelector(selectActiveRepo)
  const loaderExtraIssues = useAppSelector(selectLoading)
  const [page, setPage] = useState(1)

  const totalUploaded = todoColumn.length + doneColumn.length + progressColumn.length

  function uploadMoreIssue() {
    setPage((prev) => prev + 1)
    if (!activeRepo) return

    dispatch(
      fetchExtraIssues({
        owner: activeRepo?.owner,
        repo: activeRepo?.repo,
        per_page: '50',
        page: page.toString(),
      })
    )
  }

  useEffect(() => {
    if (!activeRepo) return
    dispatch(
      fetchExtraIssues({
        owner: activeRepo?.owner,
        repo: activeRepo?.repo,
        per_page: '50',
        page: page.toString(),
      })
    )
    setPage(2)
  }, [activeRepo])

  useEffect(() => {
    const storedData = sessionStorage.getItem(sessionIssues as string)
    if (storedData) {
      const { todo, done, inProgress } = JSON.parse(storedData)

      dispatch(setSession({ todo, done, inProgress }))
    }
  }, [sessionIssues])

  useEffect(() => {
    const repoURL = todoColumn[0]?.repoURL || doneColumn[0]?.repoURL || progressColumn[0]?.repoURL || ''

    if (!repoURL) return

    const splitURL = repoURL.split('/')
    const owner = splitURL[4]
    const repo = splitURL[5]
    const sessionKey = `${owner}/${repo}`

    const columnsState = {
      todo: todoColumn,
      done: doneColumn,
      inProgress: progressColumn,
    }

    sessionStorage.setItem(sessionKey, JSON.stringify(columnsState))
  }, [todoColumn, doneColumn, progressColumn])

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const columnMap: { [key: string]: string } = {
      ToDo: 'todoColumn',
      'In Progress': 'inProgressColumn',
      Done: 'doneColumn',
    }

    const allIssues = [...todoColumn, ...progressColumn, ...doneColumn]
    const issue = allIssues.find((e) => e.id.toString() === draggableId)

    if (!issue) {
      return
    }

    const sourceColumn = columnMap[source.droppableId]
    const destinationColumn = columnMap[destination.droppableId]

    dispatch(dragAndDropIssue({ issue, column: sourceColumn }))
    dispatch(reorder({ issue, column: destinationColumn, index: destination.index }))

    const terminalData = `[${activeRepo?.owner + `/` + activeRepo?.repo}]: "#${
      issue.issueNumber
    }" from "${sourceColumn}" moved to "${destinationColumn}"`
    dispatch(setTerminalData(terminalData))
  }

  return (
    <Flex width="100%" height="70%" justifyContent="center" alignItems="center" flexWrap="wrap" gap="5%">
      <DragDropContext onDragEnd={handleDragEnd}>
        {boxes.map((element) => (
          <Box key={element} marginTop="10px" display="flex" flexDirection="column" alignItems="center" gap="20px">
            <Text fontSize="25px" fontWeight="700" color="#D3D3D3">
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
                  borderRadius="5px"
                  borderColor="#848d97"
                  padding="10px"
                  gap="5px"
                  height="550px"
                  overflowY="auto"
                  width="450px"
                  overflowX="hidden"
                >
                  {element === 'ToDo' && (
                    <>
                      {todoColumn.map((e, index) => (
                        <Draggable key={e.id} draggableId={e.id.toString()} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <TaskCard key={e.id} data={e} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {todoColumn.length > 0 ? (
                        loaderExtraIssues === 'true' ? (
                          <Loader />
                        ) : (
                          <Box 
                          alignSelf="center"
                          cursor='pointer'
                          borderRadius="50%"
                          _hover={{ bgColor: '#3f4d5b', color: 'white' }}
                          onClick={uploadMoreIssue}
                          style={{ fontSize: '20px' }}>
                            &darr;&darr;&darr;
                          </Box>
                        )
                      ) : null}
                    </>
                  )}
                  {element === 'In Progress' &&
                    progressColumn.map((e, index) => (
                      <Draggable key={e.id} draggableId={e.id.toString()} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TaskCard key={e.id} data={e} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {element === 'Done' &&
                    doneColumn.map((e, index) => (
                      <Draggable key={e.id} draggableId={e.id.toString()} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
