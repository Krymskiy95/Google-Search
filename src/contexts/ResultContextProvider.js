import React, { useContext, useState, createContext } from "react";

const ResultContext = createContext()
const baseUrl = 'https://google-search1.p.rapidapi.com/google-search'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const getResults = async (type) => {
        setIsLoading(true)

        const responce = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'google-search1.p.rapidapi.com',
                'x-rapidapi-key': '3bd50207bbmshd336dda4055792fp1e73dajsna6ed5bbfc45c'
            }
        })

        const data = await responce.json()

        setResults(data)
        setIsLoading(false )
    }
    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => {
    useContext(ResultContext)
}