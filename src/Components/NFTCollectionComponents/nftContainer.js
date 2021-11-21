import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function NftContainer() {

    const [apiResponse, setapiResponse] = useState(null);
    const [errorMessage, seterrorMessage] = useState(null);

    useEffect(() => {
        axios.get("https://api.opensea.io/api/v1/assets?owner=0xbD169b118063c577e8Bba6F3600e547fE950A456&order_direction=desc&offset=0&limit=20")
            .then(res => setapiResponse(res))
            .catch(err => seterrorMessage(err));
    }, [])

    return (
        <div>
            {/* <text>{apiResponse.assets}</text>
            <text>{errorMessage}</text> */}
        </div>
    )
}
