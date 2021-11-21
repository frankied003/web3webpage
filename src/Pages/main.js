import React, { useState, useEffect } from 'react'
import '../Style/main.css'
import etherImage from '../Assets/logo512.png'
import Grid from '@mui/material/Grid';

import SendEtherButton from "../Components/SendEtherComponents/sendEtherButton"
import Clock from '../Components/clock'
import NftContainer from '../Components/NFTCollectionComponents/nftContainer';

export default function Main() {

    return (
        <div>
            <div className="header">
                <text style={{ fontSize: '40px' }}>Frankied.eth</text>
                <SendEtherButton />
            </div>
            <div className="openSeaContainer">
                <text style={{ fontSize: '30px' }}>NFT Collection</text>
                <div style={{ border: "4px solid black", marginTop: '5px' }} />
                <NftContainer />
            </div>
            <div className="footer">
                <Clock />
                <text>Created by <a target="_blank" href="https://twitter.com/frankied_eth">@frankied_eth</a></text>
            </div>
        </div>
    )

}
