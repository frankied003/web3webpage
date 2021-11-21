import React, { useState, useEffect } from 'react'
import moment from 'moment'

export default function Clock() {

    const [time, settime] = useState('00:00:00 AM');

    useEffect(() => {
        const intervalId = setInterval(() => {
            settime(moment().format("HH:mm:ss"))
        }, 500)
        return () => clearInterval(intervalId);
    }, [time])

    return (
        <text>{time}</text>
    )
}
