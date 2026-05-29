import React, { useState } from 'react';
import { ArrowLeft, Save, AlertCircle, Info, RotateCcw } from 'lucide-react';
import { SlaConfig } from '../types';
import { mockSlaConfigs } from '../data/mockData';
interface SlaConfigPanelProps {
  onBack: () => void;
}
export function SlaConfigPanel({ onBack }: SlaConfigPanelProps) {
  const [configs, setConfigs] = useState<SlaConfig[]>(mockSlaConfigs);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  );
  const handleConfigChange = (
  workflow: string,
  field: 'minDays' | 'maxDays',
  value: string) =>
  {
    const numValue = parseInt(value) || 0;
    setConfigs((prev) =>
    prev.map((config) => {
      if (config.workflow === workflow) {
        return {
          ...config,
          [field]: numValue
        };
      }
      return config;
    })
    );
    setHasChanges(true);
    setSaveStatus('idle');
  };
  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setHasChanges(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };
  const handleReset = () => {
    if (confirm('Are you sure you want to discard your changes?')) {
      setConfigs(mockSlaConfigs);
      setHasChanges(false);
    }
  };
  const getWorkflowColor = (workflow: string) => {
    switch (workflow) {
      case 'MBA':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CSA':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'QA':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getWorkflowTheme = (workflow: string) => {
    switch (workflow) {
      case 'MBA':
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          text: 'text-blue-900',
          accent: 'bg-blue-600'
        };
      case 'CSA':
        return {
          border: 'border-purple-200',
          bg: 'bg-purple-50',
          text: 'text-purple-900',
          accent: 'bg-purple-600'
        };
      case 'QA':
        return {
          border: 'border-orange-200',
          bg: 'bg-orange-50',
          text: 'text-orange-900',
          accent: 'bg-orange-600'
        };
      default:
        return {
          border: 'border-gray-200',
          bg: 'bg-gray-50',
          text: 'text-gray-900',
          accent: 'bg-gray-600'
        };
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
              
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SLA Configuration
              </h1>
              <p className="text-sm text-gray-500">
                Configure completion thresholds for each workflow type
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasChanges &&
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md border border-gray-300 flex items-center transition-colors">
              
                <RotateCcw className="w-4 h-4 mr-2" />
                Discard Changes
              </button>
            }
            <button
              onClick={handleSave}
              disabled={!hasChanges || saveStatus === 'saving'}
              className={`px-6 py-2 rounded-md text-sm font-bold flex items-center shadow-sm transition-all ${saveStatus === 'saved' ? 'bg-green-600 text-white hover:bg-green-700' : hasChanges ? 'bg-[#6a5acd] text-[#ffd700] hover:bg-[#5a4abd]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              
              <Save className="w-4 h-4 mr-2" />
              {saveStatus === 'saving' ?
              'Saving...' :
              saveStatus === 'saved' ?
              'Saved!' :
              'Save Configuration'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-1">
              About SLA Thresholds
            </h3>
            <p className="text-sm text-blue-800">
              These settings control how task deadlines are calculated and when
              tasks are flagged as "At Risk" or "Breached".
              <br />
              <span className="font-semibold">Target (Min):</span> The ideal
              completion timeframe. Tasks exceeding this are marked "At Risk".
              <br />
              <span className="font-semibold">Deadline (Max):</span> The hard
              deadline. Tasks exceeding this are marked "Breached".
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {configs.map((config) => {
            const theme = getWorkflowTheme(config.workflow);
            return (
              <div
                key={config.workflow}
                className={`bg-white rounded-lg border ${theme.border} shadow-sm overflow-hidden transition-all hover:shadow-md`}>
                
                <div
                  className={`px-6 py-4 border-b ${theme.border} ${theme.bg} flex justify-between items-center`}>
                  
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-bold border ${getWorkflowColor(config.workflow)} bg-white shadow-sm mr-4`}>
                      
                      {config.workflow}
                    </span>
                    <span className={`font-medium ${theme.text}`}>
                      {config.description}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-6 md:space-y-0">
                    {/* Inputs */}
                    <div className="flex-1 grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Target (Min Days)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max={config.maxDays - 1}
                            value={config.minDays}
                            onChange={(e) =>
                            handleConfigChange(
                              config.workflow,
                              'minDays',
                              e.target.value
                            )
                            }
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md border" />
                          
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">
                              days
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">
                          Triggers "At Risk" status
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Deadline (Max Days)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={config.minDays + 1}
                            max="30"
                            value={config.maxDays}
                            onChange={(e) =>
                            handleConfigChange(
                              config.workflow,
                              'maxDays',
                              e.target.value
                            )
                            }
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md border" />
                          
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">
                              days
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">
                          Triggers "Breached" status
                        </p>
                      </div>
                    </div>

                    {/* Visualizer */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 text-center">
                        Timeline Visualization
                      </h4>
                      <div className="relative h-8 bg-gray-200 rounded-full w-full flex items-center overflow-hidden">
                        {/* Green Zone (On Track) */}
                        <div
                          className="h-full bg-green-400 flex items-center justify-center text-[10px] font-bold text-green-900 transition-all duration-300"
                          style={{
                            width: `${config.minDays / (config.maxDays + 2) * 100}%`
                          }}>
                          
                          On Track
                        </div>

                        {/* Yellow Zone (At Risk) */}
                        <div
                          className="h-full bg-yellow-400 flex items-center justify-center text-[10px] font-bold text-yellow-900 transition-all duration-300"
                          style={{
                            width: `${(config.maxDays - config.minDays) / (config.maxDays + 2) * 100}%`
                          }}>
                          
                          At Risk
                        </div>

                        {/* Red Zone (Breached) */}
                        <div className="flex-1 h-full bg-red-400 flex items-center justify-center text-[10px] font-bold text-red-900">
                          Breached
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                        <span>Day 0</span>
                        <span
                          className="font-medium text-gray-600"
                          style={{
                            marginLeft: '-15%'
                          }}>
                          
                          Day {config.minDays}
                        </span>
                        <span
                          className="font-bold text-red-600"
                          style={{
                            marginRight: '15%'
                          }}>
                          
                          Day {config.maxDays}
                        </span>
                        <span>Day {config.maxDays + 2}+</span>
                      </div>
                    </div>
                  </div>

                  {config.minDays >= config.maxDays &&
                  <div className="mt-4 flex items-center text-red-600 text-sm bg-red-50 p-2 rounded border border-red-100">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Target days must be less than Deadline days.
                    </div>
                  }
                </div>
              </div>);

          })}
        </div>
      </div>
    </div>);

}