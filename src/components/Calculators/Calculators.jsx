import React, {useEffect} from 'react'
import Reversal from './Reversal';
import OptionPrice from './OptionPrice';
import NiftyRange from './NiftyRange';
import Camarilla from './Camarilla';

const Calculators = () => {
    const openTab1 = ()=>{
        const option1 = document.querySelector('#option1');
        const option2 = document.querySelector('#option2');
        const option3 = document.querySelector('#option3');
        const option4 = document.querySelector('#option4');

        const active = ['bg-indigo-500', 'ring', 'ring-indigo-300'];

        option1.classList.remove('bg-indigo-300')
        option1.classList.add(...active)
        option2.classList.remove(...active)
        option2.classList.add('bg-indigo-300')
        option3.classList.remove(...active)
        option3.classList.add('bg-indigo-300')
        option4.classList.remove(...active)
        option4.classList.add('bg-indigo-300')

        const tab1 = document.getElementById('tab1');
        const tab2 = document.getElementById('tab2');
        const tab3 = document.getElementById('tab3');
        const tab4 = document.getElementById('tab4');

        tab1.classList.remove('hidden');
        tab1.classList.add('animate__zoomInDown');
        tab2.classList.add('hidden');
        tab2.classList.remove('animate__zoomInDown');
        tab3.classList.add('hidden');
        tab3.classList.remove('animate__zoomInDown');
        tab4.classList.add('hidden');
        tab4.classList.remove('animate__zoomInDown');
    }
    const openTab2 = ()=>{
        const option1 = document.querySelector('#option1');
        const option2 = document.querySelector('#option2');
        const option3 = document.querySelector('#option3');
        const option4 = document.querySelector('#option4');

        const active = ['bg-indigo-500', 'ring', 'ring-indigo-300'];

        option2.classList.remove('bg-indigo-300')
        option2.classList.add(...active)
        option1.classList.remove(...active)
        option1.classList.add('bg-indigo-300')
        option3.classList.remove(...active)
        option3.classList.add('bg-indigo-300')
        option4.classList.remove(...active)
        option4.classList.add('bg-indigo-300')

        const tab1 = document.getElementById('tab1');
        const tab2 = document.getElementById('tab2');
        const tab3 = document.getElementById('tab3');
        const tab4 = document.getElementById('tab4');

        tab1.classList.add('hidden');
        tab2.classList.remove('hidden');
        tab2.classList.add('animate__zoomInDown');
        tab3.classList.add('hidden');
        tab3.classList.remove('animate__zoomInDown');
        tab4.classList.add('hidden');
        tab4.classList.remove('animate__zoomInDown');
    }
    const openTab3 = ()=>{
        const option1 = document.querySelector('#option1');
        const option2 = document.querySelector('#option2');
        const option3 = document.querySelector('#option3');
        const option4 = document.querySelector('#option4');

        const active = ['bg-indigo-500', 'ring', 'ring-indigo-300'];

        option3.classList.remove('bg-indigo-300')
        option3.classList.add(...active)
        option1.classList.remove(...active)
        option1.classList.add('bg-indigo-300')
        option2.classList.remove(...active)
        option2.classList.add('bg-indigo-300')
        option4.classList.remove(...active)
        option4.classList.add('bg-indigo-300')

        const tab1 = document.getElementById('tab1');
        const tab2 = document.getElementById('tab2');
        const tab3 = document.getElementById('tab3');
        const tab4 = document.getElementById('tab4');

        tab1.classList.add('hidden');
        tab1.classList.remove('animate__zoomInDown');
        tab2.classList.add('hidden');
        tab2.classList.remove('animate__zoomInDown');
        tab3.classList.remove('hidden');
        tab3.classList.add('animate__zoomInDown');
        tab4.classList.add('hidden');
        tab4.classList.remove('animate__zoomInDown');
    }
    const openTab4 = ()=>{
        const option1 = document.querySelector('#option1');
        const option2 = document.querySelector('#option2');
        const option3 = document.querySelector('#option3');
        const option4 = document.querySelector('#option4');

        const active = ['bg-indigo-500', 'ring', 'ring-indigo-300'];

        option4.classList.remove('bg-indigo-300')
        option4.classList.add(...active)
        option1.classList.remove(...active)
        option1.classList.add('bg-indigo-300')
        option2.classList.remove(...active)
        option2.classList.add('bg-indigo-300')
        option3.classList.remove(...active)
        option3.classList.add('bg-indigo-300')

        const tab1 = document.getElementById('tab1');
        const tab2 = document.getElementById('tab2');
        const tab3 = document.getElementById('tab3');
        const tab4 = document.getElementById('tab4');

        tab1.classList.add('hidden');
        tab2.classList.add('hidden');
        tab3.classList.add('hidden');
        tab4.classList.remove('hidden');
        tab4.classList.add('animate__zoomInDown');
    }
    useEffect(() => {
        openTab1();
    }, [])
    return (
        <>
            <div className="container mx-auto relative">
                <div className='container mx-auto bg-white rounded-full h-12 flex items-center mt-4' style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                    <ul className='flex flex-row justify-between items-center px-5 md:px-12 lg:px-28 w-full'>
                        <li id='option1' onClick={openTab1} className='cursor-pointer select-none bg-indigo-300 text-white p-2 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all duration-300 ring-offset-1'>Reversal</li>
                        <li id='option2' onClick={openTab2} className='cursor-pointer select-none bg-indigo-300 text-white p-2 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all duration-300 ring-offset-1'>OptionPrice</li>
                        <li id='option3' onClick={openTab3} className='cursor-pointer select-none bg-indigo-300 text-white p-2 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all duration-300 ring-offset-1'>NiftyRange</li>
                        <li id='option4' onClick={openTab4} className='cursor-pointer select-none bg-indigo-300 text-white p-2 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all duration-300 ring-offset-1'>Camarilla</li>
                    </ul>
                </div>
                <div className="container mx-auto mt-5 transition-all duration-300">
                    <div id='tab1' className="container mx-auto absolute animate__animated animate__zoomInDown">
                        <Reversal/>
                    </div>
                    <div id='tab2' className="container mx-auto absolute hidden animate__animated animate__zoomInDown">
                        <OptionPrice />
                    </div>
                    <div id='tab3' className="container mx-auto absolute hidden animate__animated animate__zoomInDown">
                        <NiftyRange />
                    </div>
                    <div id='tab4' className="container mx-auto absolute hidden animate__animated animate__zoomInDown">
                        <Camarilla />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculators
