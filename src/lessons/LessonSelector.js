import './LessonSelector.css';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LessonData from './lessons.json';

// check here to change the css
// https://github.com/reactjs/react-tabs

// need to set some constant sizing
// make it a list with some items having checkmarks and others... well not
// have individual progress bars for each section
// need actual lessons to fill the data with
// hopefully need to implement scrolling cause there will be so many
// make the list items actual buttons to bring the user to the lesson page

const LessonSelector = (props) => {

    let complete = 90;
    let styleProg = {
        width: complete+"px"
    };

    return <div className='lessonSelector'>
        <div className='titleBar'>
            <h2>Josh Bacon</h2>
            <div className='totalProgress'>
                <h3>Total Progress: </h3>
                <div className='progressBar'>
                    <div className='progress' style={styleProg}/>
                </div>
            </div>
        </div>
        <Tabs>
            <TabList>
                <Tab>All</Tab>
                <Tab>General</Tab>
                <Tab>Openings</Tab>
                <Tab>Endgames</Tab>
            </TabList>

            <TabPanel>{LessonData.map((value, key) => {
                return <div key={key}>{value.title} [{value.category}] ({value.rating})</div>
            })}</TabPanel>

            <TabPanel>{LessonData.filter(value => {return value.category === "General"}).map((value, key) => {
                return <div key={key}>{value.title} ({value.rating})</div>
            })}</TabPanel>

            <TabPanel>{LessonData.filter(value => {return value.category === "Opening"}).map((value, key) => {
                return <div key={key}>{value.title} ({value.rating})</div>
            })}</TabPanel>

            <TabPanel>{LessonData.filter(value => {return value.category === "Endgame"}).map((value, key) => {
                return <div key={key}>{value.title} ({value.rating})</div>
            })}</TabPanel>
        </Tabs>
    </div>
}

export default LessonSelector;