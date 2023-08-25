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
            CreateMap<TemplateDTO, Template>().ReverseMap();
            CreateMap<OperationDTO, Operation>().ReverseMap();
        }
    }
}
