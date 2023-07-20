

const UserCard = (data) => {

    data = data.data;
    const age = data.created.split(' ')[0];

    return <div className='userCard'>
        <h2>{data.username}</h2>
        <h3>member since {age}</h3>
        <div className='gameSection'>
            <div className='played section'>
                <p className='result'>23</p>
                <p>games played</p>
            </div>
            <div className='won section'>
                <p className='result'>23</p>
                <p>games won</p>
            </div>
            <div className='winRate section'>
                <p className='result'>52%</p>
                <p>win rate</p>
            </div>
        </div>
        <div className='lessonSection'>
            <p className='result'>12</p>
            <p>Lessons completed</p>
        </div>
        <p>{`${data.id}, ${data.email}, ${data.created}`}</p>
        <div><p>make this a place to write scripts to do stuff
            then they can just startGame() then do london() and it does x many moves according to their logic</p></div>
    </div>
}

export default UserCard;