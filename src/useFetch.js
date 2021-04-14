import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(res=> {
        if(!res.ok) {
          throw Error('Could not fetch data for that resource')
        }
        return res.json()
      })
      .then(resData => {
        setData(data => data = resData)
        setIsPending(isPending => isPending = false)
        setError(error => error = '')
      })
      .catch(err => {
        if(err.name === 'AbortError') return
        setError(error => error = err.message)
        setIsPending(isPending => isPending = false)
      })

    return () => abortCont.abort()
  }, [url])

  return {data, isPending, error}
}

export default useFetch