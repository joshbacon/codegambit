import './DocCard.css';

const DocCard = (props) => {
    let method = props.method;
    console.log(method);
    
    return <div className='card'>
        {method.method}
    </div>
}

export default DocCard;