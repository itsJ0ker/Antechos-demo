import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-3d";
import { motion } from "framer-motion";

// Chart Options (Same for Both)
const basePieOptions = {
  chart: {
    type: "pie",
    backgroundColor: "transparent",
    height: "80%",
    animation: true,
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0,
    },
  },
  credits: {
    enabled: false,
  },
  title: null,
  tooltip: {
    pointFormat: "<b>{point.percentage:.1f}%</b>",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      depth: 35,
      animation: true,
      size: "80%",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.y}%",
        style: {
          color: "#333",
          fontWeight: "bold",
          fontSize: "14px",
          textOutline: "none"
        },
        distance: 20,
      },
    },
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 768
      },
      chartOptions: {
        plotOptions: {
          pie: {
            dataLabels: {
              style: {
                fontSize: "12px"
              },
              distance: 10
            },
            size: "85%"
          }
        }
      }
    }, {
      condition: {
        maxWidth: 480
      },
      chartOptions: {
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "10px"
              },
              distance: 5
            },
            size: "80%"
          }
        }
      }
    }]
  }
};

// Chart 1 - Portfolio vs CV
const chartOptions1 = {
  ...basePieOptions,
  series: [{
    type: "pie",
    name: "Conversion Factors",
    data: [
      {
        name: "Proof via Projects (Portfolio)", 
        y: 65,
        color: '#3B82F6'
      },
      {
        name: "Optimized CV",
        y: 35,
        color: '#10B981'
      }
    ],
  }],
};

// Chart 2 - Proof of Work vs Degree
const chartOptions2 = {
  ...basePieOptions,
  series: [{
    type: "pie",
    name: "Credibility Factors",
    data: [
      {
        name: "Proof of Work (Projects, GitHub, Freelance)", 
        y: 70,
        color: '#3B82F6'
      },
      {
        name: "Regular Degree Program",
        y: 30,
        color: '#F59E0B'
      }
    ],
  }],
};

const Success3DPieChart = () => {
  return (
    <section className=" py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent mb-3">
            How We Measure Success
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg">
            We evaluate our impact by tracking real-world results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 w-full">
          {/* Chart 1 */}
          <motion.div
            className="flex flex-col items-center pt-0 sm:pt-2 md:pt-0 px-4 sm:px-6 rounded-xl w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-[400px] sm:h-[430px] md:h-[460px]">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions1}
                containerProps={{ 
                  style: { 
                    height: "100%", 
                    width: "100%",
                    minHeight: "350px",
                    background: "transparent" 
                  } 
                }}
              />
            </div>
            <motion.h3
              className="text-center text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mt-4 md:mt-6 px-2"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Why a Good Portfolio Converts More Than an Optimized CV
            </motion.h3>
          </motion.div>

          {/* Chart 2 */}
          <motion.div
            className="flex flex-col items-center pt-0 sm:pt-2 md:pt-0 px-4 sm:px-6 rounded-xl w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-[400px] sm:h-[430px] md:h-[460px]">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions2}
                containerProps={{ 
                  style: { 
                    height: "100%", 
                    width: "100%",
                    minHeight: "350px",
                    background: "transparent" 
                  } 
                }}
              />
            </div>
            <motion.h3
              className="text-center text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mt-4 md:mt-6 px-2"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Skills with Proof of Work Over Regular Degree Program
            </motion.h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Success3DPieChart;
