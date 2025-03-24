import DocData from '../data/docs.json';

import MethodCategory from '../models/methodcategory';
import LegendCard from '../components/legendcard';
import MethodCategoryCard from '../components/methodcategorycard';
import NavHeader from '../components/header';

function DocumentationPage() {

    const data: MethodCategory[] = DocData;

    return <div className='text-green-700 h-screen overflow-hidden'>
        { NavHeader('documentation') }
        <div className='w-screen h-[calc(100%-5rem)] flex'>
            <div className="h-full min-w-[225px] overflow-y-scroll bg-neutral-900 transition-all duration-500 w-0 opacity-0 lg:w-65 lg:opacity-100">
                <h1 className='font-extrabold text-3xl p-3'>Documentation</h1>
                { data.map((value: MethodCategory, key: number) => LegendCard(value, key)) }
            </div>

            <div className='h-full overflow-y-scroll flex flex-col place-items-center gap-5 w-full pt-5 transition-all duration-500 '>
                { data.map((value: MethodCategory, key: number) => MethodCategoryCard(value, key)) }
            </div>
        </div>
    </div>
}

export default DocumentationPage;