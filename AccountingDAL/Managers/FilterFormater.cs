using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public static class FilterFormater
    {
        public static string FilterToQuery(Dictionary<string, string> filters)
        {
            StringBuilder where = new StringBuilder();
            foreach (KeyValuePair<string, string> filter in filters)
            {
                // ключ поля = "{имя поля}_{условие сравнения}"
                string[] split = filter.Key.Split('_');

                string key = split[0];
                string comparer = "";

                switch (split[1])
                {
                    case "eq":
                        comparer = "=";
                        break;
                    case "neq":
                        comparer = "!=";
                        break;
                    case "more":
                        comparer = ">";
                        break;
                    case "less":
                        comparer = "<";
                        break;
                    case "meq":
                        comparer = ">=";
                        break;
                    case "leq":
                        comparer = "<=";
                        break;
                }

                where.Append($"{key}{comparer}\"{filter.Value}\" AND ");
            }

            string whereStr = where.ToString();

            if (string.IsNullOrEmpty(whereStr))
            {
                return string.Empty;
            }
            else
            {
                return where.ToString().Substring(0, where.Length - 4);
            }
        }
    }
}
