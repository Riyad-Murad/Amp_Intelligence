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
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const [overviewData, setOverviewData] = useState(null);
  const [powerUsageByClient, setPowerUsageByClient] = useState([]);
  const [voltageDistribution, setVoltageDistribution] = useState([]);
  const [metricsSummary, setMetricsSummary] = useState(null);
  const [totalPowerUsage, setTotalPowerUsage] = useState([]);
  const [averageVoltage, setAverageVoltage] = useState([]);
  const [totalUsers, setTotalUsers] = useState(null);
  const [allMetrics, setAllMetrics] = useState([]);
  const [totalLines, setTotalLines] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const powerByClientChartRef = useRef(null);
  const voltageDistributionChartRef = useRef(null);
  const metricsSummaryChartRef = useRef(null);
  const clientCountChartRef = useRef(null);
  const totalPowerUsageChartRef = useRef(null);
  const averageVoltageChartRef = useRef(null);
};

export default ProviderDashboard;
