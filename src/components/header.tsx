import { Link } from 'react-router-dom';
import backIcon from '../assets/icons/back.svg';

function NavHeader(from: string) {

    return <header className='text-green-700 w-full h-20 min-h-20 flex justify-center place-items-center bg-neutral-950'>
        <Link
            to="../"
            state={{from: from}}
            className='absolute left-4'
        >
            <img src={backIcon} className="w-14" />
        </Link>
        <h1 className='text-3xl font-semibold'>
            _codegambit
        </h1>
    </header>
}

export default NavHeader;