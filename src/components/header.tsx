import { useNavigate, useLocation, Link } from 'react-router-dom';
import backIcon from '../assets/icons/back.svg';
import docsIcon from '../assets/icons/docs.svg';

function NavHeader() {
    const navigate = useNavigate();
    const location = useLocation();

    return <header className='text-green-700 w-full h-20 min-h-20 flex justify-center place-items-center bg-neutral-950'>
        <button
            onClick={() => navigate(-1)}
            className='absolute left-4 cursor-pointer'
        >
            <img src={backIcon} className="w-14" />
        </button>
        <h1 className='text-3xl font-semibold'>
            _codegambit
        </h1>
        <Link
            to="../documentation"
            className={`absolute right-4${location.pathname == '/documentation' ? ' hidden' : ''}`}
        >
            <img src={docsIcon} className="w-14" />
        </Link>
    </header>
}

export default NavHeader;