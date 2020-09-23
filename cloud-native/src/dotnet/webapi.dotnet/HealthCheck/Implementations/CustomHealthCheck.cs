using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Threading;
using System.Threading.Tasks;

namespace webapi.dotnet.HealthCheck.Implementations
{
    public class CustomHealthCheck : IHealthCheck
    {
        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            // Dummy health check implementation
            var healthCheckResultHealthy = true;

            if (healthCheckResultHealthy)
            {
                return Task.FromResult(
                    HealthCheckResult.Healthy("Custom healthcheck success"));
            }

            return Task.FromResult(
                HealthCheckResult.Unhealthy("Custom healthcheck failed"));
        }
    }
}
