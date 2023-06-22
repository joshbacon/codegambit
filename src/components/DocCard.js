import '../styles/DocCard.css';
import React from 'react';

const DocCard = (props) => {
    const data = props.data;

    return <section id={data.section} className='doc-section'>
        <h2 className='section-title'>{data.section}</h2>
        {data.methods.map((value, key) => {
            return <div key={key} className='method-card' id={value.method}>
                <h3>{value.method}</h3>
                <p>parameters: {value.params}</p>
                <p>example: {value.example}</p>
                <br />
                <p>{value.desc}</p>
            </div>
        })}
    </section>
}

export default DocCard;