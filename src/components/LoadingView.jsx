import React, { useEffect, useState } from 'react'
import Loading from './Loading'

export default function LoadingView({children}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if(loading) return <Loading/>

    return <>{children}</>
}
