import { useState } from 'react'

const Home: React.FC = () => {
    const [roomId, setRoomId] = useState(0)
    const [inputRoomId, setInputRoomId] = useState('')

    async function onCreateRoom() {
        const res = await fetch('/room/create')
        const data = await res.json()
        setRoomId(data.result.roomId)
    }

    function onInputRoomIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputRoomId(e.target.value)
    }

    function onEnterRoom() {
        location.href = `/room/${inputRoomId}`
    }

    return (
        <div className="home">
            <div>
                Input rome id: <input value={inputRoomId} onChange={onInputRoomIdChange} />
                <button onClick={onEnterRoom}>Enter Room</button>
            </div>
            <div>
                Input token: <input />
                <button onClick={onCreateRoom}>Create Room</button>
            </div>
            {
                Boolean(roomId) && <div>
                    Room Id: { roomId }
                    <a href={`/room/${roomId}`} style={{ marginLeft: 20 }}>Enter</a>
                </div>
            }
        </div>
    )
}

export default Home
