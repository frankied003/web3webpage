import React, { useState, useEffect } from 'react'
import '../../Style/main.css'

export default function Nft(props) {
    return (
        <div className="nftContainer">
            <img src={props.data.image_url} className="nftImage" />
            <div>

            </div>
        </div>
    )
}
