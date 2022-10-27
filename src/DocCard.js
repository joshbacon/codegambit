import './DocCard.css';
import React from 'react';

const DocCard = (props) => {
    // console.log(props);
    const data = props.data;

    return <section id={data.section}>
        <h2>{data.section}</h2>
        {data.methods.map((value, key) => {
            return <div key={key} className='card' id={value.method}>
                <h3>{value.method}</h3>
                <p>parameters: {value.params}</p>
                <br />
                <p>{value.desc}</p>
            </div>
        })}
    </section>
}

export default DocCard;