import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { useRequests } from '../../hooks/useRequests'
import { useEffect, useState, useRef } from 'react'
import { StyledContainerDiv } from './style'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import messageSound from '../../assets/message.mp3'

const Dashboard = () => {
  const { register, handleSubmit, reset } = useForm()
  const { socketState } = useAuth()
  const { getMessagesList, createMessage, getCurrentUserIdRequest } =
    useRequests()
  const navigate = useNavigate()
  const [messageList, setMessageList] = useState([])
  const [submit, setSubmit] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const loadMessagesHistory = async () => {
    const historyChat: any = await getMessagesList()
    setMessageList(historyChat)
  }

  const checkUserAuthenticated = () => {
    const userToken: any = localStorage.getItem('realtimechat:token')
    if (!userToken) {
      toast.warning('Usuário não está logado.', {
        position: 'top-center',
        theme: 'dark',
        pauseOnHover: false,
      })
      navigate('/')
    }
  }

  useEffect(() => {
    loadMessagesHistory()
    checkUserAuthenticated()
    if (socketState) {
      socketState.on('receive_message', (data: any) => {
        setMessageList((current): any => [...current, data])
      })
      return () => socketState.off('receive_message')
    }
  }, [socketState, setMessageList, setSubmit])

  const clearInput = () => {
    reset()
  }

  const onSubmit = async (data: any) => {
    const userToken: any = localStorage.getItem('realtimechat:token')
    const decodedToken: any = jwt_decode(userToken)
    const body = {
      userId: getCurrentUserIdRequest(),
      message: data.message,
      photo: decodedToken.photo,
    }
    if (socketState) {
      socketState.emit('message', data.message)
      createMessage(body)
      setSubmit(true)
      if (audioRef.current) {
        audioRef.current.play()
      }
    }

    setSubmit(false)

    clearInput()
  }

  const reversedMessageList = messageList.slice().reverse()

  return (
    <StyledContainerDiv>
      <div>
        <h1>Bate-Papo ao-vivo</h1>
        <button
          className="logout-button"
          onClick={() => {
            navigate('/')
            localStorage.removeItem('realtimechat:token')
            toast.info('Logout realizado com sucesso!', {
              position: 'top-center',
              theme: 'dark',
            })
          }}
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {messageList ? (
            <>
              {reversedMessageList.map((message: any, index: number) => (
                <p className="paragraph" id={message.userId} key={index}>
                  <div className="profile">
                    <img className="profile-photo" src={message.photo} alt="" />
                    <span>{message.userName}</span>
                  </div>
                  <span className="message-owner">{message.message}</span>
                </p>
              ))}
            </>
          ) : (
            <></>
          )}
        </ul>
        <input
          type="text"
          id="message"
          placeholder="Escreva uma mensagem"
          {...register('message')}
        />
        <button
          type="submit"
          onClick={() => {
            toast.success('Mensagem enviada!', {
              position: 'top-center',
              theme: 'dark',
              autoClose: 2000,
              pauseOnHover: false,
            })
          }}
        >
          Enviar mensagem
        </button>
      </form>
      <audio ref={audioRef} src={messageSound} />
    </StyledContainerDiv>
  )
}

export { Dashboard }
