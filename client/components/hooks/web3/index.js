import { useHooks } from "../../providers/web3";


const enhanceHooks = (swrResponse) => {
    return {
        ...swrResponse,
        hasInitialResponse: swrResponse.data || swrResponse.error
    }
}

export const useNetwork= () => {
    const swrResponse =  enhanceHooks(useHooks(hooks => hooks.useNetwork)());
    return {
        network:swrResponse
    }
}

export const useAccount = () => {
    const swrResponse =  enhanceHooks(useHooks(hooks => hooks.useAccount)());
    return {
        account:swrResponse
    }
}