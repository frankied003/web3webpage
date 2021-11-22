import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nft from './nft'

export default function NftContainer() {

    const [apiResponse, setapiResponse] = useState([]);
    const [errorMessage, seterrorMessage] = useState(null);

    useEffect(() => {
        axios.get("https://api.opensea.io/api/v1/assets?owner=0xbD169b118063c577e8Bba6F3600e547fE950A456&order_direction=desc&offset=0&limit=20")
            .then(res => setapiResponse(res.data.assets))
            .catch(err => seterrorMessage(err));
    }, [])

    return (
        <div className="collectionContainer">
            {apiResponse.map(nftData => (
                <Nft key={nftData.id} data={nftData} />
            ))}
        </div>
    )
}
