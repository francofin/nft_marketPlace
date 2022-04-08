import {useEffect} from 'react';
import useSWR from 'swr';

const handleAccounts = (web3, provider) => () => {

    // const [account, setAccount] = useState(null);

    //keccak 256 hex version of address.

    const adminAddresses = {
        "0x126287428687ca7f0e3cba129ee466ec2ca7c55c75728dd6938e146b7f2562b4":true
    }

    const {data, mutate, ...rest} = useSWR(() => 
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts();
            return accounts[0]
        }
    )


    useEffect(() => {
        // window.ethereum && window.ethereum.on("accountsChanged", (accounts) => setAccount(accounts[0] ?? null));
        provider && provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null))

    }, [provider])

    return {
        data,
        isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate,
        ...rest
    }
};

export {
    handleAccounts,
    
};


//swr is used for state management