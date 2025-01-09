import { useState } from "react"
import { Chart, PieController, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
 Chart.register(...registerables);

const InstructorChart = ({courses}) => {
    const [currentChart,setCurrentChart] = useState("students");

    const getRandomeColor = (numColors) => {
        const colors = [];
        for(let i = 0; i < numColors.length; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
            colors.push(color);

        }
        return colors;

    }

    //create data for student chart
    const chartDataForStudent = {
        labels:courses.map((course) => course.courseName), 
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentsEnrolled),
                backgroundColor: getRandomeColor(courses.length),
            }
        ]
    }
    //create data for income
    const chartDataForIncome = {
        label:courses.map((course)=>course.courseName),
        datasets:[
            {
                data: courses.map((course)=>course.totalAmountGenerated),
                backgroundColor: getRandomeColor(courses.length)
            }
        ]
    }

    //create options
    const options ={

    }

    return (
        <div>
            <h3>Visualize</h3>
            <div>
                <button onClick={()=>setCurrentChart('students')}>Student</button>
                <button onClick={()=>setCurrentChart('income')}>Income</button>
            </div>
            <div>
                <Pie 
                data={currentChart === 'students' ? chartDataForStudent : chartDataForIncome}
                options={options}
                />
            </div>
            <div></div>
        </div>
    )
}
export default InstructorChart