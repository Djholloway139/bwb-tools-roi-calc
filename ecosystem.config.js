module.exports = {
  apps: [
    {
      name: "bwb-roi-calculator",
      script: "server.js",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};
