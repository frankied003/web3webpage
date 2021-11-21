import React, { useState, useEffect } from 'react'
import '../../Style/main.css'
import Web3 from 'web3'

export default function SendEtherButton() {

    const [buttonText, setbuttonText] = useState("Connect to Metamask")
    const [connectedAccount, setconnectedAccount] = useState(null)
    const [etherAmount, setetherAmount] = useState(0.000)
    const [errorMessage, seterrorMessage] = useState(null)
    const [transactionSending, settransactionSending] = useState(false)
    const [succesfullySent, setsuccesfullySent] = useState(false)

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    setconnectedAccount(result[0]);
                    window.ethereum.request({ method: 'eth_chainId' }).then(chain => {
                        setbuttonText('Send ether');
                    })
                })
                .catch(error => {
                    seterrorMessage(error.message);
                });

        } else {
            seterrorMessage('Install MetaMask');
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
                        to: '0xbD169b118063c577e8Bba6F3600e547fE950A456', // My main account
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
                setbuttonText("Send ether");
                console.log(etherAmount.toString())
                seterrorMessage('Error sending');
            });
    }

    // listen for account and chain changes
    window.ethereum.on('accountsChanged', (newAccount) => setconnectedAccount(newAccount));

    return (
        <div className="sendEtherContainer">
            <div className='buttonContainer'>
                {connectedAccount
                    ? (
                        <button className={'giveMeButton'} disabled={transactionSending || succesfullySent} onClick={() => sendEther()}>
                            <text>{buttonText}</text>
                        </button>
                    )
                    : (
                        <button className={'giveMeButton'} disabled={transactionSending || succesfullySent} onClick={() => connectWalletHandler()}>
                            <text>{buttonText}</text>
                        </button >
                    )
                }
            </div>
            {connectedAccount
                ? (
                    <div class="number">
                        <button class="minus" onClick={() => changeEtherAmount(false)}>
                            <text>-</text>
                        </button>
                        <input type="text" value={etherAmount} onChange={manualSetEther} />
                        <button class="plus" onClick={() => changeEtherAmount(true)}>
                            <text>+</text>
                        </button>
                    </div>
                )
                : null
            }
            {errorMessage
                ? (
                    <text style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</text>
                )
                : null
            }
        </div>
    )
}