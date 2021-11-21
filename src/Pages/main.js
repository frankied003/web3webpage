import React, { useState, useEffect } from 'react'
import '../Style/main.css'
import etherImage from '../Assets/logo512.png'
import Grid from '@mui/material/Grid';

import SendEtherButton from "../Components/SendEtherComponents/sendEtherButton"
import Clock from '../Components/clock'

export default function Main() {

    return (
        <div>
            <div className="header">
                <img src={etherImage} style={{ width: '5%', height: 'auto' }} />
                <SendEtherButton />
            </div>
            <Grid container spacing={2} style={{ marginTop: '30px' }}>
                <Grid item xs={12} style={{ borderBottom: '5px solid black' }}>
                    <text style={{ fontSize: '30px' }}><b>NFT Collection</b></text>
                </Grid>
            </Grid>
            <div className="footer">
                <Clock />
                <text>Created by <a target="_blank" href="https://twitter.com/frankied_eth">@frankied_eth</a></text>
            </div>
        </div>
    )

}
