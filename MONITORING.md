# Monitoring

The system is monitored by different services.

## Server

### Digital Ocean

#### Health check

The server runs a health check against the Apollo Server trivial query every 60 seconds after a successful deployment.

### Memory Alert

An alert will be send if memory usage is above 80% during 5 minutes

### CPU Alert

An alert will be send if CPU usage is above 80% during 5 minutes

### Sentry

Sentry will receive any alert unhandled correctly by the frontend as a Next Error and from the backend as an Apollo Error

## Dependencies and Security updates

- Renovate: The dependencies are checked once a week by renovate and PR are created to be merged into the live environments.
- Snyk: The dependencies are checked automatically by Snyk and PR are created to be merged into the live environments.
