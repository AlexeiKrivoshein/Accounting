using Accounting.JSON;
using Accounting.Mapper;
using AccountingDAL.Managers;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddSingleton<CategoryManager>()
    .AddSingleton<AccountManager>()
    .AddSingleton<ContractorManager>()
    .AddSingleton<OperationManager>()
    .AddSingleton<TransferManager>()
    .AddSingleton<CorrectionManager>()
    .AddSingleton<BalanceManager>();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
    });
builder.Services.AddAutoMapper(typeof(MapperProfile));
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ������������� ������������� ��������� � �������������
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
