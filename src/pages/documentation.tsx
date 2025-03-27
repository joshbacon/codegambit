import DocData from '../data/docs.json';

import CommandCategory from '../models/commandcategory';
import LegendCard from '../components/legendcard';
import MethodCategoryCard from '../components/commandcategorycard';
import NavHeader from '../components/header';

function DocumentationPage() {

    const data: CommandCategory[] = DocData;

    return <div className='text-green-700 h-screen overflow-hidden'>
        { NavHeader('documentation') }
        <div className='w-screen h-[calc(100%-5rem)] flex'>
            <div className="h-full  overflow-y-scroll bg-neutral-900 transition-all duration-500 w-0 opacity-0 lg:w-65 lg:min-w-[230px] lg:opacity-100">
                <h1 className='font-extrabold text-3xl p-3'>Documentation</h1>
                { data.map((value: CommandCategory, key: number) => LegendCard(value, key)) }
            </div>

            <div className='h-full overflow-y-scroll flex flex-col place-items-center gap-5 w-full pt-5 transition-all duration-500 '>
                { data.map((value: CommandCategory, key: number) => MethodCategoryCard(value, key)) }
            </div>
        </div>
    </div>
}

export default DocumentationPage;