import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { useEffect, useState } from 'react';
import type { Day } from 'react-modern-calendar-datepicker';
import { customLocale, defaultValue, getfullMonthByIndex } from './utils/customLocale';
const modelVariant = ['DEFAULT', 'model_1', 'model_2'] as const;

type DateProps = {
  model: (typeof modelVariant)[number];
  selectedDay?: Day;
  selectedDate?: string;
  singleDate?: string | null;
  showResetButton?: boolean;
  onChange?: (data: {
    selectedDay: Day;
    selectedDate: string;
    singleDate: string | null;
  }) => void;
} & React.ComponentPropsWithRef<'div'>;

const Date: React.FC<DateProps> = (props) => {
  const {
    model = 'DEFAULT',
    showResetButton,
    selectedDay: initialSelectedDay,
    selectedDate: initialSelectedDate,
    singleDate: initialSingleDate,
  } = props;

  const [selectedDay, setSelectedDay] = useState<Day>(
    initialSelectedDay || defaultValue
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    initialSelectedDate || ''
  );
  // const [singleDate, setSingleDate] = useState<string | null | undefined>(
  //   initialSingleDate
  // );

  // Utiliser le localStorage pour récupérer la date sélectionnée s'il existe
  // const storedSingleDate = localStorage.getItem('selectedSingleDate');
  const [singleDate, setSingleDate] = useState<string | null | undefined>(
    initialSingleDate
  );

  // const [singleDate, setSingleDate] = useState<string | null | undefined>(
  //   storedSingleDate || initialSingleDate
  // );

  // Utiliser le localStorage pour stocker la date sélectionnée lorsqu'elle change
  useEffect(() => {
    if (singleDate) {
      localStorage.setItem('selectedSingleDate', singleDate);
    }
  }, [singleDate]);

  function handleOnChange(value: any) {
    const day = String(value.day).padStart(2, '0');
    const month = String(value.month).padStart(2, '0');

    let newDate = '';
    let newSelectedDate = '';

    newDate = `${value.year}-${month}-${day}`;
    newSelectedDate = `${getfullMonthByIndex(value.month).month} ${
      value.day
    }, ${value.year}`;

    setSelectedDay(value);
    setSingleDate(newDate);
    setSelectedDate(newSelectedDate);

    if (props.onChange) {
      props.onChange({
        selectedDay: value,
        singleDate: newDate,
        selectedDate: newSelectedDate,
      });
    }
  }

  function resetDate() {
    setSelectedDay(defaultValue);
    setSelectedDate('');
    setSingleDate(null);

    if (props.onChange) {
      props.onChange({
        selectedDay: defaultValue,
        singleDate: null,
        selectedDate: '',
      });
    }
  }

  return (
    <div className="relative w-[328px] rounded-lg bg-white">
      <div
        className={`${
          model === 'model_2' ? 'block' : 'hidden'
        } absolute left-1/2 top-[60px] w-full -translate-x-1/2 px-6`}
      >
        <div className="flex h-[40px] w-full items-center justify-center rounded-[8px] border border-gray-300 px-[10px] py-[14px] text-gray-900">
          <span className="text-[14px] leading-[20px]">
            {`${`${getfullMonthByIndex(selectedDay?.month).month} ${
              selectedDay?.day
            }, ${selectedDay?.year}`}`}
          </span>
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
          value={selectedDay}
          onChange={(e) => {
            handleOnChange(e);
          }}
          shouldHighlightWeekends
          locale={customLocale}
        />
      </div>
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
  );
};

export default Date;
