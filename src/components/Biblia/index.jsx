import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react';
import './style.css';

function Biblia() {
    
    const params = useParams();
    const pasaje = params.cita || params.name || "john 3:16";

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pasaje) return;

        setLoading(true);
        setError(null);

        
        const busqueda = encodeURIComponent(pasaje);

        fetch(`https://bible-api.com/${busqueda}?translation=rvr1960`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se encontró el pasaje "${pasaje}". Intenta con nombres en inglés (ej: john 3:16, genesis 1).`);
                }
                return response.json();
            })
            .then(responseData => {
                setData(responseData);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [pasaje]); 

    if (loading) return <p className="loading">Cargando pasaje...</p>;
    if (error) return <p className="error" style={{ color: 'red' }}>Error: {error}</p>;
    if (!data) return null;

    return (
        <div className="biblia-container">
            <h1>{data.reference}</h1>
            {data.translation_name && (
                <p className="traduccion">Traducción: {data.translation_name}</p>
            )}

            <div className="pasaje-texto">
                {data.verses && data.verses.map((verso) => (
                    <p key={`${verso.chapter}-${verso.verse}`} className="verso">
                        <sup className="num-verso">{verso.verse}</sup> {verso.text}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Biblia;