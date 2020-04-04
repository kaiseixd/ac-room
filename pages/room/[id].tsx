import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('/room')

const Home: React.FC = () => {
    useEffect(() => {
        socket
    }, [])

    return (
        <h1>Hello world!</h1>
    )
}

export default Home

