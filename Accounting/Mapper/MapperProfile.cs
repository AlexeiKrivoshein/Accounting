using AccountingDAL.Model;
using AccountingDAL.Model.DTO;
using AutoMapper;

namespace Accounting.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            AllowNullCollections = true;

            CreateMap<CategoryDTO, Сategory>().ReverseMap();
            CreateMap<AccountDTO, Account>().ReverseMap();
            CreateMap<СontractorDTO, Contractor>().ReverseMap();
            CreateMap<OperationDTO, Operation>().ReverseMap();
            CreateMap<TransferDTO, Transfer>().ReverseMap();
            CreateMap<CorrectionDTO, Correction>().ReverseMap();
            CreateMap<BalanceDTO, Balance>().ReverseMap();
        }
    }
}
