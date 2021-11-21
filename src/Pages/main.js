import React, { useState, useEffect } from 'react'
import '../Style/main.css'
import { Grid } from '@mui/material'
import Web3 from 'web3'

export default function Main() {

    const [buttonText, setbuttonText] = useState("Connect to Metamask")
    const [connectedAccount, setconnectedAccount] = useState(null)
    const [chain, setchain] = useState(null)
    const [etherAmount, setetherAmount] = useState(0.000)
    const [errorMessage, seterrorMessage] = useState(null)
    const [transactionSending, settransactionSending] = useState(false)
    const [succesfullySent, setsuccesfullySent] = useState(false)

    const chainToStringDict = {
        '0x1': "Mainet",
        '0x3': "Ropsten Test Network",
        '0x4': "Rinkeby Test Network",
        '0x5': "Goerli Test Network",
        '0x2a': "Kovan Test Network"
    }

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    setconnectedAccount(result[0]);
                    window.ethereum.request({ method: 'eth_chainId' }).then(chain => {
                        setchain(chainToStringDict[chain]);
                        setbuttonText('Pay my tuition');
                    })
                })
                .catch(error => {
                    seterrorMessage(error.message);
                });

        } else {
            seterrorMessage('Please install MetaMask browser extension to pay for my tuition');
        }
    }

    const changeEtherAmount = (positive) => {
        var newEtherAmount = etherAmount;
        if (positive) {
            newEtherAmount = etherAmount + 0.01;
        }
        else {
            if (etherAmount > 0) {
                newEtherAmount = etherAmount - 0.01;
            }
        }
        newEtherAmount = Number(Number(newEtherAmount).toFixed(3));
        setetherAmount(newEtherAmount);
    }

    const manualSetEther = (e) => {
        if (!Number(e.target.value)) {
            return;
        }
        else {
            setetherAmount(e.target.value)
        }
    }

    const sendEther = () => {
        settransactionSending(true);
        setbuttonText("Sending...")
        window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: '0xbD169b118063c577e8Bba6F3600e547fE950A456', // Account 1
                        value: parseInt(Web3.utils.toWei(etherAmount.toString(), "ether")).toString(16)
                    },
                ],
            })
            .then(() => {
                settransactionSending(false);
                setsuccesfullySent(true);
                setbuttonText("Sent, thank you!");
                seterrorMessage(null);
            })
            .catch((error) => {
                settransactionSending(false);
                setbuttonText("Pay my tuition");
                console.log(etherAmount.toString())
                seterrorMessage(error.message);
            });
    }


    // listen for account and chain changes
    window.ethereum.on('accountsChanged', (newAccount) => setconnectedAccount(newAccount));
    window.ethereum.on('chainChanged', (chainId) => setchain(chainToStringDict[chainId]));

    return (
        <div>
            <Grid container spacing={2}>
                <Grid container item justifyContent="center" textAlign="center" alignContent="center" xs={12}>
                    <text>This ethereum will be going towards my tuition</text>
                </Grid>
                {connectedAccount
                    ? (
                        <Grid container item spacing={1} justifyContent="center" textAlign="center" alignContent="center" xs={12}>
                            <Grid item xs={12}>
                                <text style={{ color: 'green' }}>Connected Account: <b>{connectedAccount}</b></text>
                            </Grid>
                            <Grid item xs={12}>
                                <text style={{ color: 'green' }}>Connected Chain: <b>{chain}</b></text>
                            </Grid>
                            <Grid item xs={12}>
                                <div class="number">
                                    <div class="minus" onClick={() => changeEtherAmount(false)}>
                                        <text>-</text>
                                    </div>
                                    <input type="text" value={etherAmount} onChange={manualSetEther} />
                                    <div class="plus" onClick={() => changeEtherAmount(true)}>
                                        <text>+</text>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    )
                    : null
                }
                {connectedAccount
                    ? (
                        <Grid container item justifyContent="center" alignContent="center" xs={12}>
                            <button className={'giveMeButton'} disabled={transactionSending || succesfullySent} onClick={() => sendEther()}>
                                <text>{buttonText}</text>
                            </button>
                        </Grid>
                    )
                    : (
                        <Grid container item position="relative" spacing={1} justifyContent="center" textAlign="center" alignContent="center" xs={12}>
                            <button className={'giveMeButton'} disabled={transactionSending || succesfullySent} onClick={() => connectWalletHandler()}>
                                <text>{buttonText}</text>
                            </button >
                        </Grid>
                    )
                }
                {errorMessage
                    ? (
                        <Grid container item justifyContent="center" textAlign="center" alignContent="center" xs={12}>
                            <text style={{ color: 'red' }}>{errorMessage}</text>
                        </Grid>
                    )
                    : null
                }
            </Grid>
        </div>
    )
}
