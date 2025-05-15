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

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(toggleLoad(true));
      setLoading(true);
      setError(null);
      try {
        const overviewResponse = await axiosBaseUrl.get(
          `/providers/overview/${userId}`
        );
        setOverviewData(overviewResponse.data.data);

        const powerByClientResponse = await axiosBaseUrl.get(
          `/providers/powerUsageByClient/${userId}`
        );
        setPowerUsageByClient(powerByClientResponse.data.data);

        const voltageDistributionResponse = await axiosBaseUrl.get(
          `/providers/voltageDistribution/${userId}`
        );
        const voltageData = voltageDistributionResponse.data.data.map(
          (v) => v.voltage
        );
        const voltageCounts = {};
        voltageData.forEach((v) => {
          const roundedVoltage = Math.round(v);
          voltageCounts[roundedVoltage] =
            (voltageCounts[roundedVoltage] || 0) + 1;
        });
        setVoltageDistribution(
          Object.entries(voltageCounts).sort(
            (a, b) => parseInt(a[0]) - parseInt(b[0])
          )
        );

        const metricsSummaryResponse = await axiosBaseUrl.get(
          `/providers/metricsSummary/${userId}`
        );
        setMetricsSummary(metricsSummaryResponse.data.data);

        const totalPowerUsageResponse = await axiosBaseUrl.get(
          `/providers/totalPowerUsage/${userId}`
        );
        setTotalPowerUsage(
          Array.isArray(totalPowerUsageResponse?.data?.data)
            ? totalPowerUsageResponse.data.data
            : []
        );

        const averageVoltageResponse = await axiosBaseUrl.get(
          `/providers/averageVoltage/${userId}`
        );
        setAverageVoltage(
          Array.isArray(averageVoltageResponse?.data?.data)
            ? averageVoltageResponse.data.data
            : []
        );

        const usersResponse = await axiosBaseUrl.get(
          `/providers/getAllUsers/${userId}`
        );
        setTotalUsers(usersResponse?.data?.data?.length);

        const allMetricsResponse = await axiosBaseUrl.get(
          `/providers/getAllMetrics/${userId}`
        );
        setAllMetrics(
          Array.isArray(allMetricsResponse?.data?.data)
            ? allMetricsResponse.data.data
            : []
        );

        const linesResponse = await axiosBaseUrl.get(
          `/providers/getAllLines/${userId}`
        );
        setTotalLines(usersResponse?.data?.data?.length);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data for charts");
        console.error("Error fetching dashboard data for charts:", err);
      } finally {
        setLoading(false);
        dispatch(toggleLoad(false));
      }
    };

    fetchDashboardData();

    return () => {
      if (powerByClientChartRef.current) {
        powerByClientChartRef.current.destroy();
      }
      if (voltageDistributionChartRef.current) {
        voltageDistributionChartRef.current.destroy();
      }
      if (metricsSummaryChartRef.current) {
        metricsSummaryChartRef.current.destroy();
      }
      if (clientCountChartRef.current) {
        clientCountChartRef.current.destroy();
      }
      if (totalPowerUsageChartRef.current) {
        totalPowerUsageChartRef.current.destroy();
      }
      if (averageVoltageChartRef.current) {
        averageVoltageChartRef.current.destroy();
      }
    };
  }, [userId, dispatch]);
};

export default ProviderDashboard;
