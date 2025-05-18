import axiosInstance from "../../../../Axios/axios";

const ProviderDashboardService = {
  getOverviewData: async (userId) => {
    try {
      const response = await axiosInstance.get(`/providers/overview/${userId}`);
      return response.data.data;
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "overview data");
    }
  },

  getPowerUsageByClient: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/powerUsageByClient/${userId}`
      );
      return response.data.data;
    } catch (error) {
      throw ProviderDashboardService.formatError(
        error,
        "power usage by client"
      );
    }
  },

  getVoltageDistribution: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/voltageDistribution/${userId}`
      );
      const voltageData = response.data.data.map((v) => v.voltage);

      // Process voltage data into frequency distribution
      const voltageCounts = {};
      voltageData.forEach((v) => {
        const roundedVoltage = Math.round(v);
        voltageCounts[roundedVoltage] =
          (voltageCounts[roundedVoltage] || 0) + 1;
      });

      // Sort by voltage value (ascending)
      return Object.entries(voltageCounts).sort(
        (a, b) => parseInt(a[0]) - parseInt(b[0])
      );
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "voltage distribution");
    }
  },

  getMetricsSummary: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/metricsSummary/${userId}`
      );
      return response.data.data;
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "metrics summary");
    }
  },

  getTotalPowerUsage: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/totalPowerUsage/${userId}`
      );
      return Object.entries(response.data.data).map(([date, power]) => ({
        timestamp: new Date(date).toISOString(),
        total_power: power,
      }));
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "total power usage");
    }
  },

  getAverageVoltage: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/averageVoltage/${userId}`
      );
      return Object.entries(response.data.data).map(([date, voltage]) => ({
        timestamp: new Date(date).toISOString(),
        average_voltage: voltage,
      }));
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "average voltage");
    }
  },

  getTotalUsers: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/getAllUsers/${userId}`
      );
      return response?.data?.data?.length || 0;
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "total users");
    }
  },

  getAllMetrics: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/getAllMetrics/${userId}`
      );
      return Array.isArray(response?.data?.data) ? response.data.data : [];
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "all metrics");
    }
  },

  getTotalLines: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/providers/getAllLines/${userId}`
      );
      return response?.data?.data?.length || 0;
    } catch (error) {
      throw ProviderDashboardService.formatError(error, "total lines");
    }
  },

  formatError: (error, dataType) => {
    let errorMessage = `Failed to fetch ${dataType}`;

    if (error.code === "ECONNABORTED") {
      errorMessage = `Request for ${dataType} timed out. Please try again.`;
    } else if (error.response) {
      errorMessage = `Server error (${error.response.status}) while fetching ${dataType}`;
    }

    const formattedError = new Error(errorMessage);
    formattedError.originalError = error;
    return formattedError;
  },

  fetchAllDashboardData: async (userId) => {
    try {
      const [
        overviewData,
        powerUsageByClient,
        voltageDistribution,
        metricsSummary,
        totalPowerUsage,
        averageVoltage,
        totalUsers,
        allMetrics,
        totalLines,
      ] = await Promise.all([
        ProviderDashboardService.getOverviewData(userId),
        ProviderDashboardService.getPowerUsageByClient(userId),
        ProviderDashboardService.getVoltageDistribution(userId),
        ProviderDashboardService.getMetricsSummary(userId),
        ProviderDashboardService.getTotalPowerUsage(userId),
        ProviderDashboardService.getAverageVoltage(userId),
        ProviderDashboardService.getTotalUsers(userId),
        ProviderDashboardService.getAllMetrics(userId),
        ProviderDashboardService.getTotalLines(userId),
      ]);

      return {
        overviewData,
        powerUsageByClient,
        voltageDistribution,
        metricsSummary,
        totalPowerUsage,
        averageVoltage,
        totalUsers,
        allMetrics,
        totalLines,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default ProviderDashboardService;
