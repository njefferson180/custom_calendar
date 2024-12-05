import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { useState } from 'react';
import type { DayRange } from 'react-modern-calendar-datepicker';
import { customLocale, defaultFrom, defaultTo, getfullMonthByIndex } from './utils/customLocale';

const modelVariant = ['DEFAULT', 'model_1', 'model_2'] as const;

type DateRangeProps = {
  model?: (typeof modelVariant)[number];
  selectedDayRange?: DayRange;
  selectedDate?: string;
  startDate?: string | null;
  endDate?: string | null;
  showResetButton?: boolean;
  onChange?: (data: any) => void;
} & React.ComponentPropsWithRef<'div'>;

const DateRange: React.FC<DateRangeProps> = (props) => {
  const {
    model = 'DEFAULT',
    showResetButton,
    selectedDayRange: initialSelectedDayRange,
    selectedDate: initialSelectedDate,
    startDate: initialStartDate,
    endDate: initialEndDate,
  } = props;

  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>(
    initialSelectedDayRange || {
      from: defaultFrom,
      to: defaultTo,
    }
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    initialSelectedDate || ''
  );
  const [startDate, setStartDate] = useState<string | null | undefined>(
    initialStartDate
  );
  const [endDate, setEndDate] = useState<string | null | undefined>(
    initialEndDate
  );

  function handleOnChange(value: any) {
    const fromDate = value.from;
    const toDate = value.to;

    const fromDay = String(value.from.day).padStart(2, '0');
    const fromMonth = String(value.from.month).padStart(2, '0');
    const toDay = toDate ? String(toDate.day).padStart(2, '0') : '';
    const toMonth = toDate ? String(toDate.month).padStart(2, '0') : '';

    let newStartDate = '';
    let newEndDate = '';
    let newSelectedDate = '';

    if (fromDate) {
      newStartDate = `${value.from.year}-${fromMonth}-${fromDay}`;
      newSelectedDate = `${getfullMonthByIndex(fromDate.month).month} ${
        fromDate.day
      }, ${fromDate.year}`;
    }

    if (toDate) {
      newEndDate = `${toDate.year}-${toMonth}-${toDay}`;
      newSelectedDate += ` - ${getfullMonthByIndex(toDate.month).month} ${
        toDate.day
      }, ${toDate.year}`;
    }

    setSelectedDayRange(value);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setSelectedDate(newSelectedDate);

    if (props.onChange) {
      props.onChange({
        selectedDayRange: value,
        startDate: newStartDate,
        endDate: newEndDate,
        selectedDate: newSelectedDate,
      });
    }
  }

  function resetDate() {
    setSelectedDayRange({
      from: defaultFrom,
      to: defaultTo,
    });
    setSelectedDate('');
    setStartDate(null);
    setEndDate(null);

    if (props.onChange) {
      props.onChange({
        selectedDayRange: {
          from: defaultFrom,
          to: defaultTo,
        },
        startDate: null,
        endDate: null,
        selectedDate: '',
      });
    }
  }

  return (
    <div className="relative w-[328px] rounded-lg bg-white">
      <div
        className={`${
          model === 'model_2' ? 'block' : 'hidden'
        } absolute left-1/2 top-[36px] w-full -translate-x-1/2 px-6`}
      >
        <div className="flex items-center justify-center gap-[8px]">
          {selectedDayRange.from?.day === selectedDayRange.to?.day &&
          selectedDayRange.from?.month === selectedDayRange.to?.month &&
          selectedDayRange.from?.year === selectedDayRange.to?.year ? (
            <div className="flex h-[40px] w-full items-center justify-center rounded-[8px] border border-gray-300 px-[10px] py-[14px] text-gray-900">
              <span className="text-[14px] leading-[20px]">
                {`${`${
                  getfullMonthByIndex(selectedDayRange.from?.month).month
                } ${selectedDayRange.from?.day}, ${
                  selectedDayRange.from?.year
                }`}`}
              </span>
            </div>
          ) : (
            <>
              <div className="flex h-[40px] w-full items-center justify-center rounded-[8px] border border-gray-300 px-[10px] py-[14px] text-gray-900">
                <span className="text-[14px] leading-[20px]">
                  {`${`${
                    getfullMonthByIndex(selectedDayRange.from?.month).month
                  } ${selectedDayRange.from?.day}, ${
                    selectedDayRange.from?.year
                  }`}`}
                </span>
              </div>
              <>
                {selectedDayRange.to !== null && (
                  <>
                    <div className='h-[0.1rem] w-[1rem] bg-black' />
                    <div className="flex h-[40px] w-full items-center justify-center rounded-[8px] border border-gray-300 px-[10px] py-[14px] text-gray-900">
                      <span className="text-[14px] leading-[20px]">
                        {`${`${
                          getfullMonthByIndex(selectedDayRange.to?.month).month
                        } ${selectedDayRange.to?.day}, ${
                          selectedDayRange.to?.year
                        }`}`}
                      </span>
                    </div>
                  </>
                )}
              </>
            </>
          )}
        </div>
      </div>
      <div
        className={`
            ${model === "DEFAULT" && ''}
            ${model === 'model_1' && 'custom_model_1'}
            ${model === 'model_2' && 'custom_model_2'}
        `}
      >
        <Calendar
          value={selectedDayRange}
          onChange={(e) => {
            handleOnChange(e);
          }}
          shouldHighlightWeekends
          locale={customLocale}
        />
      </div>
      <div className='px-6'>
        {showResetButton && (
            <button 
              disabled={false}       
              onClick={resetDate} 
              className='h-[44px] px-[1.6rem] w-full bg-black rounded-[10px] flex items-center justify-center'
            >
              <span className='text-[14px] text-white'>{"Réinitialiser"}</span>
            </button>
          )
        }
      </div>
    </div>
  );
};

export default DateRange;
