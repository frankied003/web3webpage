import React, { useState, useEffect } from 'react'
import '../../Style/main.css'

export default function Nft(props) {

    const [hoverActive, sethoverActive] = useState(false);

    return (
        <div className="nftContainer" onMouseEnter={() => sethoverActive(true)} onMouseLeave={() => sethoverActive(false)}>
            <img src={props.data.image_url} className="nftImage" />
            <div className={"nftOverlay"} style={hoverActive ? { maxHeight: '10em' } : { maxHeight: '1em' }}>
                <div className="nftHeader" >
                    <p>{props.data.name}</p>
                    <a target="_blank" href={props.data.permalink} style={{ color: "white" }}>Opensea</a>
                </div>
                <p className={"overlayText"}>
                    <br />{props.data.description ? props.data.description : "No description"}
                </p>
            </div>
        </div>
    )
}
