using AccountingDAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public class ImportManager
    {
        //словарь
        const string PAY = "Оплата товаров и услуг";

        //день
        const string TODAY = "сегодня";
        const string YESTODAY = "вчера";
        const string BEFORE_YESTODAY = "позавчера";

        // ден. ед.
        const string RUB = "rub";

        // месяц
        const string MONTH_JANUARY = "январь";
        const string MONTH_JANUARY_ROD = "января";
        const string MONTH_FEBRUARY = "февраль";
        const string MONTH_FEBRUARY_ROD = "февраля";
        const string MONTH_MARCH = "март";
        const string MONTH_MARCH_ROD = "марта";
        const string MONTH_APRIL = "апрель";
        const string MONTH_APRIL_ROD = "апреля";
        const string MONTH_MAY = "май";
        const string MONTH_MAY_ROD = "мая";
        const string MONTH_JUNE = "июнь";
        const string MONTH_JUNE_ROD = "июня";
        const string MONTH_JULY = "июль";
        const string MONTH_JULY_ROD = "июля";
        const string MONTH_AUGUST = "август";
        const string MONTH_AUGUST_ROD = "августа";
        const string MONTH_SEPTEMBER = "сентябрь";
        const string MONTH_SEPTEMBER_ROD = "сентября";
        const string MONTH_OCTOBER = "октябрь";
        const string MONTH_OCTOBER_ROD = "октября";
        const string MONTH_NOVEMBER = "ноябрь";
        const string MONTH_NOVEMBER_ROD = "ноября";
        const string MONTH_DECEMBER = "декабрь";
        const string MONTH_DECEMBER_ROD = "декабря";

        // день
        const string Monday = "понедельник";
        const string Tuesday = "вторник";
        const string Wednesday = "среда";
        const string Thursday = "четверг";
        const string Friday = "пятница";
        const string Saturday = "суббота";
        const string Sunday = "воскресенье";

        const string datePattern =
            @"^\d{1,2}\s(" +
            $"{MONTH_JANUARY}|{MONTH_FEBRUARY}|{MONTH_MARCH}|{MONTH_APRIL}|{MONTH_MAY}|{MONTH_JUNE}|{MONTH_JULY}|{MONTH_AUGUST}|{MONTH_SEPTEMBER}|{MONTH_OCTOBER}|{MONTH_NOVEMBER}|{MONTH_DECEMBER}|" +
            $"{MONTH_JANUARY_ROD}|{MONTH_FEBRUARY_ROD}|{MONTH_MARCH_ROD}|{MONTH_APRIL_ROD}|{MONTH_MAY_ROD}|{MONTH_JUNE_ROD}|{MONTH_JULY_ROD}|{MONTH_AUGUST_ROD}|{MONTH_SEPTEMBER_ROD}|{MONTH_OCTOBER_ROD}|{MONTH_NOVEMBER_ROD}|{MONTH_DECEMBER_ROD}" +
            @"),\s(" +
            $@"{Monday}|{Tuesday}|{Wednesday}|{Thursday}|{Friday}|{Saturday}|{Sunday}" +
            ")$";

        const string dayPattern = @"^\d{1,2}\s";

        const string monthPattern = $"({MONTH_JANUARY}|{MONTH_FEBRUARY}|{MONTH_MARCH}|{MONTH_APRIL}|{MONTH_MAY}|{MONTH_JUNE}|{MONTH_JULY}|{MONTH_AUGUST}|{MONTH_SEPTEMBER}|{MONTH_OCTOBER}|{MONTH_NOVEMBER}|{MONTH_DECEMBER}|" +
            $"{MONTH_JANUARY_ROD}|{MONTH_FEBRUARY_ROD}|{MONTH_MARCH_ROD}|{MONTH_APRIL_ROD}|{MONTH_MAY_ROD}|{MONTH_JUNE_ROD}|{MONTH_JULY_ROD}|{MONTH_AUGUST_ROD}|{MONTH_SEPTEMBER_ROD}|{MONTH_OCTOBER_ROD}|{MONTH_NOVEMBER_ROD}|{MONTH_DECEMBER_ROD})";

        public async Task<List<Movement>> Parse(string content)
        {
            List<Movement> movements = new List<Movement>();

            string[] lines = content.Split(new string[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);

            Movement movement = new Movement();
            foreach (string line in lines)
            {
                if (string.IsNullOrEmpty(line))
                {
                    continue;
                }

                // дата
                if (TryParseDate(line.ToLower(), out DateTime date))
                {
                    movement.Date = date;
                    continue;
                }


            }

            return movements;
        }

        private bool TryParseDate(string line, out DateTime date)
        {
            date = DateTime.MinValue;

            if (line == TODAY)
            {
                DateTime now = DateTime.Now;
                date = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0);
            }
            else if (line == YESTODAY)
            {
                DateTime yestoday = DateTime.Now.AddDays(-1);
                date = new DateTime(yestoday.Year, yestoday.Month, yestoday.Day, 0, 0, 0);
            }
            else if (line == BEFORE_YESTODAY)
            {
                DateTime beforeYestoday = DateTime.Now.AddDays(-2);
                date = new DateTime(beforeYestoday.Year, beforeYestoday.Month, beforeYestoday.Day, 0, 0, 0);
            }
            else if (Regex.IsMatch(line, datePattern))
            {
                string dayStr = Regex.Match(line, dayPattern).Value;
                string monthStr = Regex.Match(line, monthPattern).Value;

                if (int.TryParse(dayStr, out int day))
                {
                    int month = 0;
                    switch (monthStr)
                    {
                        case MONTH_JANUARY:
                        case MONTH_JANUARY_ROD:
                            month = 1;
                            break;
                        case MONTH_FEBRUARY:
                        case MONTH_FEBRUARY_ROD:
                            month = 2;
                            break;
                        case MONTH_MARCH:
                        case MONTH_MARCH_ROD:
                            month = 3;
                            break;
                        case MONTH_APRIL:
                        case MONTH_APRIL_ROD:
                            month = 4;
                            break;
                        case MONTH_MAY:
                        case MONTH_MAY_ROD:
                            month = 5;
                            break;
                        case MONTH_JUNE:
                        case MONTH_JUNE_ROD:
                            month = 6;
                            break;
                        case MONTH_JULY:
                        case MONTH_JULY_ROD:
                            month = 7;
                            break;
                        case MONTH_AUGUST:
                        case MONTH_AUGUST_ROD:
                            month = 8;
                            break;
                        case MONTH_SEPTEMBER:
                        case MONTH_SEPTEMBER_ROD:
                            month = 9;
                            break;
                        case MONTH_OCTOBER:
                        case MONTH_OCTOBER_ROD:
                            month = 10;
                            break;
                        case MONTH_NOVEMBER:
                        case MONTH_NOVEMBER_ROD:
                            month = 11;
                            break;
                        case MONTH_DECEMBER:
                        case MONTH_DECEMBER_ROD:
                            month = 12;
                            break;
                    }

                    if (day >= 1 && day <= 31 && month >= 1 && month <= 12)
                    {
                        date = new DateTime(DateTime.Now.Year, month, day, 0, 0, 0);
                    }
                }
            }

            return date != DateTime.MinValue;
        }
    }
}
