import { useState, useEffect } from 'react'
import { Input } from 'antd'

const { Search } = Input

const Home: React.FC = () => {
    const [roomId, setRoomId] = useState(0)

    useEffect(() => {
        getRoomList()
    }, [])

    async function getRoomList() {
        console.log('get room list in here')
    }

    async function onCreateRoom() {
        const res = await fetch('/room/create')
        const data = await res.json()
        setRoomId(data.result.roomId)
    }

    function onEnterRoom(value: string) {
        location.href = `/room/${value}`
    }

    return (
        <div className="home" style={{ padding: 20 }}>
            <div style={{ marginBottom: 12 }}>
                <Search placeholder="input room id" style={{ width: 400, marginRight: 20 }} enterButton="Enter Room" onSearch={onEnterRoom} />
                <Search placeholder="input ac token" style={{ width: 400, marginRight: 20 }} enterButton="Create Room" onSearch={onCreateRoom} />
                {
                    Boolean(roomId) && <span>
                        Room ID: { roomId }
                        <a href={`/room/${roomId}`} style={{ marginLeft: 20 }}>Enter</a>
                    </span>
                }
            </div>
        </div>
    )
}

export default Home
