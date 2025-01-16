import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses = [] }) => {
    const [currentChart, setCurrentChart] = useState("students");

    const getRandomeColor = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            colors.push(color);
        }
        return colors;
    };

    const chartDataForStudent = {
        labels: courses?.map((course) => course.courseName) || [],
        datasets: [
            {
                data: courses?.map((course) => course.totalStudentsEnrolled) || [],
                backgroundColor: getRandomeColor(courses?.length || 0),
            },
        ],
    };

    const chartDataForIncome = {
        labels: courses?.map((course) => course.courseName) || [],
        datasets: [
            {
                data: courses?.map((course) => course.totalAmountGenerated) || [],
                backgroundColor: getRandomeColor(courses?.length || 0),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="bg-[#161515] w-full lg:w-[70%] my-4 p-10">
            <h3 className="text-white text-xl mb-4">Visualize</h3>
            <div className="flex gap-10 my-4">
                <button
                    className={`px-7 py-2 ${currentChart === "students" ? "bg-gray-800" : "bg-transparent"} border-2 border-gray-800 rounded hover:scale-95 transition-all duration-200`}
                    onClick={() => setCurrentChart("students")}
                >
                    Students
                </button>
                <button
                    className={`px-7 py-2 ${currentChart === "income" ? "bg-gray-800" : "bg-transparent"} border-2 border-gray-800 rounded hover:scale-95 transition-all duration-200`}
                    onClick={() => setCurrentChart("income")}
                >
                    Income
                </button>
            </div>
            <div className="h-[400px]">
                <Pie
                    data={currentChart === "students" ? chartDataForStudent : chartDataForIncome}
                    options={options}
                />
            </div>
        </div>
    );
};

export default InstructorChart;
