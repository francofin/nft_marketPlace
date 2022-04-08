import { useEffect } from 'react';
import useSWR from 'swr';

const NETWORKS = {
    1:"Ethereum",
    3:"Ropsten",
    4:"Rinkeby",
    5: "Gowrli",
    42:"Kovantis",
    56:"Binance",
    1337:"Ganache"
}

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHIAN_ID]

const handleNetwork = (web3, provider) => () => {

   const {data, mutate, ...rest} = useSWR(() => 
        web3 ? "web3/network" : null, 
        async () => {
           const chainID =  await web3.eth.getChainId();
           return NETWORKS[chainID]
        }
    )

    useEffect(() => {
        provider && provider.on("chainChanged", chainId => mutate(NETWORKS[parseInt(chainId, 16)]))
    }, [web3])


    return {
        data,
        mutate,
        target:targetNetwork,
        isSupported:data === targetNetwork,
        ...rest
    }
}

export {
    handleNetwork,
}