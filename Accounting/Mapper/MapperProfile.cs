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

            CreateMap<OperationGroupDTO, OperationGroup>().ReverseMap();
            CreateMap<AccountDTO, Account>().ReverseMap();
            CreateMap<OperationDescriptionDTO, OperationDescription>().ReverseMap();
            CreateMap<OperationDTO, Operation>().ReverseMap();
        }
    }
}
