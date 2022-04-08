import { createContext, useContext, useEffect, useState, useMemo } from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import {setUpHooks} from './hooks/setUpHooks';
import swal from 'sweetalert';
const Web3Context = createContext(null);


export const Web3Provider = ({children}) => {

    const [web3Api, setWeb3Api] = useState({
        provider:null,
        web3:null, 
        contract:null,
        isLoading:true,
        hooks: setUpHooks()
    })

    useEffect(() => {
        const loadProvider = async() => {
            const provider = await detectEthereumProvider();
            if(provider){
                const web3 = new Web3(provider);
                setWeb3Api({
                    provider,
                    web3,
                    contract:null,
                    isLoading:false,
                    hooks: setUpHooks(web3, provider)
                });

            } else{
                setWeb3Api(api => ({...api, isLoading:false}));
                console.error("Install Metamask to use our decentralized platform features. Install Metamask at https://metamask.io/")
            }

        }

        loadProvider();
    }, [])


    const _web3Api = useMemo(() => {
        const {web3, provider} = web3Api
        return{
            ...web3Api,
            isWeb3Loaded: web3 != null,
            connectTest: () => console.log("Trying to Connect"),
            test: () => console.log("Hello World"),
            connect: provider ? async () => {
                try{
                    await provider.request({method:"eth_requestAccounts"});
                }catch{
                    location.reload()
                }
            } : () => console.error("Cannot connect to Metmask, Try to reload the browser please.")
        }

    }, [web3Api])

    return(
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3 = () => {
    return useContext(Web3Context)
}


export const useHooks = (cb) => {
    const {hooks} = useWeb3();
    return cb(hooks);
}