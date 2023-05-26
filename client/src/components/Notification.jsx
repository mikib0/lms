import { AiOutlineCheck } from 'react-icons/ai'
import { Notification } from '@mantine/core'

export default function({ title, message, hidden, onClose }){
return (
  <Notification
    onClose={onClose}
    sx={{ position: 'absolute', right: 50, bottom: 100 }}
    display={hidden ? 'none' : 'flex'}
    icon={<AiOutlineCheck size='1.1rem' />}
    color='teal'
    title={title}>
    {message}
  </Notification>
);}