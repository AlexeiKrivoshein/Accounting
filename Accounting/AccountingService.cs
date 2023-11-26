using Microsoft.Extensions.Logging;

namespace Accounting
{
    public class AccountingService: BackgroundService
    {
        public AccountingService(ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger<AccountingService>();
        }

        public ILogger Logger { get; }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Logger.LogInformation("Accounting is starting.");

            stoppingToken.Register(() => Logger.LogInformation("Accounting is stopping."));

            while (!stoppingToken.IsCancellationRequested)
            {
                Logger.LogInformation("Accounting is doing background work.");

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }

            Logger.LogInformation("Accounting has stopped.");
        }
    }
}
