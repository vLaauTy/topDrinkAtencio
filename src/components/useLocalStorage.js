import { useState} from 'react';


const useLocalStorage = (key, initialValue) =>{
    const [storageValue, setStoragevalue] = useState(() =>{
        try{    
            // vericando si la key ya existe en el localstorage
            const value = window.localStorage.getItem(key);
            if (value){
                return JSON.parse(value);
            }else{
                return initialValue
            }
        }catch(e){
            console.log(e)
            return initialValue;
        }
    });

    const setLocalStorage = (value) =>{
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
            setStoragevalue(value);
            console.log("set local storage "+ window.localStorage.getItem(key))
        } catch (error) {
            console.log(error)
        }
    }

    return [storageValue, setLocalStorage];

}

export default useLocalStorage;