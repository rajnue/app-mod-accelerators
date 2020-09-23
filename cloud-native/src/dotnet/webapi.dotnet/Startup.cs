using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Linq;
using webapi.dotnet.Configuration;
using webapi.dotnet.Data;
using webapi.dotnet.HealthCheck;
using webapi.dotnet.Service;

namespace webapi.dotnet
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var config = new AppSettingsManager();

            Configuration.Bind(config);

            var todoContext = new TodoContext(config.MongoDB);

            var todoService = new TodoItemService(todoContext);
            services.AddSingleton<ITodoItemService>(todoService);

            services.AddControllers();

            //services.AddHealthChecksUI();

            services.AddHealthChecks()
                .AddCheck<CustomHealthCheck>("MongoDB")
                .AddMongoDb(mongodbConnectionString: config.MongoDB.ConnectionString,
                        name: "mongo",
                        failureStatus: HealthStatus.Unhealthy);

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "ToDo API",
                    Description = "Neudesic App Mode - .net core TODO Web API",
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            HealthCheckOptions customOptions = new HealthCheckOptions
            {
                ResponseWriter = async (context, report) =>
                {
                    context.Response.ContentType = "application/json";

                    var response = new HealthCheckResponse
                    {
                        Status = report.Status.ToString(),
                        Checks = report.Entries.Select(x => new HealthCheckItem
                        {
                            Component = x.Key,
                            Status = x.Value.Status.ToString(),
                            Description = x.Value.Description
                        }),
                        Duration = report.TotalDuration
                    };

                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
                }
            };

            // Endpoints for Healthprobes - liveness and readiness
            app.UseHealthChecks("/healthz/readiness", customOptions);
            app.UseHealthChecks("/healthz/liveness", customOptions);

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //endpoints.MapHealthChecksUI();
            });
        }
    }
}
