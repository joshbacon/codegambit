import { Link } from 'react-router-dom';
import backIcon from '../assets/icons/back.svg';

import DocData from '../data/docs.json';

import MethodCategory from '../models/methodcategory';
import LegendCard from '../components/legendcard';
import MethodCategoryCard from '../components/methodcategorycard';

function DocumentationPage() {

    const data: MethodCategory[] = DocData;

    return <div className='text-green-700 h-screen overflow-hidden'>
        <header className='absolute z-20 w-full flex justify-center place-items-center bg-neutral-950 h-20'>
            <Link to="../" className='absolute left-4'>
                <img src={backIcon} className="w-14" />
            </Link>
            <h1 className='text-3xl font-semibold'>
                _codegambit
            </h1>
        </header>
        <div className='flex w-full h-full relative mt-20'>
            <div className='bg-neutral-900 transition-all duration-500 w-0 opacity-0 lg:w-65 lg:opacity-100'>
                <div className="w-full">
                    <h1 className='font-extrabold text-3xl p-3'>Documentation</h1>
                    { data.map((value: MethodCategory, key: number) => LegendCard(value, key)) }
                </div>
            </div>

            <div className='flex flex-col place-items-center gap-5 w-full overflow-scroll pt-5 transition-all duration-500 '>
                { data.map((value: MethodCategory, key: number) => MethodCategoryCard(value, key)) }
            </div>
        </div>
    </div>
}

export default DocumentationPage;