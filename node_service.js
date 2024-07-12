const express = require('express');
const axios = require('axios');
const { Eureka } = require('eureka-js-client');

// Initialize the Express app
const app = express();
app.use(express.json());

// Eureka client configuration
const eurekaClient = new Eureka({
  instance: {
    app: 'node-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:3000',
    port: {
      '$': 3000,
      '@enabled': 'true',
    },
    vipAddress: 'node-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

// Start Eureka client
eurekaClient.start((error) => {
  if (error) {
    console.error('Error starting Eureka client:', error);
  } else {
    console.log('Eureka client started');
  }
});

// Define a simple endpoint
app.post('/process', (req, res) => {
  const { value } = req.body;
  const result = value * 2; // Example processing
  res.json({ result });
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Node service running on http://localhost:${port}`);
});
