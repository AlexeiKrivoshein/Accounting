using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.DTO;
using AccountingDAL.Model.DTO.Dictionaries;
using AccountingDAL.Model.DTO.Operation;
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

            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<AccountDTO, Account>().ReverseMap();
            CreateMap<ContractorDTO, Contractor>().ReverseMap();
            CreateMap<ContractorOperationDTO, ContractorOperation>().ReverseMap();
            CreateMap<TransferOperationDTO, TransferOperation>().ReverseMap();
            CreateMap<CorrectionOperationDTO, CorrectionOperation>().ReverseMap();
            CreateMap<BalanceDTO, Balance>().ReverseMap();
            CreateMap<PlanDTO, Plan>().ReverseMap();
            CreateMap<PlanSpendingDTO, PlanSpending>().ReverseMap();
            CreateMap<PlanSavingDTO, PlanSaving>().ReverseMap();
        }
    }
}
