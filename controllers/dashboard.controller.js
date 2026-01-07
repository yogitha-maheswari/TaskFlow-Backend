const DashboardService = require('../services/dashboard.service');

exports.getDashboard = async (req, res) => {
  try {
    const search = req.query.search || '';

    const data = await DashboardService.getDashboardData(
      req.user.id,
      search
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
