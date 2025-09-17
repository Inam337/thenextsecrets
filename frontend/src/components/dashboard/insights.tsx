'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommonIcon } from '@/components/icons';
import { CommonIconNames, IconColors } from '@/components/icons/types';
import { useTranslation } from '@/hooks/use-translation';

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: CommonIconNames;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

export function InsightsDashboard() {
  const { formatMessage } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Mock data - replace with real API calls
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics([
        {
          title: formatMessage({
            id: 'insights.labels.totalUsers',
            defaultMessage: 'Total Users'
          }),
          value: '12,345',
          change: '+12.5%',
          changeType: 'positive',
          icon: CommonIconNames.USERS_ICON,
        },
        {
          title: formatMessage({
            id: 'insights.labels.activeUsers',
            defaultMessage: 'Active Users'
          }),
          value: '8,234',
          change: '+8.2%',
          changeType: 'positive',
          icon: CommonIconNames.USER_ACTIVE_ICON,
        },
        {
          title: formatMessage({
            id: 'insights.labels.newSignups',
            defaultMessage: 'New Signups'
          }),
          value: '456',
          change: '+23.1%',
          changeType: 'positive',
          icon: CommonIconNames.USER_ICON,
        },
        {
          title: formatMessage({
            id: 'insights.labels.conversionRate',
            defaultMessage: 'Conversion Rate'
          }),
          value: '3.2%',
          change: '-2.1%',
          changeType: 'negative',
          icon: CommonIconNames.GRAPH_ICON,
        },
      ]);

      setChartData([
        { label: 'Desktop', value: 45, color: '#10B981' },
        { label: 'Mobile', value: 35, color: '#3B82F6' },
        { label: 'Tablet', value: 20, color: '#F59E0B' },
      ]);

      setIsLoading(false);
    };

    loadData();
  }, [formatMessage]);

  const handleRefreshData = async () => {
    setIsLoading(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExportReport = () => {
    // TODO: Implement export functionality
    console.log('Export report clicked');
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return CommonIconNames.ARROW_RIGHT_ICON;
      case 'negative':
        return CommonIconNames.ARROW_DOWN_ICON;
      default:
        return CommonIconNames.MENU_ICON;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {formatMessage({
              id: 'insights.actions.refreshData',
              defaultMessage: 'Loading insights data...'
            })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {formatMessage({
              id: 'insights.text.title',
              defaultMessage: 'Dashboard Insights'
            })}
          </h1>
          <p className="text-gray-600 mt-2">
            {formatMessage({
              id: 'insights.text.subtitle',
              defaultMessage: 'Overview of your account activity and performance metrics'
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefreshData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <CommonIcon
              width={16}
              height={16}
              name={CommonIconNames.ARROW_CHEVRON_RIGHT_ICON}
              fill={IconColors.BLACK_COLOR_ICON}
            />
            {formatMessage({
              id: 'insights.actions.refreshData',
              defaultMessage: 'Refresh Data'
            })}
          </Button>
          <Button
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <CommonIcon
              width={16}
              height={16}
              name={CommonIconNames.DOWNLOAD_ICON}
              fill={IconColors.WHITE_COLOR_ICON}
            />
            {formatMessage({
              id: 'insights.actions.exportReport',
              defaultMessage: 'Export Report'
            })}
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <CommonIcon
                width={20}
                height={20}
                name={metric.icon}
                fill={IconColors.GRAY_COLOR_ICON}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <CommonIcon
                  width={12}
                  height={12}
                  name={getChangeIcon(metric.changeType)}
                  fill={metric.changeType === 'positive' ? IconColors.PRIMARY_COLOR_ICON : 
                        metric.changeType === 'negative' ? IconColors.RED_COLOR_ICON : 
                        IconColors.GRAY_COLOR_ICON}
                />
                <span className={`text-sm ${getChangeColor(metric.changeType)}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {formatMessage({
                id: 'insights.charts.userGrowth',
                defaultMessage: 'User Growth Over Time'
              })}
            </CardTitle>
            <CardDescription>
              {formatMessage({
                id: 'insights.text.welcomeMessage',
                defaultMessage: 'Monthly user registration trends'
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <CommonIcon
                  width={48}
                  height={48}
                  name={CommonIconNames.GRAPH_ICON}
                  fill={IconColors.GRAY_COLOR_ICON}
                  className="mx-auto mb-4"
                />
                <p className="text-gray-600">
                  {formatMessage({
                    id: 'insights.charts.userGrowth',
                    defaultMessage: 'Chart visualization will be implemented here'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>
              {formatMessage({
                id: 'insights.charts.deviceBreakdown',
                defaultMessage: 'Device Breakdown'
              })}
            </CardTitle>
            <CardDescription>
              {formatMessage({
                id: 'insights.metrics.users',
                defaultMessage: 'User device preferences'
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.value}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>
            {formatMessage({
              id: 'insights.charts.trafficSources',
              defaultMessage: 'Traffic Sources'
            })}
          </CardTitle>
          <CardDescription>
            {formatMessage({
              id: 'insights.metrics.pageViews',
              defaultMessage: 'Where your users are coming from'
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <CommonIcon
                width={48}
                height={48}
                name={CommonIconNames.DATA_ICON}
                fill={IconColors.GRAY_COLOR_ICON}
                className="mx-auto mb-4"
              />
              <p className="text-gray-600">
                {formatMessage({
                  id: 'insights.actions.viewDetails',
                  defaultMessage: 'Traffic source analytics will be displayed here'
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 