import { useHooks } from "../providers/web3";
import useSWR from 'swr';


const URL = "https://api.coingecko.com/api/v3/coins/ethereum?localization=false"
export const useEthPrice = () => {
    const swrRes = useSWR(() => {
        
    })
}