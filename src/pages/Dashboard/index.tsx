import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { useRequests } from '../../hooks/useRequests'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const { register, handleSubmit, reset } = useForm()
  const { socketState } = useAuth()
  const {
    getCurrentUserRequest,
    getMessagesList,
    createMessage,
    getCurrentUserIdRequest,
  } = useRequests()
  const [messageList, setMessageList] = useState([])

  const loadMessagesHistory = async () => {
    const historyChat: any = await getMessagesList()
    setMessageList(historyChat)
    console.log(historyChat)
    console.log(messageList)
  }
  useEffect(() => {
    loadMessagesHistory()
    if (socketState) {
      socketState.on('receive_message', (data: any) => {
        console.log(data)
        setMessageList((current): any => [...current, data])
      })
      return () => socketState.off('receive_message')
    }
  }, [socketState, setMessageList])

  const clearInput = () => {
    reset()
  }

  const onSubmit = async (data: any) => {
    const body = {
      userId: getCurrentUserIdRequest(),
      message: data.message,
    }
    if (socketState) {
      socketState.emit('message', data.message)
      createMessage(body)
    }

    clearInput()
  }

  return (
    <div>
      <h1>Mensagens</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" id="message" {...register('message')} />
        <button type="submit">Enviar mensagem</button>
      </form>
      <ul>
        {messageList ? (
          <>
            {messageList.map((message: any, index) => (
              <p key={index}>
                {message.userName}: {message.message}:
              </p>
            ))}
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export { Dashboard }
