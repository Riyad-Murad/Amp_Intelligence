import "./styles.css";
import axiosBaseUrl from "../../../Axios/axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  BarController,
  LineController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  BarController,
  LineController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const ProviderDashboard = () => {
  return (
    <>
      <div className="provider-dashboard-container">
        <div className="main-content">
          <h1 className="main-content-title section-titles">Dashboard</h1>
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;
