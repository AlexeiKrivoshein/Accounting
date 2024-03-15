using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.DTO;
using AccountingDAL.Model.DTO.Dictionaries;
using AccountingDAL.Model.DTO.Operation;
using AccountingDAL.Model.DTO.Operations;
using AccountingDAL.Model.DTO.Plans;
using AccountingDAL.Model.Operations;
using AccountingDAL.Model.Plans;
using AutoMapper;

namespace Accounting.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            AllowNullCollections = true;
            // справочники
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<CardDTO, Card>().ReverseMap();
            CreateMap<DepositAccountDTO, DepositAccount>().ReverseMap();
            CreateMap<ContractorDTO, Contractor>().ReverseMap();
            // операции
            CreateMap<ContractorOperationDTO, ContractorOperation>().ReverseMap();
            CreateMap<TransferOperationDTO, TransferOperation>().ReverseMap();
            CreateMap<CorrectionOperationDTO, CorrectionOperation>().ReverseMap();
            CreateMap<CashOperationDTO, CashOperation>().ReverseMap();
            // баланс
            CreateMap<BalanceDTO, Balance>().ReverseMap();
            // план
            CreateMap<PlanDTO, Plan>().ReverseMap();
            CreateMap<PlanSpendingDTO, PlanSpending>().ReverseMap();
            CreateMap<PlanSavingDTO, PlanSaving>().ReverseMap();
        }
    }
}
